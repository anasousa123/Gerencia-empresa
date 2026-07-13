//==================================================
// NEXUS ERP
// FIREBASE
//==================================================

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";

import { getFirestore } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

import { getStorage } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-storage.js";

import { getAuth } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

//==================================================
// CONFIGURAÇÃO
//==================================================

const firebaseConfig = {

    apiKey: "AIzaSyCPpqC-7XSwm2c33rbGnrSCwWfMeeM_MFI",

    authDomain: "nexus-2846c.firebaseapp.com",

    projectId: "nexus-2846c",

    storageBucket: "nexus-2846c.firebasestorage.app",

    messagingSenderId: "455557153252",

    appId: "1:455557153252:web:d736e16030421de802c7f1",

    measurementId: "G-4D77VY3Q0Q"

};

//==================================================
// INICIALIZAR
//==================================================

const app = initializeApp(firebaseConfig);

//==================================================
// SERVIÇOS
//==================================================

const db = getFirestore(app);

const storage = getStorage(app);

const auth = getAuth(app);

//==================================================
// EXPORTAR
//==================================================

export {

    db,

    storage,

    auth

};