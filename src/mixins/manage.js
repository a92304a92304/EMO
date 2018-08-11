import * as config from '@/config'
import FileProgessBar from '@/components/manage/FileProgressBar.vue'
import randomString from 'random-base64-string'

const manage = {
  data () {
    return {
      isLogin: null,
      subPage: ``,
      newObj: null,
      fileProgress: null,
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
    getRandomNum () {
      return randomString(6)
    },
    queryArray (array, p, name) {
      const vm = this
      let num = 0
      array.forEach((val, index) => {
        if(name == val[p]) num = index
      })
      return num
    },
  },
  components: {
    FileProgessBar,
  },
}

export { manage }
