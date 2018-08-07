<template lang="pug">
main#login.mt-2.mt-md-5
  .container
    .row.justify-content-center
      .col-12.col-sm-8.col-md-6.col-lg-4.text-center
        form
          img.my-3.img-fluid(src='../assets/img/logo.svg', width='100', height='100', alt='EM Optimization Lab Logo')
          h1.h3.mb-3.font-weight-normal Login
          label.sr-only(for='email') Email address
          input.form-control.login-email(type='email', placeholder='Email', autofocus, v-model='email', maxlength='30')
          label.sr-only(for='password') Password
          input.form-control.login-password(type='password', name='password', placeholder='Password', v-model='password', @keyup.enter='login(setLoginMsg)', maxlength='20')
          .my-2(v-html='loginMsg')
          a#login-btn.btn.btn-block.btn-dark.btn-block.my-3(tabindex='0', @click='login(setLoginMsg)')
            fa(icon='lock')
            |  Login
          a(href='javascript:history.go(-1);')
            fa(icon='angle-left')
            |  Back
          p.mt-5.mb-3.text-muted.text-center
          |  ©
          span#footer-year(v-html='getYear()')  2018
          |  EM Optimization Lab
</template>

<script>
import * as config from '@/config'

export default {
  data () {
    return {
      email: '',
      password: '',
      loginMsg: '',
    }
  },
  mounted () {
    this.CheckAuth(this.setLoginMsg)
  },
  methods: {
    login: function () { // [登入]
      const self = this
      const promise = config.auth.signInWithEmailAndPassword(this.email, this.password)
      self.setLoginMsg('<span><i class="fas fa-spinner fa-spin"></i></span>')  // 旋轉圓圈

      promise.catch(function (e) {  // 登入失敗
        self.setLoginMsg(`<span class="text-danger">${FAIL_ICON}  ${e.message}</span>`)
      })

      promise.then(function (e) { // 登入成功
        self.setLoginMsg('')
        $('main').append(self.MetaRefresh(1, './manage.html'))
        $('#login-btn').removeClass('btn-dark').addClass('btn-success disabled').html('<i class="fas fa-unlock"></i>')
      })
    },
    CheckAuth: function (setLoginMsg) { // [檢查登入狀態]
      const self = this
      const unsubscribe = config.auth.onAuthStateChanged(function (user) {
        if (user) {
          // $('main').html(self.MetaRefresh(0, './manage.html'))
        } else {
          unsubscribe()  // 呼叫自己 -> 解除on事件
        }
      })
    },
    setLoginMsg: function (string) {
      this.loginMsg = (string == '') ? '' : string
    },
  },
}
</script>

<style scoped lang="sass">
@import "@/assets/css/_login.sass"
</style>
