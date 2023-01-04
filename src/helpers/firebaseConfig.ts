import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBycXbBE10xsUqmjNCmCKufV6Wr_ZAni-o",
    authDomain: "dictionary-app-691cb.firebaseapp.com",
    projectId: "dictionary-app-691cb",
    storageBucket: "dictionary-app-691cb.appspot.com",
    messagingSenderId: "300789877508",
    appId: "1:300789877508:web:05ea98195acd3195cdde51",
    measurementId: "G-Q8N6XEEPWJ"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const firestore = getFirestore(app);