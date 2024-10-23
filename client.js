// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
import { getFirestore } from 'https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDjrUtaavYPLX3qAtpm15F1hpgx13raUXU",
    authDomain: "plantia-16dba.firebaseapp.com",
    databaseURL: "https://plantia-16dba-default-rtdb.firebaseio.com",
    projectId: "plantia-16dba",
    storageBucket: "plantia-16dba.appspot.com",
    messagingSenderId: "803758644858",
    appId: "1:803758644858:web:4f0f0663eb9eb2d692a5c3"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
console.log("Firestore instance:", db); // Aquí imprimimos la instancia de Firestore
console.log("Auth instance:", auth); // Aquí imprimimos la instancia de Auth
