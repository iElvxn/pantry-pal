require("dotenv").config();

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: process.env.API_KEY,
    authDomain: "pantry-pal-1aac3.firebaseapp.com",
    projectId: "pantry-pal-1aac3",
    storageBucket: "pantry-pal-1aac3.appspot.com",
    messagingSenderId: "859761238994",
    appId: "1:859761238994:web:3086038ad889225654de0b",
    measurementId: "G-NXE4R3MSZK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export { db };
