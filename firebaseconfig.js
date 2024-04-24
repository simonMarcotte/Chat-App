// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDBVsqirNGF7lwAAu8SPeAEYRm73ALPthQ",
  authDomain: "chat-app-bced9.firebaseapp.com",
  projectId: "chat-app-bced9",
  storageBucket: "chat-app-bced9.appspot.com",
  messagingSenderId: "786068856925",
  appId: "1:786068856925:web:12400bff18ad713e01adb4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

export { auth, db }