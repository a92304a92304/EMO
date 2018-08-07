import * as config from '@/config'

const manage = {
  data () {
    return {
      isLogin: null,
      subPage: ``,
      newObj: null,
    }
  },
  methods: {
    fetch (page) {
      const vm = this
      config.dbRef.child(`${page}`).on('value', function(snap) {
        vm[page] = snap.val()

        if(page == `member`) {
          for (var key in vm.member) {
            vm.member[key].forEach((val, index) => {
              if(!val.hasOwnProperty('content'))
                vm.member[key][index].content = []
            })
          }
        }

      })
    },
    checkAuth () {  // 檢查登入狀態
      const vm = this
      config.auth.onAuthStateChanged((user) => {
        vm.isLogin = user
        if(!user) vm.$router.push(`/`)
      })
    },
    setSubPage (value) {
      this.subPage = value
      this.newThesisCategory = (new Date()).getFullYear() - 1
    },
  },
}

export { manage }
