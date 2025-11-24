import styled, { css } from "styled-components/native";
import { Dimensions } from "react-native";
import type { NotificationWrapperProps } from "./types";
import { color } from "@hisius/ui/theme/colors";

export const NotificationContainerWrapper = styled.View`
  position: absolute;
  bottom: 20px;
  right: 20px;
  z-index: 1000;
  display: flex;
  flex-direction: column-reverse;
  gap: 16px;

  ${() => {
    const { width } = Dimensions.get("window");
    if (width <= 768) {
      return css`
        right: 10px;
        left: 10px;
      `;
    }
    return "";
  }}
`;

export const NotificationWrapper = styled.View<NotificationWrapperProps>`
  min-width: 300px;
  max-width: 400px;
  padding: 16px;
  position: relative;
  border-left-width: 6px;
  border-left-color: ${color.front};
  background-color: ${color.front};
  border-radius: 5px;
  shadow-color: #000;
  shadow-offset: 0px 4px;
  shadow-opacity: 0.15;
  shadow-radius: 12px;
  elevation: 5;

  ${(props) => {
    switch (props.$type) {
      case "info":
        return css`
          border-left-color: ${color.primary};
        `;
      case "error":
        return css`
          border-left-color: ${color.error.error};
        `;
      case "warning":
        return css`
          border-left-color: ${color.error.warning};
        `;
      case "success":
        return css`
          border-left-color: ${color.error.ok};
        `;
      default:
        return css`
          border-left-color: ${color.primary};
        `;
    }
  }}

  ${() => {
    const { width } = Dimensions.get("window");
    if (width <= 768) {
      return css`
        min-width: auto;
        max-width: none;
      `;
    }
    return "";
  }}
`;

export const NotificationContent = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  gap: 16px;
`;

export const NotificationMessage = styled.Text`
  font-size: 14px;
  flex: 1;
  margin: 0;
  color: #000;
  font-weight: 300;
`;

export const CloseButton = styled.TouchableOpacity`
  background-color: transparent;
  border: none;
  padding: 0;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  opacity: 0.7;
`;

export const CloseButtonContent = styled.View`
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
`;
