import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyCp2rh13-vvxWRb33EwG58hrUn0zBx_uKU",
  authDomain: "pagina-web-d0fa0.firebaseapp.com",
  projectId: "pagina-web-d0fa0",
  storageBucket: "pagina-web-d0fa0.appspot.com",
  messagingSenderId: "641848731556",
  appId: "1:641848731556:web:f0445a76fec8444aa84331"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);