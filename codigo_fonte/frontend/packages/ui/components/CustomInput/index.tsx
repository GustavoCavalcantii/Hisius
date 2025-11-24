import React, { useState, useRef } from "react";
import {
  View,
  TextInput,
  Text,
  KeyboardTypeOptions,
  StyleProp,
  TextStyle,
  ViewStyle,
  Platform,
} from "react-native";
import { styles } from "./styles";

interface CustomInputProps {
  value: string;
  style?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
  onChangeText: (text: string) => void;
  placeholder?: string;
  secureTextEntry?: boolean;
  keyboardType?: KeyboardTypeOptions;
  autoCapitalize?: "none" | "sentences" | "words" | "characters";
  error?: string;
  icon?: React.ReactNode;
  onIconPress?: () => void;
  disabled?: boolean;
  inputType?: string;
  inputId?: string;
  maxLength?: number;
  onSubmitEditing?: () => void;
  returnKeyType?: "done" | "go" | "next" | "search" | "send";
}

const CustomInput: React.FC<CustomInputProps> = ({
  value,
  style,
  inputStyle,
  onChangeText,
  placeholder,
  secureTextEntry = false,
  keyboardType = "default",
  autoCapitalize = "sentences",
  error = "",
  icon,
  onIconPress,
  disabled = false,
  inputType,
  inputId,
  onSubmitEditing,
  maxLength,
  returnKeyType = "done",
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<TextInput>(null);

  const showLabel = isFocused || value !== "";

  const handleWebStyling = () => {
    if (Platform.OS === "web" && inputRef.current) {
      const element = inputRef.current as any;
      if (element.setNativeProps) {
        element.setNativeProps({
          style: {
            border: "none",
            outline: "none",
            boxShadow: "none",
          },
        });
      }
    }
  };

  return (
    <View style={[styles.container, style]}>
      <View
        style={[
          styles.inputContainer,
          error ? styles.inputContainerError : null,
          isFocused ? styles.inputContainerFocused : null,
          disabled ? styles.inputContainerDisabled : null,
        ]}
      >
        {icon && <View style={styles.iconContainer}>{icon}</View>}

        <View style={styles.inputWrapper}>
          {showLabel && placeholder && (
            <Text
              style={[
                styles.floatingLabel,
                disabled ? styles.floatingLabelDisabled : null,
              ]}
            >
              {placeholder}
            </Text>
          )}

          <TextInput
            ref={inputRef}
            style={[
              styles.input,
              inputStyle,
              showLabel ? styles.inputWithLabel : null,
              disabled ? styles.inputDisabled : null,
              Platform.OS === "web" && {
                borderWidth: 0,
                outlineWidth: 0,
              },
            ]}
            value={value}
            onChangeText={onChangeText}
            placeholder={!showLabel ? placeholder : ""}
            secureTextEntry={secureTextEntry}
            placeholderTextColor="#999"
            selectionColor="#007AFF"
            keyboardType={keyboardType}
            autoCapitalize={autoCapitalize}
            onSubmitEditing={onSubmitEditing}
            returnKeyType={returnKeyType}
            maxLength={maxLength}
            onFocus={() => {
              if (!disabled) {
                setIsFocused(true);
                handleWebStyling();
              }
            }}
            onBlur={() => setIsFocused(false)}
            underlineColorAndroid="transparent"
            textAlignVertical="center"
            onLayout={handleWebStyling}
            editable={!disabled}
            selectTextOnFocus={!disabled}
            {...(inputType && { "data-type": inputType })}
            {...(inputId && { "data-id": inputId })}
            {...(inputId && { testID: inputId })}
            {...props}
          />
        </View>
      </View>

      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
};

export default CustomInput;
