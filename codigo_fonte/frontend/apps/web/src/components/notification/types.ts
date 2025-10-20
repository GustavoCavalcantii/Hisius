import type { ReactNode } from "react";

export type NotificationType = "info" | "error" | "warning" | "success";

export interface Notification {
  id: string;
  message: string;
  type: NotificationType;
  duration: number;
}

export interface NotificationContextType {
  notifications: Notification[];
  addNotification: (
    message: string,
    type?: NotificationType,
    duration?: number
  ) => string;
  removeNotification: (id: string) => void;
  clearAll: () => void;
}

export interface NotificationProviderProps {
  children: ReactNode;
}

export interface NotificationComponentProps {
  notification: Notification;
  onClose: () => void;
  style?: React.CSSProperties;
}

export interface NotificationWrapperProps {
  $type: NotificationType;
  $isExiting?: boolean;
}
