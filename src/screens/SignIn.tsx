import { useState } from "react";
import { Alert } from "react-native";
import { VStack, Heading, Icon, useTheme } from "native-base";
import { Envelope, Key } from "phosphor-react-native";
import auth from "@react-native-firebase/auth";

import Logo from "./../assets/logo_primary.svg";

import { Input } from "../components/Input";
import { Button } from "../components/Button";

export function SignIn() {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { colors } = useTheme();

  async function handleSignIn() {
    if (!email || !password) {
      return Alert.alert("Entrar", "Informe e-mail e senha");
    }

    setIsLoading(true);

    await auth()
      .signInWithEmailAndPassword(email.trim(), password.trim())
      .catch((error) => {
        console.log(error);
        setIsLoading(false);

        switch (error.code) {
          case "auth/invalid-email":
          case "auth/invalid-password":
          case "auth/user-not-found":
            return Alert.alert("Entrar", "E-mail ou senha inválido");
          default:
            return Alert.alert("Entrar", "Não foi possível acessar");
        }
      });
  }

  return (
    <VStack flex={1} alignItems={"center"} bg={"gray.600"} px={8} pt={24}>
      <Logo />

      <Heading color={"gray.100"} fontSize={"xl"} mt={20} mb={6}>
        Acesse sua conta
      </Heading>

      <Input
        mb={4}
        placeholder={"E-mail"}
        InputLeftElement={
          <Icon as={<Envelope color={colors.gray[300]} />} ml={4} />
        }
        keyboardType={"email-address"}
        onChangeText={setEmail}
      />

      <Input
        mb={8}
        placeholder="Senha"
        InputLeftElement={<Icon as={<Key color={colors.gray[300]} />} ml={4} />}
        secureTextEntry
        onChangeText={setPassword}
      />

      <Button
        title="Entrar"
        w="full"
        onPress={handleSignIn}
        isLoading={isLoading}
      />
    </VStack>
  );
}
