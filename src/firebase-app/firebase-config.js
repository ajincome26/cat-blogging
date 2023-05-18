import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAGMCLyabN6dvDymjOnCQDud9_xYSApS7w",
  authDomain: "cat-blogging.firebaseapp.com",
  projectId: "cat-blogging",
  storageBucket: "cat-blogging.appspot.com",
  messagingSenderId: "694279795953",
  appId: "1:694279795953:web:941824863a723902266550",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
