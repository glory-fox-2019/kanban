import firebase from 'firebase'
 // Initialize Firebase
  var config = {
    apiKey: "AIzaSyD3p7N2CccSQNSgMDaNr2CjX1JQeY6r1GI",
    authDomain: "kan-zen-kanban.firebaseapp.com",
    databaseURL: "https://kan-zen-kanban.firebaseio.com",
    projectId: "kan-zen-kanban",
    storageBucket: "kan-zen-kanban.appspot.com",
    messagingSenderId: "626404981265",
    appId: "1:626404981265:web:3850e4c1b699e0dc"
  };
  firebase.initializeApp(config);

const db = firebase.firestore()
export default db;