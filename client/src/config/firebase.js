import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyDjuyZS-kO-BCDn-tvgK11kx4QiNzoYKQA",
  authDomain: "avayx-b6fcf.firebaseapp.com",
  projectId: "avayx-b6fcf",
  storageBucket: "avayx-b6fcf.appspot.com",
  messagingSenderId: "72174254780",
  appId: "1:72174254780:web:6cb72fd031e0b8cd60aeb9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth()
export const db = getFirestore(app);
export const storage = getStorage(app);