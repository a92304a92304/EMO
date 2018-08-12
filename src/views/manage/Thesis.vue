<template lang="pug">
.container(v-if="data")
  file-progess-bar(:value='fileProgress')
  modal-img(:img='modalImg')

  .row
    .col-12.col-md-3.mb-3
      vertical-menu(:subPages='subPages' :subPage='subPage' @c='setSubPage')

    .col-12.col-md(v-if="subPage==''")
      .mb-5(v-for='(t,t_index) in data.order')
        h2
          | {{data.content[t].name}}
          a.compact.ui.tiny.button.mx-3(title='新增' @click='clickAddThesis(currPage,t)') #[fa(icon='plus')]
        draggable(v-model='data.content[t].content', @end='sortThesis(currPage, t, data.content[t].content)', :class="'ui middle aligned divided list'")
          .item.drag(v-for='(item, i_index) in data.content[t].content')
            .container-fluid
              .row
                .col-auto
                  span {{i_index+1}}.
                .col
                  h6
                    | {{item.name}}
                    br
                    small.text-muted {{item.name_en}}
                  span
                    fa(icon='users')
                    |  {{item.author}}
                    small.text-muted {{item.author_en}}
                .col-auto
                  a.text-info.mr-1(href='#', @click="clickEditThesis(currPage, t, i_index)", title='修改') #[fa(icon='edit')]
                  a.text-danger(href='#', @click.prevent="delThesis(currPage, t, i_index)", title='刪除') #[fa(icon='trash')]

    // Add Thesis
    transition(enter-active-class='animated fadeInUp')
      .col-12.col-md(v-if="subPage=='add' || subPage=='edit'")
        .ui.segment
          h2(v-if="subPage=='add'") Add {{(currPage=='thesis')?'Thesis':'Project'}}
          h2(v-if="subPage=='edit'") Edit {{(currPage=='thesis')?'Thesis':'Project'}}
          .container-fluid
            .row
              .col-12
                form.form-row(@submit.prevent='submit()', @keydown.enter.prevent='')
                  .col-12.col-md-6.form-group.input-group-sm(v-if="subPage=='add'")
                    form-label(ch='年份' en='Year' :r='true')
                    select.form-control(v-model='newObj.t', required)
                      option(v-for='t in data.order', :value='t') {{data.content[t].name}}

                  .col-6.form-group.input-group-sm(v-if="newObj.t == 'ee'")
                    form-label(ch='年份(碩士在職專班)' en='Year (For EE)' :r='true')
                    input.form-control(type='text', maxlength='4', v-model.trim='newObj.content.year', required)

                  .col-12.form-group.input-group-sm
                    form-label(ch='名稱' en='Title' :r='true')
                    input.form-control(type='text', maxlength='300', v-model.trim='newObj.content.name', required)

                  .col-12.col-md-12.form-group.input-group-sm
                    form-label(ch='英文名稱' en='Title (English)')
                    input.form-control(type='text', maxlength='300', v-model.trim='newObj.content.name_en')

                  .col-12.col-md-6.form-group.input-group-sm
                    form-label(ch='姓名' en='Author' :r='true')
                    input.form-control(type='text', maxlength='100', v-model.trim='newObj.content.author', required)

                  .col-12.col-md-6.form-group.input-group-sm
                    form-label(ch='英文姓名' en='Author (English)')
                    input.form-control(type='text', maxlength='100', v-model.trim='newObj.content.author_en')

                  .col-12.col-md-12.form-group.input-group-sm
                    form-label(ch='關鍵字' en='Keywords' :r='true')
                    input.form-control(type='text', maxlength='300', v-model.trim='newObj.content.keyword', required)
                    small 以 #[code 、] 區隔中文關鍵字。

                  .col-12.col-md-12.form-group.input-group-sm
                    form-label(ch='英文關鍵字' en='Keywords (English)')
                    input.form-control(type='text', maxlength='300', v-model.trim='newObj.content.keyword_en')
                    small 以 #[code ,] 區隔英文關鍵字。

                  .col-12.form-group.input-group-sm
                    form-label(ch='摘要' en='Content' :r='true')
                    textarea.form-control(rows='8', cols='100', required, v-model='newObj.content.content')
                    tip(t='br')

                  .col-12.form-group.input-group-sm
                    form-label(ch='英文摘要' en='Content (English)')
                    textarea.form-control(rows='8', cols='100', v-model='newObj.content.content_en')

                  .col-12.col-md-12.form-group.input-group-sm
                    label #[fa(:icon='[`fab`, `youtube`]')] Youtube Link
                    input.form-control(type='text', maxlength='300', v-model.trim='newObj.content.youtube')

                  .col-12.form-group.input-group-sm(v-if="currPage=='thesis'")
                    form-label(ch='相關論著' en='Publications')
                    draggable(v-model='newObj.content.related', :class="'ui middle aligned list'")
                      transition-group(mode='out-in', enter-active-class='animated bounceIn', leave-active-class='animated bounceOut')
                        .drag(v-for='(p, p_index) in newObj.content.related', :key='p')
                          .input-group.input-group-sm
                            .input-group-prepend
                              span.input-group-text {{p_index+1}}.
                            input.form-control(type='text', maxlength='300', v-model='newObj.content.related[p_index]')
                            .input-group-append
                              span.input-group-text
                                a.text-danger(href='#', @click.prevent="modifyThesisArray('del','related', p_index)")
                                  fa(icon='times')
                    .input-group.input-group-sm
                      .input-group-prepend
                        span.input-group-text Add
                      input.form-control(type='text', maxlength='300', v-model='newObj.newRelatedItem', @keydown.enter="modifyThesisArray('add','related', newObj.newRelatedItem)")
                      .input-group-append
                        span.input-group-text
                          a.text-success(href='#', @click.prevent="modifyThesisArray('add','related', newObj.newRelatedItem)")
                            fa(icon='plus-circle')

                  .col-12.form-group.input-group-sm(v-if="currPage=='project'")
                    form-label(ch='榮譽與獎項' en='Awards')
                    draggable(v-model='newObj.content.award', :class="'ui middle aligned list'")
                      transition-group(mode='out-in', enter-active-class='animated bounceIn', leave-active-class='animated bounceOut')
                        .drag(v-for='(a, a_index) in newObj.content.award', :key='a')
                          .input-group.input-group-sm
                            .input-group-prepend
                              span.input-group-text {{a_index+1}}.
                            input.form-control(type='text', maxlength='300', v-model='newObj.content.award[a_index]')
                            .input-group-append
                              span.input-group-text
                                a.text-danger(href='#', @click.prevent="modifyThesisArray('del','award', a_index)")
                                  fa(icon='times')
                    .input-group.input-group-sm
                      .input-group-prepend
                        span.input-group-text Add
                      input.form-control(type='text', maxlength='300', v-model='newObj.newAwardItem', @keydown.enter="modifyThesisArray('add','award', newObj.newAwardItem)")
                      .input-group-append
                        span.input-group-text
                          a.text-success(href='#', @click.prevent="modifyThesisArray('add','award', newObj.newAwardItem)")
                            fa(icon='plus-circle')

                  .col-12.col-md-5.form-group.input-group-sm
                    label #[fa(icon='image')] 封面照片 #[small Cover Photo]
                    div
                      transition(mode='out-in', enter-active-class='animated bounceIn')
                        .ui.blue.image.label.mx-2.mb-2(v-if="newObj.content.img.cover!=''")
                          img.bg-light(:src='newObj.content.img.cover', @click.prevent='showModalImg(newObj.content.img.cover)')
                          |  已上傳
                          a(href='#', @click.prevent="newObj.content.img.cover=''")
                            fa(icon='times')
                        .ui.basic.grey.label.mx-2.mb-2(v-else) no image
                    .custom-file
                      input.custom-file-input(type='file', accept='image/*', @change="uploadThesisImg($event,'cover')")
                      label.custom-file-label Choose New File...
                      tip(t='fileSize')

                  .col-12.col-md-7.form-group.input-group-sm
                    label
                      | #[fa(icon='upload')] 上傳圖片 #[small upload Image]
                      span.ui.tiny.circular.label  {{calcObjLength(newObj.content.img.content)}}
                    div(v-if='calcObjLength(newObj.content.img.content)==0')
                      .ui.basic.grey.label.mx-2.mb-2 no image
                    draggable(v-model='newObj.content.img.content')
                      transition-group(enter-active-class='animated bounceIn', leave-active-class='animated bounceOut')
                        .ui.blue.image.label.mx-2.mb-2.drag(v-for='(img, img_index) in newObj.content.img.content', :key='img')
                          img.bg-light(:src='img', @click.prevent='showModalImg(img)')
                          |   {{img_index+1}}
                          a(href='#', @click.prevent="modifyThesisArray('del','img', img_index)")
                            fa(icon='times')
                    .custom-file
                      input.custom-file-input(type='file', accept='image/*', @change="uploadThesisImg($event,'content')")
                      label.custom-file-label Choose New File...

                  .col-12.form-group.input-group-sm
                    button.compact.ui.olive.button(type='submit', v-if="subPage=='add'") #[fa(icon='plus')] 新增
                    button.compact.ui.teal.button(type='submit', v-if="subPage=='edit'") #[fa(icon='edit')] 修改
                    button.compact.ui.button(type='button', @click='init()') 取消

    // Thesis Category
    .col-12.col-md(v-if="subPage=='category'")
      .form-group.input-group-sm
        label #[fa(icon='plus-circle')] 新增年份
        input.form-control(type='text', maxlength='20', v-model.trim='newThesisCategory', @keydown.enter="modifyThesisCategory('add',currPage, data.order)")
        button.compact.olive.ui.button.mt-3(type='button', @click="modifyThesisCategory('add',currPage, data.order)") 新增
      hr
      draggable(v-model='data.order', @end="modifyThesisCategory('sort', currPage, data.order)")
        .ui.blue.image.label.mr-1.mb-2.drag(v-for='(o, o_index) in data.order')
          | {{o}}
          a(href='#', @click.prevent="modifyThesisCategory('del',currPage, o_index)")
            fa(icon='times')
</template>

<script>
import * as config from '@/config'
import { manage } from '@/mixins/manage.js'

export default {
  data () {
    return {
      data: null,
      newThesisCategory: null,
      currPage: null,
      subPages: [
        {name:'Add / Edit / Sort', page: ''},
        {name:'Category', page: 'category'},
      ]
    }
  },
  mounted () {
    this.setPage()
  },
  methods: {
    setPage () {
      const page = this.$route.name.replace(/manage\//g, ``)
      this.data = null
      this.subPage = ``
      this.currPage = page
      this.fetch(page)
    },
    fetch (page) {
      const vm = this
      config.dbRef.child(`${page}`).on('value', function(snap) {
        vm.data = snap.val()
      })
    },
    clickAddThesis (type, t) {
      this.init()
      this.subPage = 'add'
      this.newObj.type = type
      this.newObj.t = t
    },
    clickEditThesis (type, t, i_index) {
      this.init()
      this.subPage = 'edit'
      var newObj = this.newObj  // 新thesis obj
      newObj.type = type
      newObj.t = t
      newObj.i_index = i_index
      newObj.content = $.extend(true,{}, this.data.content[t].content[i_index])  // 複製object
    },
    init () {
      this.subPage = ''
      this.newObj = {
        type: '', t: '', i_index: '',
        content: {
          name : '', name_en : '',
          author : '', author_en : '',
          content : '', content_en : '',
          year:'', img : { content : [], cover : ''},
          keyword : '', keyword_en : '',
          award : [], related :[],
          youtube : '',
        },
        newRelatedItem:'', newAwardItem:'',
      }
    },
    submit () {
      const vm = this
      const dbRef = config.dbRef
      var newObj = vm.newObj
      var list = []
      var ref = dbRef.child(newObj.type + '/content/' + newObj.t + '/content/')
      if(!vm.fileProgress){
        if(vm.subPage=='add'){
          ref.on('value', function(snap) {
            list = (snap.val()) ? snap.val() : []
          })
          list.push(newObj.content)
          ref.set(list, function (e) {
            if (!e) {
              vm.init()
              vm.$notify({ group: 'snackbar', type: 'success', title: '✓ 成功新增' })
            } else alert(e)
          })
        }else if(vm.subPage=='edit'){
          ref.child(newObj.i_index).set(newObj.content, function (e) {
            if (!e) {
              vm.init()
              vm.$notify({ group: 'snackbar', type: 'success', title: '✓ 成功修改' })
            } else alert(e)
          })
        }
      }else{
        vm.$notify({ group: 'snackbar', type: 'error', title: config.WAITING_UPLOAD_MSG })
      }
    },
    delThesis (type, t, i_index) {
      const vm = this
      const dbRef = config.dbRef
      var list = []
      var ref = dbRef.child(type + '/content/' + t + '/content/' )
      if(confirm(config.CONFIRM_MSG)){
        ref.on('value', function(snap) {
          list = snap.val()
        })
        list.splice(i_index, 1)
        ref.set(list, function (e) {
          if (!e) {
            vm.$notify({ group: 'snackbar', type: 'success', title: '✓ 成功移除' })
          } else alert(e)
        })
      }
    },
    sortThesis(type, t, content) {
      const vm = this
      const dbRef = config.dbRef
      var list = content
      var ref = dbRef.child(type + '/content/' + t + '/content/')
      ref.set(list, function (e) {
        if (!e) {
          vm.$notify({ group: 'snackbar', type: 'success', title: '✓ 已重新排序' })
        } else alert(e)
      })
    },
    modifyThesisArray(opertaion, field, data) {
      var list = []
      var newObj = this.newObj
      switch (opertaion) {
        case 'add':
          if(field=='img'){
            if(typeof newObj.content[field].content === "undefined"){   // case: 當修改現存thesis，但其array欄位不存在時。
              newObj.content[field].content = [] // 指定空array
            }
            newObj.content[field].content.push(data)
          }
          else{
            if(typeof newObj.content[field] === "undefined"){
              newObj.content[field] = []
            }
            if(data!='') {
              newObj.content[field].push(data)
            }
            newObj.newRelatedItem = newObj.newAwardItem = ''
          }
          break
        case 'del':
          if(field=='img')
            newObj.content[field].content.splice(data, 1)
          else
            newObj.content[field].splice(data, 1)
          break
        default:
      }
    },
    modifyThesisCategory(opertaion, type, content) {
      const vm = this
      const dbRef = config.dbRef
      var list = content
      var ref = dbRef.child(type + '/order')

      switch (opertaion) {
        case 'add':
          ref.on('value', function(snap) {
            list = (snap.val()) ? snap.val() : []
          })
          if(vm.newThesisCategory == '') {
            vm.$notify({ group: 'snackbar', type: 'error', title: `✗ 未輸入內容` })
            return false
          }
          if(list.indexOf(vm.newThesisCategory) == -1){ // 若list中不存在欲插入的元素
            list.unshift(vm.newThesisCategory)  // 先在list中插入新元素
            ref.set(list, function (e) {  // 推送list至DB
              if (!e) { //若成功
                dbRef.child(type + '/content/' + vm.newThesisCategory).set({  // 再推送實際的新類別
                  name: vm.newThesisCategory,
                  name_en: vm.newThesisCategory,
                  content:[]
                },function (e) {
                  if (!e) {
                    vm.$notify({ group: 'snackbar', type: 'success', title: '✓ 成功新增' })
                    vm.newThesisCategory = ''
                  }
                  else alert(e)
                })
              } else alert(e)
            })

          }else{
            vm.$notify({ group: 'snackbar', type: 'error', title: `✗ 已存在` })
          }
          break
        case 'del':
          if(confirm(CONFIRM_MSG)){
            ref.on('value', function(snap) {
              list = (snap.val()) ? snap.val() : []
            })
            list.splice(content, 1)
            ref.set(list, function (e) {
              if (!e) {
                vm.$notify({ group: 'snackbar', type: 'success', title: '✓ 成功移除' })
              } else alert(e)
            })
          }
          break
        case 'sort':
          ref.set(list, function (e) {
            if (!e) {
              vm.$notify({ group: 'snackbar', type: 'success', title: '✓ 已重新排序' })
            } else alert(e)
          })
        default:
      }
    },
    uploadThesisImg(evt, type) {
      const vm = this
      var file = evt.target.files[0]
      var fileName = this.getRandomNum().toString()
      var uploadTask = config.storageRef.child(vm.newObj.type + '/' + vm.newObj.t + '/' + fileName).put(file)

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
        if(type=='content')
          snap.ref.getDownloadURL().then((url) => {
            vm.modifyThesisArray('add','img', url)
          })

        else if(type=='cover')
          snap.ref.getDownloadURL().then((url) => {
            vm.newObj.content.img.cover = url
          })
      })
    },
  },
  watch: {
    $route () {
      this.setPage()
    }
  },
  components: {},
  mixins: [manage]
}
</script>

<style lang="sass">
@import "@/assets/css/_manage.sass"
</style>
