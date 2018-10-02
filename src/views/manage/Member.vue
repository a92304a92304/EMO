<template lang="pug">
.container(v-if="member")
  file-progess-bar(:value='fileProgress')
  modal-img(:img='modalImg')

  .row
    .col-12.col-md-3.mb-3
      vertical-menu(:subPages='subPages' :subPage='subPage' @c='setSubPage')

    .col-12.col-md(v-if="subPage=='carousel'")
      Carousel(page='member')

    // Member List
    .col-12.col-md(v-if="subPage==''")
      template(v-for="type in ['investigator', 'student', 'alumni']")
        h2.text-info
          span(v-if="type=='student'") Student
          span(v-else-if="type=='alumni'") Alumni

        .mb-5(v-for='(c, c_index) in member[type]')
          h3
            | {{c.category}}
            small {{c.category_en}}
            a.compact.ui.tiny.button.mx-3(title='新增' @click='clickAddMember(type,c_index)' v-if="type!='investigator'") #[fa(icon='plus')]
          draggable(v-model='c.content' @end="modifyMember('sort', type, c_index, c.content)", :class="'ui middle aligned divided list'" :options="(type!=`investigator`) ? {group:'members'} : null" style={minHeight:`1rem`})
            .item.drag(v-for='(m, m_index) in c.content')
              .container-fluid
                .row
                  .col-auto
                    span(style='vertical-align:-webkit-baseline-middle') {{m_index+1}}.
                  .col
                    img.img-fluid.rounded-circle.profile(:src='getMemberImgLink(m)', style='width:32px;height:32px;')
                    |  {{m.name}}
                    small.text-muted {{m.name_en}}
                    span.d-none.d-lg-inline-block
                      span.ui.tiny.label(v-if="(m.grade) ? m.grade!='' : 0") #[fa(icon='graduation-cap')] {{m.grade}}
                      span.ui.tiny.label(v-if="(m.email) ? m.email!='' : 0") #[fa(icon='envelope')] {{m.email}}

                  .col-auto.edit-del-btn
                    template(v-if="type!='investigator'")
                      a.mr-1(href='#', @click="clickEditMember(type, c_index, m_index)", title='修改') #[fa(icon='edit')]
                      a(href='#', @click.prevent="modifyMember('del', type, c_index, m_index)", title='刪除') #[fa(icon='times')]
                    a.mr-1(href='#', @click="clickEditMember(type, c_index, m_index)", title='修改' v-else) #[fa(icon='edit')]

        hr
    // Add Member
    transition(enter-active-class='animated fadeInUp')
      .col-12.col-md(v-if="subPage=='add' || subPage=='edit'")
        .ui.segment
          h2(v-if="subPage=='add'") Add Member
          h2(v-if="subPage=='edit'") Edit Member
          .container-fluid
            .row
              .col-12
                form.form-row(@submit.prevent='modifyMember(subPage)')
                  .col-12.col-md.form-group.input-group-sm
                    form-label(ch='姓名' en='Name' :r='true')
                    input.form-control(type='text', maxlength='20', v-model.trim='newObj.content.name', required)

                  .col-12.col-md.form-group.input-group-sm
                    form-label(ch='英文姓名' en='Name (English)')
                    input.form-control(type='text', maxlength='30', v-model.trim='newObj.content.name_en')

                  .col-12.col-md.form-group.input-group-sm(v-if="newObj.type=='student'")
                    form-label(ch='年級' en='Grade')
                    input.form-control(type='text', maxlength='10', v-model.trim='newObj.content.grade')
                    small
                      | 以中文輸入年級如
                      code 碩一
                      |   or
                      code 大三

                  .col-12.col-md.form-group.input-group-sm(v-if="newObj.type=='alumni'")
                    form-label(ch='期間' en='Date')
                    input.form-control(type='text', maxlength='20', v-model.trim='newObj.content.date')
                    small
                      | 以中文輸入期間如
                      code 20XX年X月至20XX年X月
                  .w-100
                  .col-12.col-md-6.form-group.input-group-sm(v-if="newObj.type=='investigator'")
                    //- +form-label('職位', 'Position', true)
                    input.form-control(type='text', maxlength='20', v-model.trim='newObj.content.position')

                  .col-12.col-md-6.form-group.input-group-sm(v-if="newObj.type=='investigator'")
                    //- +form-label('英文職位', 'Position (English)', true)
                    input.form-control(type='text', maxlength='20', v-model.trim='newObj.content.position_en')
                  .col-12.col-md-12.form-group.input-group-sm
                    form-label(ch='電子信箱' en='Email')
                    input.form-control(type='email', v-model.trim='newObj.content.email')

                  .col-12.col-md.form-group.text-center
                    img.img-fluid.rounded-circle.profile(:src='getMemberImgLink(newObj.content)')
                    br
                    .ui.pointing.label.mt-3 Preview

                  .col-12.col-md-8
                    .row.no-gutter
                      .col-12.form-group.input-group-sm
                        label #[fa(:icon='[`fab`, `facebook-square`]')] Facebook ID
                        input.form-control(type='text', maxlength='20', v-model.trim='newObj.content.fbid')
                        small.form-text.text-muted
                          | 用於取得大頭照，至
                          a(href='http://lookup-id.com/', target='_blank') http://lookup-id.com/
                          |  查詢。

                      .col-12.form-group.input-group-sm
                        label #[fa(icon='upload')] 上傳自訂大頭照 #[small Upload Avatar]
                        transition(mode='out-in', enter-active-class='animated bounceIn')
                          .ui.blue.label.mx-2(v-if="newObj.content.img!=''")
                            | 已上傳圖片
                            a(href='#', @click="newObj.content.img=''")
                              fa(icon='times')
                        .custom-file
                          input.custom-file-input(type='file', accept='image/*', @change='UploadMemberImg($event)')
                          label.custom-file-label Choose New File...
                          tip(t='fileSize')

                  .col-12.form-group.input-group-sm
                    button.compact.ui.olive.button(type='submit', v-if="subPage=='add'") #[fa(icon='plus')] 新增
                    button.compact.ui.teal.button(type='submit', v-if="subPage=='edit'") #[fa(icon='edit')] 修改
                    button.compact.ui.button(type='button', @click='init()') 取消
</template>

<script>
import * as config from '@/config'
import { manage } from '@/mixins/manage.js'
import Carousel from '@/components/manage/Carousel.vue'

export default {
  data () {
    return {
      member: null,
      subPages: [
        {name:'Add / Edit / Sort', page: ''},
        {name:'Carousel', page: 'carousel'},
      ]
    }
  },
  mounted () {
    this.fetch(`member`)
  },
  methods: {
    clickAddMember  (type, c_index) {
      this.init()
      this.subPage = 'add'
      this.newObj.type = type
      this.newObj.c_index = c_index
    },
    clickEditMember  (type, c_index, m_index) {
      this.init()
      this.subPage = 'edit'
      var newObj = this.newObj  // 新member obj
      var m = this.member[type][c_index].content[m_index]  // 原member obj
      newObj.type = type
      newObj.c_index = c_index
      newObj.m_index = m_index
      newObj.content = $.extend(true,{}, m)  // 複製object
    },
    init  () {
      this.subPage = ''
      this.newObj = {
        type: '', c_index: '', m_index: '',
        content: { name: '', name_en: '', grade: '', email: '', img: '', fbid: '', date:''}
      }
    },
    modifyMember (opertaion, type, c_index, data) {
      const vm = this
      const dbRef = config.dbRef
      var list = []
      var newObj = this.newObj
      var ref = dbRef.child('member/' + type + '/' + c_index + '/content/')

      switch (opertaion) {
        case 'add':
          if(!vm.fileProgress){
            var ref = dbRef.child('member/' + newObj.type + '/' + newObj.c_index + '/content/')
            ref.on('value', function(snap) {
              list = (snap.val()) ? snap.val() : []
            })
            list.push(newObj.content)
            ref.set(list, function (e) {
              if (!e) {
                vm.$notify({ group: 'snackbar', type: 'success', title: '✓ 成功新增' })
                vm.init()
              } else alert(e)
            })
          }else{
              vm.ShowSnackbar(config.WAITING_UPLOAD_MSG)
          }
          break
        case 'edit':
          var ref = dbRef.child('member/' + newObj.type + '/' + newObj.c_index + '/content/' + newObj.m_index)
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
          var ref = dbRef.child('member/')
          var list = vm.member
          ref.set(list, function (e) {
            if (!e) {
              vm.$notify({ group: 'snackbar', type: 'success', title: '✓ 已重新排序' })
            } else alert(e)
          })

        default:
      }
    },

    UploadMemberImg (evt) {
      const vm = this
      const dbRef = config.dbRef
      var file = evt.target.files[0]
      var fileName = this.getRandomNum().toString()
      var uploadTask = config.storageRef.child('member/'+ fileName).put(file)

      if(evt.target.files[0].size >  config.MAX_FILE_SIZE){
        vm.$notify({ group: 'snackbar', type: 'error', title: config.FILE_SIZE_MSG })
        return
      }

      uploadTask.on('state_changed',function (snap) {
        vm.fileProgress = ((snap.bytesTransferred / snap.totalBytes) * 100).toFixed(1)
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
@import "@/assets/css/_member.sass"
</style>
