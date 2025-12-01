// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBFGeoG02iixrJNs2gLlgBA5Jp8nJ_69kk",
  authDomain: "snake-d9220.firebaseapp.com",
  projectId: "snake-d9220",
  storageBucket: "snake-d9220.firebasestorage.app",
  messagingSenderId: "991313407628",
  appId: "1:991313407628:web:b5ee46c98bb804b4ab95a9",
  measurementId: "G-7ZTQX6EX57",
};

// Initialize Firebase
export const firebasApp = initializeApp(firebaseConfig);
export const db = getFirestore(firebasApp);
