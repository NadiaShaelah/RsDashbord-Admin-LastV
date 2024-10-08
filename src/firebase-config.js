import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from 'firebase/storage';
import { getDatabase } from "firebase/database";


const firebaseConfig = {
    apiKey: "AIzaSyC44N6PsbaBEica4WYf1yarrJ7hscgLmMo",
    authDomain: "appchapfinal.firebaseapp.com",
    databaseURL: "https://appchapfinal-default-rtdb.firebaseio.com",
    projectId: "appchapfinal",
    storageBucket: "appchapfinal.appspot.com",
    messagingSenderId: "991388025559",
    appId: "1:991388025559:web:7778779d2400f23bf22692",
    measurementId: "G-RFSVQTGJ87"
};

// Initialize Firebase
export const database = initializeApp(firebaseConfig);
export const db = getFirestore(database)
export const storage = getStorage();

// export const database = getDatabase(app);