// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import {
  getAuth,
  GoogleAuthProvider,
  FacebookAuthProvider,
  OAuthProvider,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCBoHoaDn-kWkIpmblQguB1CLK5PA7ScBQ",
  authDomain: "myproject-c53de.firebaseapp.com",
  projectId: "myproject-c53de",
  storageBucket: "myproject-c53de.appspot.com",
  messagingSenderId: "379360746070",
  appId: "1:379360746070:web:6fd30b1dae9e283d9cb9f7",
  measurementId: "G-MHGTJ8ZHZT",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const facebookProvider = new FacebookAuthProvider();
export const microsoftProvider = new OAuthProvider("microsoft.com");
export const db = getFirestore(app);
