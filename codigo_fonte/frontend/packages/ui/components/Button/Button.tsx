import React from "react";
import { Pressable, Text, StyleSheet } from "react-native";
import { color } from "../../theme/colors";
import { styles } from "./styles";

type ButtonProps = {
  title: string;
  onPress?: () => void;
};

export const Button: React.FC<ButtonProps> = ({ title, onPress }) => {
  return (
    <Pressable style={styles.button} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
};
