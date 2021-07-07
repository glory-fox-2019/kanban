import * as firebase from "firebase/app"
import "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyBA29EROsFAAbtEZKHT8KhGebKk4qc8eDA",
  authDomain: "kanbanana-c2410.firebaseapp.com",
  projectId: "kanbanana-c2410"
}

firebase.initializeApp(firebaseConfig)

let db = firebase.firestore()

export default db
