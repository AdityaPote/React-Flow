// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'; // No sql database
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBb7m13xcqg9m6CP18lhEqgfox9oXarPNE",
  authDomain: "canva-lite.firebaseapp.com",
  projectId: "canva-lite",
  storageBucket: "canva-lite.appspot.com",
  messagingSenderId: "283236395545",
  appId: "1:283236395545:web:9339415ed3362cef5cd888"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestoreDB=getFirestore(app);

export default firestoreDB;