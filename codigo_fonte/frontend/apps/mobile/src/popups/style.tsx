  import styled from "styled-components/native";
  import { Dimensions, TouchableOpacityProps } from "react-native";
  import { GlobalText } from "../components/globalText";
  import { color } from "@hisius/ui/theme/colors";

  const { width, height } = Dimensions.get("window");

  interface ModalContentProps {
    height?: number;
  }

  interface ButtonProps extends TouchableOpacityProps {
    primary?: boolean;
  }

  interface InputProps {
    hasError?: boolean;
  }

  interface InputLabelProps {
    type?: "hint" | "error" | "default";
  }

  export const ModalOverlay = styled.View`
    flex: 1;
    background-color: rgba(0, 0, 0, 0.5);
    justify-content: center;
    align-items: center;
    padding: 20px;
  `;

  export const ModalContent = styled.View<ModalContentProps>`
    background-color: white;
    border-radius: 12px;
    width: ${width - 40}px;
    max-height: ${(props) => props.height || height * 0.8}px;
  `;

  export const ModalTitle = styled(GlobalText)`
    font-size: 18px;
    font-weight: bold;
    flex: 1;
  `;

  export const CloseButton = styled.TouchableOpacity`
    padding: 5px;
    margin-left: 10px;
  `;

  export const CloseButtonText = styled(GlobalText)`
    font-size: 20px;
    color: ${color.gray};
    font-weight: bold;
  `;

  export const ModalBody = styled.ScrollView`
    padding: 20px;
  `;

  export const ModalFooter = styled.View`
    padding: 15px 20px;
    border-top-width: 1px;
    border-top-color: ${color.front};
    flex-direction: row;
    justify-content: flex-end;
    gap: 10px;
  `;

  export const Button = styled.TouchableOpacity<ButtonProps>`
    padding: 12px 24px;
    border-radius: 6px;
    background-color: ${(props) => (props.primary ? color.primary : color.front)};
    min-width: 80px;
    align-items: center;
  `;

  export const ButtonText = styled.Text<{ primary?: boolean }>`
    color: ${(props) => (props.primary ? color.front : color.text)};
    font-size: 16px;
    font-weight: 500;
  `;

  export const InputContainer = styled.View`
    margin: 35px 0;
  `;

  export const Input = styled.TextInput<InputProps>`
    border-width: 1px;
    border-color: ${(props) =>
      props.hasError ? color.error.error : color.background};
    border-radius: 8px;
    padding: 12px 15px;
    font-size: 16px;
    background-color: ${color.background};
    font-family: "Montserrat";
    color: ${color.text};
  `;

  export const InputLabel = styled.Text<InputLabelProps>`
    font-size: ${(props) => (props.type === "hint" ? "15px" : "18px")};
    color: ${(props) => {
      switch (props.type) {
        case "hint":
          return color.text;
        case "error":
          return color.error.error;
        default:
          return color.text;
      }
    }};
    margin-bottom: ${(props) => (props.type === "hint" ? "0px" : "10px")};
    font-weight: ${(props) => (props.type === "hint" ? "normal" : "500")};
    text-align: ${(props) => (props.type === "hint" ? "center" : "left")};
    line-height: ${(props) => (props.type === "hint" ? "18px" : "20px")};
  `;

  export const ErrorText = styled.Text`
    color: ${color.error.error};
    font-size: 14px;
    margin-top: 5px;
    margin-bottom: 10px;
  `;
