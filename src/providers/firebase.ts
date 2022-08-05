import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore/lite";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyC6Bzu1bC-Mbp-N0IN8kRGef_5U8TvX3eA",
  authDomain: "rocket-help-b9610.firebaseapp.com",
  projectId: "rocket-help-b9610",
  storageBucket: "rocket-help-b9610.appspot.com",
  messagingSenderId: "669971153637",
  appId: "1:669971153637:web:dfd0fce1168e7ad9ec8a0c",
  databaseURL: "https://rocket-help-b9610-default-rtdb.firebaseio.com/",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const database = getDatabase();

console.log("firebase connected");

export default app;
