// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey:import.meta.env.VITE_FIREBASE_API,
  authDomain: "prayas-ee040.firebaseapp.com",
  projectId: "prayas-ee040",
  storageBucket: "prayas-ee040.firebasestorage.app",
  messagingSenderId: "723294409995",
  appId: "1:723294409995:web:82d242ea33f4012123fe0e"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);