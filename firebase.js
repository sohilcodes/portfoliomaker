// firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js";

const firebaseConfig = {
  apiKey: "AIzaSyBbrDGRAVcRqbGzMmQ_mjui7ne7MEZvqsQ",
  authDomain: "nobitav1.firebaseapp.com",
  databaseURL: "https://nobitav1-default-rtdb.firebaseio.com",
  projectId: "nobitav1",
  storageBucket: "nobitav1.appspot.com",
  messagingSenderId: "705595261183",
  appId: "1:705595261183:web:6e8a3ce273e9a4b5b3e8b1"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
