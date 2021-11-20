import firebase from 'firebase'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCrpy2EumwUEkveNyk1B3hVZtVFyrKCRUA",
    authDomain: "discord-clone-de39b.firebaseapp.com",
    projectId: "discord-clone-de39b",
    storageBucket: "discord-clone-de39b.appspot.com",
    messagingSenderId: "418088882509",
    appId: "1:418088882509:web:509b8f72eedeb5b9a86704",
    measurementId: "G-SDHFZJB5FN"
};


// declare firebaseApp with initialize the above config
const firebaseApp = firebase.initializeApp(firebaseConfig)

// to connect firebase db
const db = firebaseApp.firestore();

// for authentication
const auth = firebase.auth();

// for google login functionality
const provider = new firebase.auth.GoogleAuthProvider();

// explicit export
export { auth, provider }

export default db;