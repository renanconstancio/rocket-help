import { VStack } from "native-base";
import { Header } from "../components/Header";
import { Input } from "../components/Input";
import { Button } from "../components/Button";

export function Register() {
  return (
    <VStack flex={1} pb={6} bg={"gray.600"}>
      <Header title={"Nova solicitação"} />

      <VStack flex={1} px={6}>
        <Input placeholder={"Número do pratimônio"} />

        <Input
          placeholder={"Descrição do problema"}
          mt={5}
          flex={1}
          multiline
          textAlignVertical={"top"}
        />
        <Button title={"Cadastrar"} mt={5} />
      </VStack>
    </VStack>
  );
}
