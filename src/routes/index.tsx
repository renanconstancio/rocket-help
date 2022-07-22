import { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";

import { Loading } from "../components/Loading";
// import { SignIn } from "../screens/SignIn";
// import database from "../config/firebase";
import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";

// import { AppRoutes } from "./app.routes";

export function Routes() {
  const [loading, setIsLoading] = useState(true);
  const [user, setUser] = useState({});

  useEffect(() => {
    const subscriber = onAuthStateChanged(getAuth(), async (resp) => {
      setUser(resp);
      setIsLoading(false);
    });
    return subscriber;
  }, []);

  if (loading) {
    return <Loading />;
  }

  // return (
  //   <NavigationContainer>
  //     {user ? <AppRoutes /> : <SignIn />}
  //   </NavigationContainer>
  // );
}
