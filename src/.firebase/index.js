import firebase from 'firebase/app'
import firebaseConfig from './config'

import 'firebase/auth'
import 'firebase/firestore'

firebase.initializeApp(firebaseConfig)

export const firebaseAuth = firebase.auth()
export const firebaseFirestore = firebase.firestore()
