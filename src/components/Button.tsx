import { Button as ButtonNativeBase, IButtonProps, Heading } from "native-base";

type Props = IButtonProps & {
  title: string;
};

export function Button({ title, ...rest }: Props) {
  return (
    <ButtonNativeBase
      h={14}
      bg={"green.700"}
      fontSize={"sm"}
      rounded={"sm"}
      _pressed={{ bg: "green.500" }}
      {...rest}
    >
      <Heading color={"white"} fontSize={"sm"}>
        {title}
      </Heading>
    </ButtonNativeBase>
  );
}
