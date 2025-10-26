import React from "react";
import { useNotification } from "./context";
import { NotificationContainerWrapper } from "./styles";
import { NotificationComponent } from ".";

export const NotificationContainer: React.FC = () => {
  const { notifications, removeNotification } = useNotification();

  if (notifications.length === 0) {
    return null;
  }

  return (
    <NotificationContainerWrapper>
      {notifications.map((notification) => (
        <NotificationComponent
          key={notification.id}
          notification={notification}
          onClose={() => removeNotification(notification.id)}
        />
      ))}
    </NotificationContainerWrapper>
  );
};
