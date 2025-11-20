import { Text, TextProps } from "react-native";

export function GlobalText(props: TextProps) {
  return (
    <Text {...props} style={[{ fontFamily: "Montserrat" }, props.style]} />
  );
}
