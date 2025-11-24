import { color } from "@hisius/ui/theme/colors";
import { Text, TextProps } from "react-native";

export function GlobalText(props: TextProps) {
  return (
    <Text
      {...props}
      style={[{ fontFamily: "Montserrat", color: color.text }, props.style]}
    />
  );
}
