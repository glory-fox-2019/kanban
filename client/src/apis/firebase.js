// ========================================================
// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
import * as firebase from "firebase/app";

// Add the Firebase services that you want to use
import "firebase/firestore";

// TODO: Replace the following with your app's Firebase project configuration
var firebaseConfig = {
  apiKey: "AIzaSyDiUm2oSYVzb01jc5KTN8RPBVmRojY363I",
  authDomain: "alien-emblem-246915.firebaseapp.com",
  databaseURL: "https://alien-emblem-246915.firebaseio.com",
  projectId: "alien-emblem-246915",
  storageBucket: "alien-emblem-246915.appspot.com",
  messagingSenderId: "284811322674",
  appId: "1:284811322674:web:ff2414dc7495ecd7"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore()
export default db