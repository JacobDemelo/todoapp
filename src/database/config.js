//Configurating for our firebase
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC-hkjyXeC_A1-tHvjn5yED65lbBkayqAQ",
  authDomain: "info5143lab.firebaseapp.com",
  projectId: "info5143lab",
  storageBucket: "info5143lab.appspot.com",
  messagingSenderId: "218422665585",
  appId: "1:218422665585:web:563b5eb2b01b5cdcf556d0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize cloud firestore and connect to the server
export const db = getFirestore(app);