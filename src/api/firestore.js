import * as firebase from 'firebase/app'
import 'firebase/firestore'

firebase.initializeApp({
  apiKey: 'AIzaSyC4fORRnKmJ7nR1QQZWETBIlTmB2PNYaOc',
  authDomain: 'kanban-e6666.firebaseapp.com',
  projectId: 'kanban-e6666'
})

const db = firebase.firestore()

export default db
