// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBgTNGLM-cyZomZMQvYq_cBnbK3E_c8x68",
  authDomain: "matchon-b278b.firebaseapp.com",
  projectId: "matchon-b278b",
  storageBucket: "matchon-b278b.appspot.com",
  messagingSenderId: "31498383586",
  appId: "1:31498383586:web:f40905a363cccd18e4eebb",
  measurementId: "G-J963RZLYWB",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
