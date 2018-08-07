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

firebase.initializeApp(config)

export const auth = firebase.auth()
export const dbRef = firebase.database().ref()
export const storageRef = firebase.storage().ref()
