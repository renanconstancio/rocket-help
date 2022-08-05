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
import { getOrder } from "../services/order";

type RouteParams = {
  orderId: string;
};

type OrderDetails = OrderProps & {
  description: string;
  solution: string;
  closed: string;
};

export function Details() {
  const [isLoading, setIsLoadind] = useState(true);
  const [solution, setSolution] = useState("");
  const [order, setOrder] = useState<OrderDetails>({} as OrderDetails);
  // const [order, setOrder] = useState({} as any);

  const route = useRoute();

  const navigation = useNavigation();

  const { colors } = useTheme();

  const { orderId } = route.params as RouteParams;

  async function handleOrderClosed() {
    if (!solution) {
      return Alert.alert(
        "Solicitação",
        "Informe a solução para encerrar  a solicitação.",
      );
    }
  }

  useEffect(() => {
    (async () => {
      const subscriber = await getOrder(orderId).then(resp => {
        const {
          id,
          created_at,
          description,
          patrimony,
          status,
          closed_at,
          solution,
        } = resp;

        const closed = closed_at ? dateFormat(closed_at) : null;

        setOrder({
          id,
          patrimony,
          description,
          status,
          solution,
          when: dateFormat(created_at),
          closed,
        });

        setIsLoadind(false);
      });
      return subscriber;
    })();
  }, [orderId]);

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
