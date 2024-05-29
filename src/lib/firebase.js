// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "minapp-e8192.firebaseapp.com",
  projectId: "minapp-e8192",
  storageBucket: "minapp-e8192.appspot.com",
  messagingSenderId: "920797005913",
  appId: "1:920797005913:web:3bc31a14004861ab560948"
};


const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)