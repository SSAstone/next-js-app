// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAITlnTH83eJlEHs1o0tiTt-yP90Y97bZQ",
  authDomain: "shop-app-ed317.firebaseapp.com",
  projectId: "shop-app-ed317",
  storageBucket: "shop-app-ed317.appspot.com",
  messagingSenderId: "945440944089",
  appId: "1:945440944089:web:225a4cc0741cf570b833c8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app