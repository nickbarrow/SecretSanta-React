import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/database";

// Init firebase app.
if (!firebase.apps.length)
    firebase.initializeApp({
      apiKey: "AIzaSyB58Ei1ZjyQUFReQsRmIizOpESzEM5E5DA",
      authDomain: "secretsanta-react.firebaseapp.com",
      databaseURL: "https://secretsanta-react.firebaseio.com",
      projectId: "secretsanta-react",
      storageBucket: "secretsanta-react.appspot.com",
      messagingSenderId: "252604322703",
      appId: "1:252604322703:web:d214163d32e67a4857b1fa"
    });

// Export auth and store functions.
export const fireAuth = firebase.auth();
// export const fireStore = firebase.firestore();
export const db = firebase.database();

// Google login provider
const provider = new firebase.auth.GoogleAuthProvider();
// Export login function
export const signInWithGoogle = () => {
    fireAuth.signInWithPopup(provider)
};