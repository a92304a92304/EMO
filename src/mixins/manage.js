import * as config from '@/config'

const manage = {
  data () {
    return {
      isLogin: null,
    }
  },
  methods: {
    checkAuth : function () {  // 檢查登入狀態
      const vm = this
      config.auth.onAuthStateChanged((user) => {
        vm.isLogin = user
        if(!user) vm.$router.push(`/`)
      })
    },
  },
}

export { manage }
