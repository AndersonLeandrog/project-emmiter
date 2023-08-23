import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
// import 'firebase/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyChsLLoz9YmGV6mHqphiBBIEEA47LYarUE",
    authDomain: "emmiter-ccca5.firebaseapp.com",
    projectId: "emmiter-ccca5",
    storageBucket: "emmiter-ccca5.appspot.com",
    messagingSenderId: "162850927442",
    appId: "1:162850927442:web:9f9a17a0bf6cadd178808b"
};
  
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
export default firestore;