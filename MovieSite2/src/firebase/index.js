import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDbsy3kYHGw6i3SRebiV6OstOC7fi9QNdQ",
    authDomain: "ics4u-9e801.firebaseapp.com",
    projectId: "ics4u-9e801",
    storageBucket: "ics4u-9e801.firebasestorage.app",
    messagingSenderId: "1053891945053",
    appId: "1:1053891945053:web:eb7a84d9de3f0fd74fe3b4"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

export { app, auth, firestore, googleProvider };