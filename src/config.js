 /* eslint-disable */

import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import 'firebase/storage'

let config = {
  apiKey: 'AIzaSyBS6J7v9nG5bvbIN-mR0NhSjRdNtigemJk',
  authDomain: 'em-optimization-lab.firebaseapp.com',
  databaseURL: 'https://em-optimization-lab.firebaseio.com',
  projectId: 'em-optimization-lab',
  storageBucket: 'em-optimization-lab.appspot.com',
  messagingSenderId: '1032487985417'
}

config = {
  apiKey: "AIzaSyA5qAh7_q-7twao4PIM-is2YZ9yTVNXsrc",
  authDomain: "clone-em.firebaseapp.com",
  databaseURL: "https://clone-em.firebaseio.com",
  projectId: "clone-em",
  storageBucket: "clone-em.appspot.com",
  messagingSenderId: "485365432611"
}

config = {
  apiKey: "AIzaSyCu_nOlhf8dFTsnVNn3Bby_BLXmjnPmXL8",
  authDomain: "ntut-emo.firebaseapp.com",
  databaseURL: "https://ntut-emo.firebaseio.com",
  projectId: "ntut-emo",
  storageBucket: "ntut-emo.appspot.com",
  messagingSenderId: "536584292025"
}

firebase.initializeApp(config)

export { config }
export const auth = firebase.auth()
export const dbRef = firebase.database().ref()
export const storageRef = firebase.storage().ref()

//

export const CONFIRM_MSG = '是否確定刪除項目? 此動作無法復原。'
export const WAITING_UPLOAD_MSG = '✗ 等待上傳作業完成'
export const FILE_SIZE_MSG = `✗ 圖片大小必須小於500KB`
export const MAX_FILE_SIZE = 500 * 1000
