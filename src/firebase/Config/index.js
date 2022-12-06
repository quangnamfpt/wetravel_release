// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDJPMG3xl0rHwTKz2GizCJBAI_W0dd7WFg",
  authDomain: "wetravel-18613.firebaseapp.com",
  projectId: "wetravel-18613",
  storageBucket: "wetravel-18613.appspot.com",
  messagingSenderId: "721145395984",
  appId: "1:721145395984:web:fd2aac6ca83f4be4c6c395"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)