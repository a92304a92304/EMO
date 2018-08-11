import * as config from '@/config'

const globalMethods = {
  data () {
    return {
      modalImg: null,
      pages: [
        {
          'id': 0,
          'name': 'Einstein Program: Chipless RFID',
          'name_ch': '愛因斯坦培植計畫：無晶片式射頻辨識',
          'shortName': 'Einstein Program',
          'shortNameWrap': 'Einstein<br>Program',
          'shortName_ch': '愛因斯坦培植計畫',
          'page': 'einstein',
          'img': 'img/title/2.jpg'
        },
        {
          'id': 1,
          'name': 'Principal Investigator',
          'name_ch': '主持人',
          'shortName': 'Principal Investigator',
          'shortNameWrap': 'Principal<br>Investigator',
          'shortName_ch': '主持人',
          'page': 'investigator',
          'img': 'img/title/3.jpg'
        },
        {
          'id': 2,
          'name': 'Publication List',
          'name_ch': '著作',
          'shortName': 'Publication List',
          'shortNameWrap': 'Publication<br>List',
          'shortName_ch': '著作',
          'page': 'publication',
          'img': 'img/title/4.jpg'
        },
        {
          'id': 3,
          'name': 'Graduate Thesis',
          'name_ch': '研究所論文',
          'shortName': 'Graduate Thesis',
          'shortNameWrap': 'Graduate<br>Thesis',
          'shortName_ch': '研究所論文',
          'page': 'thesis',
          'img': 'img/title/5.jpg'
        },
        {
          'id': 4,
          'name': 'Undergraduate Project',
          'name_ch': '大學部專題',
          'shortName': 'Undergraduate Project',
          'shortNameWrap': 'Undergraduate<br>Project',
          'shortName_ch': '大學部專題',
          'page': 'project',
          'img': 'img/title/6.jpg'
        },
        {
          'id': 5,
          'name': 'Lab Members',
          'name_ch': '團隊成員',
          'shortName': 'Lab Members',
          'shortNameWrap': 'Lab<br>Members',
          'shortName_ch': '團隊成員',
          'page': 'member',
          'img': 'img/title/7.jpg'
        },
        {
          'id': 6,
          'name': 'Contact Us',
          'name_ch': '聯絡方式',
          'shortName': 'Contact Us',
          'shortNameWrap': 'Contact<br>Us',
          'shortName_ch': '聯絡方式',
          'page': 'contact',
          'img': 'img/title/8.jpg'
        }
      ]
    }
  },
  methods: {
    isIE  () {
      const isIE = window.ActiveXObject || "ActiveXObject" in window
      if(isIE)
        $('main').prepend(` <div class="fixed-bottom"><div class="alert alert-warning d-inline-block ml-2" style="opacity: .95">建議使用 Chrome, Firefox, Safari 或 Edge 瀏覽頁面。<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button></div></div>`)
    },
    getBgStyle (url) {
      return {
        backgroundImage: `url('${url}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
      }
    },
    // 根據語言決定返回的文字: 若EN為空則返回CH
    selectTextLanguage (language, ch, en) {
      if(!language){
        return ch
      }else if(language){
        return (en == '' || en == null) ? ch : en
      }
    },
    calcObjLength (obj) {
      if (obj) return Object.keys(obj).length
      else return 0
    },
    calcArrayLength (array) {
      try {
        return(array.length)
      } catch (e) {
        return 0
      }
    },
    translateYoutubeLink(url) {
      if (url == '') return ''
      try{
        var id = url.split('?v=')[1].split('&')[0]
        return `https://www.youtube.com/embed/${id}`
      }
      catch(err){
        return ''
      }
    },
    getYear () {
      const year = (new Date()).getFullYear()
      return (year > 2018) ? `2018-${year}` : '2018'
    },
    showModalImg (img) {
      this.modalImg = img
      $('#modal-img').modal('show')
    },
  },

}

export { globalMethods }
