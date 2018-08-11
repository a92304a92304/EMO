<template lang="pug">
main#login.pt-2.pt-md-5
  .container
    .row.justify-content-center
      .col-12.col-sm-8.col-md-6.col-lg-4.text-center
        form
          img.my-3.img-fluid(src='../assets/img/logo.svg', width='100', height='100', alt='EM Optimization Lab Logo')
          h1.h3.mb-3.font-weight-normal Login
          label.sr-only(for='email') Email address
          input.form-control.login-email(type='email', placeholder='Email', autofocus, v-model='email', maxlength='30')
          label.sr-only(for='password') Password
          input.form-control.login-password(type='password', name='password', placeholder='Password', v-model='password', @keyup.enter='login(setLoginMessage)', maxlength='20')
          .my-2
            span(v-if='!loginMessage')
            fa(icon='spinner' v-else-if='loginMessage == `loading`' spin)
            span.text-danger(v-else)
              fa.mr-1(icon='times')
              span {{ loginMessage }}
          a#login-btn.btn.btn-block.btn-dark.btn-block.my-3(tabindex='0', @click='login(setLoginMessage)')
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
      email: 'a92304a92304@gmail.com',
      password: '123456',
      loginMessage: '',
    }
  },
  mounted () {
    this.checkAuth(this.setLoginMessage)
  },
  methods: {
    login: function () { // [登入]
      const vm = this
      const promise = config.auth.signInWithEmailAndPassword(this.email, this.password)
      vm.setLoginMessage('loading')  // 旋轉圓圈

      promise.catch(function (e) {  // 登入失敗
        vm.setLoginMessage(e.message)
      })

      promise.then(function (e) { // 登入成功
        vm.setLoginMessage('')
        vm.$router.push('/manage/index')
      })
    },
    checkAuth: function (setLoginMessage) { // [檢查登入狀態]
      const vm = this
      const unsubscribe = config.auth.onAuthStateChanged(function (user) {
        if (user) {
          vm.$router.push('/manage/index')
        } else {
          unsubscribe()  // 呼叫自己 -> 解除on事件
        }
      })
    },
    setLoginMessage: function (string) {
      this.loginMessage = (string == '') ? '' : string
    },
  },
}
</script>

<style scoped lang="sass">
main
  margin: 0
  height: 100vh
  background: #eee

a.btn-dark
  color: white
  &:hover
    color: white

input
  &.login-email
    margin-bottom: -1px
    border-bottom-right-radius: 0
    border-bottom-left-radius: 0
  &.login-password
    border-top-left-radius: 0
    border-top-right-radius: 0

.logout-leave
  transform: scale(0)

</style>
