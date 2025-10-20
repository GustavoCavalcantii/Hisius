import React, { useEffect, useState } from "react";
import type { NotificationComponentProps } from "./types";
import { TbSquareRoundedX } from "react-icons/tb";
import {
  NotificationWrapper,
  NotificationContent,
  NotificationMessage,
  CloseButton,
} from "./styles";

export const NotificationComponent: React.FC<NotificationComponentProps> = ({
  notification,
  onClose,
  style,
}) => {
  const { message, type, duration } = notification;
  const [isExiting, setIsExiting] = useState<boolean>(false);

  const handleClose = () => {
    setIsExiting(true);
    setTimeout(() => {
      onClose();
    }, 250);
  };

  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        handleClose();
      }, duration - 300);

      return () => clearTimeout(timer);
    }
  }, [duration]);

  return (
    <NotificationWrapper $type={type} $isExiting={isExiting} style={style}>
      <NotificationContent>
        <NotificationMessage>{message}</NotificationMessage>
        <CloseButton onClick={handleClose} aria-label="Fechar notificação">
          <TbSquareRoundedX />
        </CloseButton>
      </NotificationContent>
    </NotificationWrapper>
  );
};
