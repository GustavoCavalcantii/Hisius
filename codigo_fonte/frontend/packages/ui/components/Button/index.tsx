import { useState } from "react";
import { TouchableOpacity, Text, LayoutAnimation } from "react-native";
import { styles } from "./styles";

const CustomButton = ({ title, onPress, style = {}, disabled = false }) => {
  const [isPressed, setIsPressed] = useState(false);

  const handlePressIn = () => {
    if (!disabled) {
      setIsPressed(true);
      LayoutAnimation.configureNext(
        LayoutAnimation.create(
          100,
          LayoutAnimation.Types.easeInEaseOut,
          LayoutAnimation.Properties.scaleXY
        )
      );
    }
  };

  const handlePressOut = () => {
    if (!disabled) {
      setIsPressed(false);
      LayoutAnimation.configureNext(
        LayoutAnimation.create(
          100,
          LayoutAnimation.Types.easeInEaseOut,
          LayoutAnimation.Properties.scaleXY
        )
      );
    }
  };

  const getButtonStyle = () => {
    if (disabled) return [styles.button, styles.buttonDisabled];

    const styleArray = [styles.button];
    if (isPressed) {
      styleArray.push({
        transform: [{ scale: 0.99 }],
      });
    }

    return styleArray;
  };

  const getTextStyle = () => {
    return disabled ? [styles.text, styles.textDisabled] : [styles.text];
  };

  return (
    <TouchableOpacity
      style={[...getButtonStyle(), style]}
      onPress={onPress}
      disabled={disabled}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      activeOpacity={1}
    >
      <Text style={getTextStyle()}>{title}</Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
