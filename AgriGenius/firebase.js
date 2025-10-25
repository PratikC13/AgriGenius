// firebase.js
import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCEee4QuoIaajKC8zPrUHAzPhzNBqT6n-o",
    authDomain: "agrigenius-bd21d.firebaseapp.com",
    projectId: "agrigenius-bd21d",
    storageBucket: "agrigenius-bd21d.firebasestorage.app",
    messagingSenderId: "102796240742",
    appId: "1:102796240742:web:ffef56b9c8ea8b80990aa7",
     measurementId: "G-0W0S3ZFJPJ"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];

console.log('✅ Firebase initialized');

const auth = getAuth(app);

export { auth };