import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC6Bzu1bC-Mbp-N0IN8kRGef_5U8TvX3eA",
  authDomain: "rocket-help-b9610.firebaseapp.com",
  projectId: "rocket-help-b9610",
  storageBucket: "rocket-help-b9610.appspot.com",
  messagingSenderId: "669971153637",
  appId: "1:669971153637:web:dfd0fce1168e7ad9ec8a0c",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getFirestore(app);

export { database };
