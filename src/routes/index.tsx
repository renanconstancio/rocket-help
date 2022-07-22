import { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";

import { Loading } from "../components/Loading";
import { SignIn } from "../screens/SignIn";
import { AppRoutes } from "./app.routes";

import database from "../config/firebase";

export function Routes() {
  const [loading, setIsLoading] = useState(true);
  const [user, setUser] = useState({});

  useEffect(() => {
    const subscriber = database.app.auth().onAuthStateChanged((resp) => {
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
