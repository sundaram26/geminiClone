// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAPp1NE9Mga0teqMPCCuHtQKQ35VX720Vc",
  authDomain: "geminiclone-e5afc.firebaseapp.com",
  projectId: "geminiclone-e5afc",
  storageBucket: "geminiclone-e5afc.appspot.com",
  messagingSenderId: "978857300555",
  appId: "1:978857300555:web:bf4667cf177b1f017333ce",
  measurementId: "G-PSXMZ3BQGZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth();
const db = getFirestore(app)
export {auth, db};