import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyBFiaBwDTTySeeKOLk7Dpy2NNfDGilNt5s",
    authDomain: "social-circle-4c9c3.firebaseapp.com",
    projectId: "social-circle-4c9c3",
    storageBucket: "social-circle-4c9c3.appspot.com",
    messagingSenderId: "568883224368",
    appId: "1:568883224368:web:b12026ded2de64ab75f2f5"
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Initialize Firebase storage
const imageDB = getStorage(app);

export { imageDB }; // Correctly exporting imageDB without wrapping in an object
