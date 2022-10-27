import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/storage'


const firebaseConfig = {
  apiKey: "AIzaSyDF93e1UeLyxIqbDgXZVq_oPSUjbEVUjrk",
  authDomain: "thedojosite-874d3.firebaseapp.com",
  projectId: "thedojosite-874d3",
  storageBucket: "thedojosite-874d3.appspot.com",
  messagingSenderId: "463994440641",
  appId: "1:463994440641:web:da38ea6bcd48fa9a753d40"
};

// init firebase
firebase.initializeApp(firebaseConfig)

// init services
const projectFirestore = firebase.firestore()
const projectAuth = firebase.auth()
const projectStorage = firebase.storage()

// timestamp
const timestamp = firebase.firestore.Timestamp

export { projectFirestore, projectAuth, projectStorage, timestamp }