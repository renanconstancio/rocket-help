import { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";

import { Loading } from "../components/Loading";
import { SignIn } from "../screens/SignIn";
import { AppRoutes } from "./app.routes";

// import { database } from "../config/firebase";
// import { onAuthStateChanged, getAuth } from "firebase/auth";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
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

export function Routes() {
  const [loading, setIsLoading] = useState(false);
  const [user, setUser] = useState({});

  useEffect(() => {
    const auth = getAuth();
    const subscriber = onAuthStateChanged(auth, (resp) => {
      setUser(resp);
      setIsLoading(false);
    });
    return subscriber;
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <NavigationContainer>
      {user ? <AppRoutes /> : <SignIn />}
    </NavigationContainer>
  );
}
