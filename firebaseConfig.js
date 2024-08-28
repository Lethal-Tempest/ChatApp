// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {getReactNativePersistence, initializeAuth} from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {getFirestore, collection} from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDH1OEGHFJ-D88TQ6HVeu62TPkckjqdDNA",
  authDomain: "chatapp-d30f7.firebaseapp.com",
  projectId: "chatapp-d30f7",
  storageBucket: "chatapp-d30f7.appspot.com",
  messagingSenderId: "565241001226",
  appId: "1:565241001226:web:c65abe3bc14470d50976f3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


export const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
});

export const db = getFirestore(app);

export const usersRef = collection(db, 'users');
export const roomRef = collection(db, 'rooms');