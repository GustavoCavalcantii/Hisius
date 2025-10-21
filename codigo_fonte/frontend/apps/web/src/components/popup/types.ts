export interface PopupProps {
  isOpen?: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  showCloseButton?: boolean;
  closeOnOverlayClick?: boolean;
  closeOnEscape?: boolean;
  size?: "small" | "medium" | "large" | "fullscreen";
  position?: "center" | "top" | "bottom";
  className?: string;
}

export interface PopupOverlayProps {
  position: "center" | "top" | "bottom";
}

export interface PopupContainerProps {
  size: "small" | "medium" | "large" | "fullscreen";
}
