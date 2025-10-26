import { color } from "@hisius/ui/theme/colors";
import { StyleSheet, ViewStyle, TextStyle } from "react-native";

interface ButtonStyles {
  button: ViewStyle;
  buttonHover: ViewStyle;
  buttonPressed: ViewStyle;
  buttonDisabled: ViewStyle;
  text: TextStyle;
  textDisabled: TextStyle;
}

const baseButton: ViewStyle = {
  backgroundColor: color.primary,
  paddingVertical: 14,
  paddingHorizontal: 32,
  borderRadius: 6,
  height:50,
  alignItems: "center",
  justifyContent: "center",
};

const styles = StyleSheet.create<ButtonStyles>({
  button: baseButton,

  buttonHover: {
    ...baseButton,
  },

  buttonPressed: {
    ...baseButton,
    transform: [{ scale: 0.99 }],
  },

  buttonDisabled: {
    ...baseButton,
    backgroundColor: color.deactive,
    borderColor: color.gray,
  },

  text: {
    color: color.front,
    fontSize: 15,
    fontFamily: "Montserrat",
    fontWeight: "400",
    letterSpacing: 0.5,
  },

  textDisabled: {
    color: color.gray,
    fontSize: 16,
    fontFamily: "Montserrat",
    fontWeight: "600",
    letterSpacing: 0.5,
  },
});

export { styles };
