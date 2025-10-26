import React, { useEffect } from "react";
import {
  PopupOverlay,
  PopupContainer,
  PopupHeader,
  PopupTitle,
  CloseButton,
  PopupContent,
} from "./styles";
import type { PopupProps } from "./types";
import { TbSquareRoundedX } from "react-icons/tb";

const Popup: React.FC<PopupProps> = ({
  isOpen = false,
  onClose,
  title,
  children,
  showCloseButton = true,
  closeOnOverlayClick = true,
  closeOnEscape = true,
  size = "medium",
  position = "center",
  className,
}) => {
  useEffect(() => {
    if (!closeOnEscape || !isOpen) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, closeOnEscape, onClose]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget && closeOnOverlayClick) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <PopupOverlay
      onClick={handleOverlayClick}
      className={className}
      position={position}
    >
      <PopupContainer size={size}>
        {(title || showCloseButton) && (
          <PopupHeader>
            {showCloseButton && (
              <CloseButton onClick={onClose} aria-label="Fechar">
                <TbSquareRoundedX />
              </CloseButton>
            )}
          </PopupHeader>
        )}
        {title && <PopupTitle>{title}</PopupTitle>}
        <PopupContent>{children}</PopupContent>
      </PopupContainer>
    </PopupOverlay> 
  );
};

export default Popup;
