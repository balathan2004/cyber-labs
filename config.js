// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBXCKd3IUvRbqHJhzFWLgWxIVW7rLYCQWo",
  authDomain: "rational-cyberlabs.firebaseapp.com",
  projectId: "rational-cyberlabs",
  storageBucket: "rational-cyberlabs.appspot.com",
  messagingSenderId: "536552920816",
  appId: "1:536552920816:web:0cd3f411688aeead599435",
  measurementId: "G-EVXKMB322V",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const firestore = getFirestore(app);

export { app, firestore, storage };
