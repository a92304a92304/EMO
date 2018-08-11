<template lang="pug">
div(v-if='carousel')
  file-progess-bar(:value='fileProgress')
  .form-group.input-group-sm
    label #[fa(icon='upload')] 上傳輪播圖片
    .custom-file
      input.custom-file-input(type='file', accept='image/*', @change="uploadCarousel($event, page)")
      label.custom-file-label Choose New File...
      tip(t='fileSize')

  .form-row.align-items-end
    .col.form-group.input-group-sm
      label #[fa(icon='stopwatch')] 輪播間隔 (ms)
      input.form-control(type='number', maxlength='30', v-model.number='carousel.interval', @keydown.enter="modifyCarousel('interval', page, carousel.interval)")
    .col-auto.form-group.input-group-sm
      button.compact.ui.teal.button(type='button', @click.prevent="modifyCarousel('interval', page, carousel.interval)") #[fa(icon='edit')] 修改
  hr
  div
    draggable(v-model='carousel.content', @end="modifyCarousel('sort', page, carousel.content)", :class="'ui middle aligned divided list'")
      transition-group(mode='out-in', enter-active-class='animated bounceIn', leave-active-class='animated bounceOut')
        .ui.compact.segment.mr-2.drag(style='display:inline-flex', v-for='(c,c_index) in carousel.content', :key='c')
          img.img-fluid.rounded.pointer(:src='c', style='height:64px')
          .ui.bottom.left.attached.label
            | {{c_index+1}}
            a.text-danger(@click.prevent="modifyCarousel('del', page, c_index)", title='刪除') #[fa(icon='times')]
</template>

<script>
import * as config from '@/config'
import { manage } from '@/mixins/manage.js'

export default {
  data () {
    return {
      carousel: null,
    }
  },
  mounted () {
    this.fetchCarousel(this.page)
  },
  methods: {
    fetchCarousel (child) {
      const vm = this
      config.dbRef.child('carousel').child(child).on('value', function(snap) {
        vm.carousel = snap.val()
      })
    },
    uploadCarousel (evt, type) {
      const vm = this
      var file = evt.target.files[0]
      var fileName = this.getRandomNum().toString()
      var uploadTask = config.storageRef.child(type + 'Carousel/' + fileName).put(file)

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
          vm.modifyCarousel('add', type, url)
        })

      })
    },
    modifyCarousel (opertaion, type, data) {
      const vm = this
      const dbRef = config.dbRef

      var list = []
      var newObj = this.newObj
      var ref = dbRef.child('carousel').child(type).child('content')

      switch (opertaion) {
        case 'add':
          ref.on('value', function(snap) {
            list = (snap.val()) ? snap.val() : []
          })
          list.push(data)
          ref.set(list, function (e) {
            if (!e) {
              vm.$notify({ group: 'snackbar', type: 'success', title: '✓ 成功新增' })
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
        case 'interval':
          if(data > 0 && data <= 60000){
            ref = dbRef.child('carousel').child(type).child('interval')
            ref.set(data, function (e) {
              if (!e) {
                vm.$notify({ group: 'snackbar', type: 'success', title: '✓ 已設定輪播間隔' })
              } else alert(e)
            })
          }else vm.$notify({ group: 'snackbar', type: 'error', title: '✗ 請輸入數字 0 ~ 60000' })
          break
        default:
      }
    },
  },
  props: [`page`],
  mixins: [manage],
}
</script>

<style scoped lang="sass">
@import "@/assets/css/_manage.sass"
</style>
