import { HStack, ScrollView, Text, useTheme, VStack } from "native-base";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Header } from "../components/Header";
import { OrderProps } from "../components/Order";
import { useEffect, useState } from "react";
import { Alert } from "react-native";
import { OrderFirestoreDTO } from "../DTOs/OrderFirestoreDTO";
import { dateFormat } from "../utils/firestoreDateFormat";
import { Loading } from "../components/Loading";
import {
  CircleWavyCheck,
  ClipboardText,
  DesktopTower,
  Hourglass,
} from "phosphor-react-native";
import { CardDetails } from "../components/CardDetails";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import database from "../config/firebase";

type RouteParams = {
  orderId: string;
};

type OrderDetails = {
  description: string;
  solution: string;
  closed: string;
} & OrderProps;

export function Details() {
  const [isLoading, setIsLoadind] = useState(true);
  const [solution, setSolution] = useState("");
  const [order, setOrder] = useState<OrderDetails>({} as OrderDetails);

  const navigation = useNavigation();
  const route = useRoute();

  const { colors } = useTheme();

  const { orderId } = route.params as RouteParams;

  function handleOrderClosed() {
    if (!solution) {
      return Alert.alert(
        "Solicitação",
        "Informe a solução para encerrar  a solicitação."
      );
    }

    database
      .collection("orders")
      .doc(orderId)
      .update({
        status: "closed",
        solution,
        closed_at: "",
      })
      .then(() => {
        Alert.alert("Solicitação", "Solicitação finalizada e encerrada.");
        navigation.goBack();
      })
      .catch((error) => {
        console.log(error);
        Alert.alert(
          "Solicitação",
          "Não foi possível finalizada ou encerrar a solicitação.\nTente novamente mais tarde."
        );
      });
  }

  useEffect(() => {
    database
      .collection("orders")
      .doc(orderId)
      .get()
      .then((doc) => {
        const {
          created_at,
          description,
          patrimony,
          status,
          closed_at,
          solution,
        } = doc.data();

        const closed = closed_at ? dateFormat(closed_at) : null;

        setOrder({
          id: doc.id,
          patrimony,
          description,
          status,
          solution,
          when: dateFormat(created_at),
          closed,
        });

        setIsLoadind(false);
      });
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <VStack flex={1} pb={6} bg={"gray.700"}>
      <Header title="Solicitação" />

      <HStack bg={"gray.500"} justifyContent={"center"} p={4}>
        {order.status === "closed" ? (
          <CircleWavyCheck size={22} color={colors.green[300]} />
        ) : (
          <Hourglass size={22} color={colors.secondary[700]} />
        )}

        <Text
          ml={2}
          fontSize={"sm"}
          textTransform={"uppercase"}
          color={
            order.status === "closed"
              ? colors.green[300]
              : colors.secondary[700]
          }
        >
          {order.status === "closed" ? "finalizado" : "em andamento"}
        </Text>
      </HStack>

      <ScrollView mx={5} showsVerticalScrollIndicator={false}>
        <CardDetails
          title="equipamento"
          description={`Patrimônio ${order.patrimony}`}
          icon={DesktopTower}
        />
        <CardDetails
          title="Descrição do problema"
          description={order.description}
          icon={ClipboardText}
          footer={`Registrado em ${order.when}`}
        />
        <CardDetails
          title="Solução"
          description={order.solution}
          icon={CircleWavyCheck}
          footer={order.closed && `Encerrado em ${order.closed}`}
        >
          {order.status == "open" && (
            <Input
              placeholder="Descrição da solução"
              onChangeText={setSolution}
              textAlignVertical={"top"}
              multiline
              h={24}
            />
          )}
        </CardDetails>
      </ScrollView>

      {order.status === "open" && (
        <Button
          title="Encerrar solicitação"
          m={5}
          onPress={handleOrderClosed}
        />
      )}
    </VStack>
  );
}
