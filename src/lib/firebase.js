// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"; // Importing init app function from Firebase app
import { getAuth } from "firebase/auth"; // Importing getAuth from Firebase auth
import { getFirestore } from "firebase/firestore"; // Importing getFirestore function from Firebase Firestore
import { getStorage } from "firebase/storage"; // Importing getStorage function from Firebase storage

// Firebase configuration object containing necessary keys and configuration object
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY, //API key from firebase
  authDomain: "minapp-e8192.firebaseapp.com",
  projectId: "minapp-e8192",
  storageBucket: "minapp-e8192.appspot.com",
  messagingSenderId: "920797005913",
  appId: "1:920797005913:web:3bc31a14004861ab560948"
};

// initialize firebase app with the configuration object
const app = initializeApp(firebaseConfig);

// Exporting Firebase authentication instance
export const auth = getAuth(app)

// Exporting Firestore database instance
export const db = getFirestore(app)

// Exporting Firebase storage instance
export const storage = getStorage(app)