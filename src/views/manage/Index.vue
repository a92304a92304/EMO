<template lang="pug">
.container(v-if="index")
  file-progess-bar(:value='fileProgress')
  modal-img(:img='modalImg')

  .row
    .col-12.col-md-3.mb-3
      vertical-menu(:subPages='subPages' :subPage='subPage' @c='setSubPage')

    // Index Carousel List
    .col-12.col-md(v-if="subPage=='carousel'")
      Carousel(page='index')

    // Index List
    .col-12.col-md(v-if="subPage==''")
      template(v-for="type in ['research', 'events']")
        h2
          span(v-if="type=='research'")
            | 研究議題
            small Research Highlights
          span(v-else-if="type=='events'")
            | 近期活動
            small Upcoming Events
          a.compact.ui.tiny.button.mx-3(title='新增' @click.prevent="clickAddIndex(type)") #[fa(icon='plus')]

        draggable(v-model='index[type]', @end="modifyIndex('sort', type, index[type])", :class="'ui middle aligned divided list mb-5'")
          .item.drag(v-for='(i, i_index) in index[type]')
            .container-fluid
              .row
                .col-auto
                  span(style='vertical-align: bottom') {{i_index+1}}.
                .col(v-if="type == 'research'")
                  | {{i.name}}
                  small.text-muted {{ i.name_en }}
                .col(v-if="type == 'events'")
                  | {{i.content}}
                  br
                  small.text-muted(v-html='i.content_en')
                .col-auto
                  a.text-info.mr-1(href='#', @click.prevent="clickEditIndex(type, i_index)", title='修改') #[fa(icon='edit')]
                  a.text-danger(href='#', @click.prevent="modifyIndex('del', type, i_index)", title='刪除') #[fa(icon='trash')]

    // Add Index
    transition(enter-active-class='animated fadeInUp')
      .col-12.col-md(v-if="subPage=='add' || subPage=='edit'")
        .ui.segment
          h2(v-if="subPage=='add'") Add
          h2(v-if="subPage=='edit'") Edit
          .container-fluid
            .row
              .col-12
                form.form-row(@submit.prevent='modifyIndex(subPage)')
                  .col-12.col-md-6.form-group.input-group-sm(v-if="newObj.type=='research'")
                    form-label(ch='標題' en='Title' :r='true')
                    input.form-control(type='text', maxlength='100', v-model.trim='newObj.content.name', required)

                  .col-12.col-md-6.form-group.input-group-sm(v-if="newObj.type=='research'")
                    form-label(ch='英文標題' en='Title (English)')
                    input.form-control(type='text', maxlength='100', v-model.trim='newObj.content.name_en')

                  .col-12.col-md-12.form-group.input-group-sm
                    form-label(ch='內容' en='Content' :r='true')
                    VueEditor(v-model='newObj.content.content' :editorToolbar='customToolbar' required)

                  .col-12.col-md-12.form-group.input-group-sm
                    form-label(ch='英文內容' en='Content (English)')
                    VueEditor(v-model='newObj.content.content_en' :editorToolbar='customToolbar')

                  .col-12.col-md-12.form-group.input-group-sm(v-if="newObj.type=='research'")
                    label #[fa(icon='image')] 圖片 #[small Image]
                    div
                      transition(mode='out-in', enter-active-class='animated bounceIn')
                        .ui.blue.image.label.mx-2.mb-2(v-if="newObj.content.img!=''")
                          img.bg-light(:src='newObj.content.img', @click.prevent='ShowModalImg(newObj.content.img)')
                          | 已上傳
                          a(href='#', @click.prevent="newObj.content.img=''") #[fa(icon='times')]
                        .ui.basic.grey.label.mx-2.mb-2(v-else) no image
                    .custom-file
                      input.custom-file-input(type='file', accept='image/*', @change='uploadIndexImg($event)')
                      label.custom-file-label Choose New File...
                      tip(t='fileSize')

                  .col-12.form-group.input-group-sm
                    button.compact.ui.olive.button(type='submit', v-if="subPage=='add'") #[fa(icon='plus')] 新增
                    button.compact.ui.teal.button(type='submit', v-if="subPage=='edit'") #[fa(icon='edit')] 修改
                    button.compact.ui.button(type='button', @click.prevent='init()') 取消

    // Index Introduction
    .col-12.col-md(v-if="subPage=='introduction'")
      .form-row.align-items-end
        .col-12


        .col-12.col-md-12.form-group.input-group-sm
          form-label(ch='內容' en='Content')
          VueEditor(v-model='index.introduction.content' :editorToolbar='customToolbar')

        .col-12.col-md-12.form-group.input-group-sm
          form-label(ch='英文內容' en='Content (English)')
          VueEditor(v-model='index.introduction.content_en' :editorToolbar='customToolbar')

        .col-auto.form-group.input-group-sm
          button.compact.ui.teal.button(type='button', @click.prevent="modifyIndex('introduction', 'introduction', index.introduction)") #[fa(icon='edit')] 修改
</template>

<script>
import * as config from '@/config'
import { manage } from '@/mixins/manage.js'
import Carousel from '@/components/manage/Carousel.vue'

export default {
  data () {
    return {
      index: null,
      subPages: [
        {name:'Add / Edit / Sort', page: ''},
        {name:'Carousel', page: 'carousel'},
        {name:'Introduction', page: 'introduction'},
      ]
    }
  },
  mounted () {
    this.fetch(`index`)
  },
  methods: {
    modifyIndex (opertaion, type, data) {
      const vm = this
      const dbRef = config.dbRef
      var list = []
      var newObj = this.newObj
      var ref = dbRef.child('index/' + type)

      if(newObj.type == `events`) {
        newObj.content.content = this.replacePTag(newObj.content.content)
        newObj.content.content_en = this.replacePTag(newObj.content.content_en)
      }
      
      switch (opertaion) {
        case 'add':
          var ref = dbRef.child('index/' + newObj.type)
          ref.on('value', function(snap) {
            list = (snap.val()) ? snap.val() : []
          })
          list.unshift(newObj.content)
          ref.set(list, function (e) {
            if (!e) {
              vm.$notify({ group: 'snackbar', type: 'success', title: '✓ 成功新增' })
              vm.init()
            } else alert(e)
          })
          break
        case 'edit':
          var ref = dbRef.child('index/' + newObj.type + '/' + newObj.i_index)
          ref.set(newObj.content, function (e) {
            if (!e) {
              vm.$notify({ group: 'snackbar', type: 'success', title: '✓ 成功修改' })
              vm.init()
            } else alert(e)
          })
          break
        case 'del':
          if(confirm(config.CONFIRM_MSG)){
            ref.on('value', function(snap) {
              list = (snap.val()) ? snap.val() : []
            })
            list.splice(data, 1)
            ref.set(list, function (e) {
              if (!e) {
                vm.$notify({ group: 'snackbar', type: 'success', title: '✓ 成功移除' })
              } else alert(e)
            })
          }
          break
        case 'sort':
          list = data
          ref.set(list, function (e) {
            if (!e) {
              vm.$notify({ group: 'snackbar', type: 'success', title: '✓ 已重新排序' })
            } else alert(e)
          })
          break
        case 'introduction':
          ref.set(data, function (e) {
            if (!e) {
              vm.$notify({ group: 'snackbar', type: 'success', title: '✓ 成功修改' })
            } else alert(e)
          })
          break
        default:
      }
    },
    clickAddIndex  (type) {
      this.init()
      this.subPage = 'add'
      this.newObj.type = type
    },
    clickEditIndex  (type, i_index) {
      this.init()
      this.subPage = 'edit'
      var newObj = this.newObj  // 新index obj
      var i = this.index[type][i_index]  // 原index obj
      newObj.type = type
      newObj.i_index = i_index
      newObj.content = $.extend(true,{}, i)  // 複製object
    },
    init () {
      this.subPage = ''
      this.newObj = {
        type: '', i_index: '',
        content: { name: '', name_en: '', content: '', content_en: '', img: '',}
      }
    },
    uploadIndexImg (evt) {
      const vm = this
      var file = evt.target.files[0]
      var fileName = this.getRandomNum().toString()
      var uploadTask = config.storageRef.child('index/research/' + fileName).put(file)

      if(evt.target.files[0].size >  config.MAX_FILE_SIZE){
        vm.$notify({ group: 'snackbar', type: 'error', title: config.FILE_SIZE_MSG })
        return
      }

      uploadTask.on('state_changed',function (snap) {
        vm.fileProgress = ((snap.bytesTransferred / snap.totalBytes) * 100).toFixed(1)
        vm.file = file
      })
      uploadTask.then(function (snap) {
        vm.fileProgress = null
        snap.ref.getDownloadURL().then((url) => {
          vm.newObj.content.img = url
        })
      })
    },
  },
  components: { Carousel },
  mixins: [manage]
}
</script>

<style lang="sass">
@import "@/assets/css/_manage.sass"
</style>
