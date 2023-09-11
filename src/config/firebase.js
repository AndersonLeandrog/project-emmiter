// Importa os arquivos necessários para se comunicar com o google firebase/firestore
// e realizar todas as modificações solicitadas pelos arquivos externos...

import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Insira aqui o objeto contendo as propriedades para a sua conta do google firebase/firestore
const firebaseConfig = {
    apiKey: "AIzaSyChsLLoz9YmGV6mHqphiBBIEEA47LYarUE",
    authDomain: "emmiter-ccca5.firebaseapp.com",
    projectId: "emmiter-ccca5",
    storageBucket: "emmiter-ccca5.appspot.com",
    messagingSenderId: "162850927442",
    appId: "1:162850927442:web:9f9a17a0bf6cadd178808b"
};

// Iicializa o firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
export default firestore;