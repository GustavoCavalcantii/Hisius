import styled, { keyframes, css } from "styled-components";
import type { NotificationWrapperProps } from "./types";
import { color } from "@hisius/ui/theme/colors";

const slideIn = keyframes`
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

const slideOut = keyframes`
  from {
    transform: translateX(0);
    opacity: 1;
  }
  to {
    transform: translateX(100%);
    opacity: 0;
  }
`;

export const NotificationContainerWrapper = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 1000;
  display: flex;
  flex-direction: column-reverse;
  gap: 1rem;

  @media (max-width: 768px) {
    right: 10px;
    left: 10px;
  }
`;

export const NotificationWrapper = styled.div<NotificationWrapperProps>`
  min-width: 300px;
  max-width: 400px;
  padding: 1rem;

  font-weight: 300;

  position: relative;
  transition:
    transform 0.3s ease,
    opacity 0.3s ease;

  border-left: 6px solid;
  background-color: ${color.front};

  border-radius: 5px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);

  animation: ${slideIn} 0.3s ease-out;

  ${(props) => {
    switch (props.$type) {
      case "info":
        return css`
          border-color: ${color.primary};
        `;
      case "error":
        return css`
          border-color: ${color.error.error};
        `;
      case "warning":
        return css`
          border-color: ${color.error.warning};
        `;
      case "success":
        return css`
          border-color: ${color.error.ok};
        `;
      default:
        return css`
          border-color: ${color.primary};
        `;
    }
  }}

  &:hover {
    transform: translateX(-5px);
  }

  ${(props) =>
    props.$isExiting &&
    css`
      animation: ${slideOut} 0.3s ease-in forwards;
    `}

  @media (max-width: 768px) {
    min-width: auto;
    max-width: none;
  }
`;

export const NotificationContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;
`;

export const NotificationMessage = styled.span`
  font-size: 14px;
  flex: 1;
  margin: 0;
`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  color: inherit;
  opacity: 0.7;
  transition:
    opacity 0.2s ease,
    background-color 0.2s ease;

  &:hover {
    opacity: 1;
    background-color: rgba(0, 0, 0, 0.1);
  }
`;
