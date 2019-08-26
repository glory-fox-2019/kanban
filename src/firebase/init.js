import firebase from 'firebase'

const config = {
  apiKey: process.env.VUE_APP_APIKEY,
  authDoman: process.env.VUE_APP_AUTHDOMAIN,
  databaseURL: process.env.VUE_APP_DBURL,
  projectId: process.env.VUE_APP_PROJECTID,
  storageBucket: process.env.VUE_APP_BUCKET,
  messagingSenderId: process.env.VUE_APP_SENDERID,
  appId: process.env.VUE_APP_APPID
}

firebase.initializeApp(config)
const database = firebase.database()

export default database
