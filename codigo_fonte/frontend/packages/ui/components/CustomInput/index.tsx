import React, { useState } from "react";
import {
  View,
  TextInput,
  Text,
  KeyboardTypeOptions,
  TouchableOpacity,
  StyleProp,
  TextStyle,
} from "react-native";
import { styles } from "./styles";

interface CustomInputProps {
  value: string;
  style?: StyleProp<TextStyle>;
  onChangeText: (text: string) => void;
  placeholder?: string;
  secureTextEntry?: boolean;
  keyboardType?: KeyboardTypeOptions;
  autoCapitalize?: "none" | "sentences" | "words" | "characters";
  error?: string;
  icon?: React.ReactNode;
  onIconPress?: () => void;
}

const CustomInput: React.FC<CustomInputProps> = ({
  value,
  style,
  onChangeText,
  placeholder,
  secureTextEntry = false,
  keyboardType = "default",
  autoCapitalize = "sentences",
  error = "",
  icon,
  onIconPress,
  ...props
}) => {
  return (
    <View style={styles.container}>
      <View
        style={[
          styles.inputContainer,
          error ? styles.inputContainerError : null,
        ]}
      >
        {icon && <View style={styles.iconContainer}>{icon}</View>}
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor="#999"
          selectionColor="#000"
          {...props}
        />
      </View>

      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
};

export default CustomInput;
