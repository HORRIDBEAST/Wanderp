// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {getFirestore} from "firebase/firestore"

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAL5rv4Blh7hIpO407vzYiN8KJBje1oDBw",
  authDomain: "new-wander.firebaseapp.com",
  projectId: "new-wander",
  storageBucket: "new-wander.appspot.com",
  messagingSenderId: "147907669055",
  appId: "1:147907669055:web:b5b4592112bc6235765c8a",
  measurementId: "G-2V05XYRQW4"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db=getFirestore(app)
// const analytics = getAnalytics(app);