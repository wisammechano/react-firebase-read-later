// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const fbConfig = {
  // @TODO: Insert your firebase config
  apiKey: "AIzaSyA9DRfIWL0FhkIxMSwjXCt2VnjuQIRX6LM",
  authDomain: "prm-few-202203-react.firebaseapp.com",
  projectId: "prm-few-202203-react",
  storageBucket: "prm-few-202203-react.appspot.com",
  messagingSenderId: "363480795758",
  appId: "1:363480795758:web:5c5ed5d3a8802f5b1a747f",
  measurementId: "G-9FSCQ65RLG",
};

// Initialize Firebase
const app = initializeApp(fbConfig);

export const db = getFirestore(app)
export const auth = getAuth(app)
export default app;

