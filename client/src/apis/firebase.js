import * as firebase from 'firebase/app'
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyBr4UzM_yAYBQdGcgjQi4ajFC_6YkJcNIg',
  authDomain: 'kanban-7a665.firebaseapp.com',
  projectId: 'kanban-7a665'
}

firebase.initializeApp(firebaseConfig)

let db = firebase.firestore()

export default db
