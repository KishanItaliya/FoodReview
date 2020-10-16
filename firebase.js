import firebase from "firebase"

const firebaseConfig = {
    apiKey: "AIzaSyDcKvcxbC6qoawKa8KjWx3TX9Awqrotz2A",
    authDomain: "food-review-909e5.firebaseapp.com",
    databaseURL: "https://food-review-909e5.firebaseio.com",
    projectId: "food-review-909e5",
    storageBucket: "food-review-909e5.appspot.com",
    messagingSenderId: "963058384386",
    appId: "1:963058384386:web:db6511ff9e8d852222b11b",
    measurementId: "G-B5XF875KDE"
  };
  
const firebaseApp =  firebase.initializeApp(firebaseConfig)

const db = firebaseApp.firestore()
const auth = firebase.auth()

export { db , auth } 