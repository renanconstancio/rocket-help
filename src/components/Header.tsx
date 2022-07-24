import { useNavigation } from "@react-navigation/native";
import {
  Heading,
  IconButton,
  StyledProps,
  useTheme,
  HStack,
} from "native-base";
import { CaretLeft } from "phosphor-react-native";

type Props = StyledProps & {
  title: string;
};

export function Header({ title, ...rest }: Props) {
  const navigation = useNavigation();

  const { colors } = useTheme();

  function handleGoBack() {
    navigation.goBack();
  }

  return (
    <HStack
      w={"full"}
      justifyContent={"space-between"}
      alignItems={"center"}
      bg={"gray.600"}
      pb={6}
      pt={12}
      pl={6}
      {...rest}
    >
      <IconButton
        icon={<CaretLeft color={colors.gray[200]} size={26} />}
        onPress={handleGoBack}
      />
      <Heading color={"gray.100"} textAlign={"left"} fontSize={"lg"} flex={1}>
        {title}
      </Heading>
    </HStack>
  );
}
