import { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";

import { Loading } from "../components/Loading";
import { SignIn } from "../screens/SignIn";
import { AppRoutes } from "./app.routes";

import "../config/firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export function Routes() {
  const [loading, setIsLoading] = useState(true);
  const [user, setUser] = useState({});

  useEffect(() => {
    (async () => {
      onAuthStateChanged(getAuth(), (resp) => {
        setUser(resp);
        setIsLoading(false);
      });
    })();
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
