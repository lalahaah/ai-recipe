import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyBtRIVzDlP_d_rz-PuHswlnoVdnS20ZIMs",
    authDomain: "ai-recipe-5a114.firebaseapp.com",
    projectId: "ai-recipe-5a114",
    storageBucket: "ai-recipe-5a114.firebasestorage.app",
    messagingSenderId: "245307841668",
    appId: "1:245307841668:web:620a51ae11375b4a51f6d1",
    measurementId: "G-H05TRF2EKL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
const googleProvider = new GoogleAuthProvider();

export { app, analytics, auth, db, storage, googleProvider };
