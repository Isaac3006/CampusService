// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import {getStorage } from 'firebase/storage'
import {getFirestore} from 'firebase/firestore'
import "firebase/compat/storage";
import "firebase/compat/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCiZ1YO9nEBFwX2HKw4Lw-pZZ6H1Y5ROZ8",
  authDomain: "gt-disc.firebaseapp.com",
  projectId: "gt-disc",
  storageBucket: "gt-disc.appspot.com",
  messagingSenderId: "629988888570",
  appId: "1:629988888570:web:7b75f25628b34cfd879e43",
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const storage = getStorage(app);
const projectStorage = firebase.storage();
const projDB = firebase.firestore();
const timestamp = firebase.firestore.Timestamp;
export { storage, projectStorage, projDB, timestamp};
export default getFirestore();
