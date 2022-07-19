import { Text, VStack } from "native-base";
import { useRoute } from "@react-navigation/native";
import { Header } from "../components/Header";

type RouteParams = {
  orderId: string;
};

export function Details() {
  const route = useRoute();
  const { orderId } = route.params as RouteParams;

  return (
    <VStack flex={1} pb={6} bg={"gray.700"}>
      <Header title="Solicitações" />

      <Text color={"white"} p={6}>
        {orderId}
      </Text>
    </VStack>
  );
}
