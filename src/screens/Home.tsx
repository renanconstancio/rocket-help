import { useEffect, useState } from "react";
import { Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
  Center,
  FlatList,
  Heading,
  HStack,
  IconButton,
  Text,
  useTheme,
  VStack,
} from "native-base";
import { ChatTeardropText, SignOut } from "phosphor-react-native";

import { Filter } from "../components/Filter";
import { Button } from "../components/Button";
import { Order, OrderProps } from "../components/Order";

import { Loading } from "../components/Loading";
import { getOrders } from "../services/order";
import { getAuth, signOut } from "firebase/auth";

import Logo from "../assets/logo_secondary.svg";

export function Home() {
  const [isLoading, setIsLoding] = useState(true);
  const [statusSelected, setStatusSelected] = useState<"open" | "closed">(
    "open",
  );
  const [orders, setOrders] = useState<OrderProps[]>([]);

  const navigation = useNavigation();

  const { colors } = useTheme();

  function handleNewOrder() {
    navigation.navigate("new");
  }

  function handleOpenDetails(orderId: string) {
    navigation.navigate("details", { orderId });
  }

  async function handleLogout() {
    await signOut(getAuth()).catch(error => {
      console.log(error);
      return Alert.alert("Sair", "Não foi possível sair?\nTente novamente.");
    });
  }

  useEffect(() => {
    (async () => {
      const subscriber = await getOrders(statusSelected).then(async resp => {
        setOrders(resp);
        setIsLoding(false);
      });
      return subscriber;
    })();
  }, [statusSelected]);

  return (
    <VStack flex={1} pb={6} bg={"gray.700"}>
      <HStack
        w={"full"}
        justifyContent={"space-between"}
        alignItems={"center"}
        bg={"gray.600"}
        pt={12}
        pb={5}
        px={6}
      >
        <Logo />
        <IconButton
          icon={<SignOut size={26} color={colors.gray[300]} />}
          onPress={handleLogout}
        />
      </HStack>

      <VStack flex={1} px={6}>
        <HStack w={"full"} mt={8} mb={4} justifyContent={"space-between"}>
          <Heading color={"gray.100"}>Meus Chamados</Heading>
          <Text color={"gray.200"}>{orders.length ?? 0}</Text>
        </HStack>
        <HStack space={3} mb={8}>
          <Filter
            type={"open"}
            title={"em andamento"}
            onPress={() => setStatusSelected("open")}
            isActive={statusSelected === "open"}
          />
          <Filter
            type={"closed"}
            title={"finalizados"}
            onPress={() => setStatusSelected("closed")}
            isActive={statusSelected === "closed"}
          />
        </HStack>
        {isLoading ? (
          <Loading />
        ) : (
          <FlatList
            data={orders}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <Order data={item} onPress={() => handleOpenDetails(item.id)} />
            )}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 50 }}
            ListEmptyComponent={() => (
              <Center>
                <ChatTeardropText color={colors.gray[300]} size={40} />
                <Text
                  mt={6}
                  color={"gray.300"}
                  fontSize={"xl"}
                  textAlign={"center"}
                >
                  Você ainda não possui {"\n"}
                  solicitações{" "}
                  {statusSelected === "open" ? "em andamento" : "finlizados"}
                </Text>
              </Center>
            )}
          />
        )}

        <Button title={"Nova solicitação"} onPress={handleNewOrder} />
      </VStack>
    </VStack>
  );
}
