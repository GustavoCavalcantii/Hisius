import React from "react";
import {
  Modal as RNModal,
  Pressable,
  Keyboard,
  Dimensions,
} from "react-native";
import { ModalOverlay, ModalContent } from "../style";

const { height } = Dimensions.get("window");

interface ModalContainerProps {
  visible?: boolean;
  onClose?: () => void;
  children: React.ReactNode;
  heightPercentage?: number;
  animationType?: "none" | "slide" | "fade";
  transparent?: boolean;
}

const ModalContainer: React.FC<ModalContainerProps> = ({
  visible = false,
  onClose,
  children,
  heightPercentage = 80,
  animationType = "slide",
  transparent = true,
}) => {
  const handleBackdropPress = (): void => {
    Keyboard.dismiss();
    onClose?.();
  };

  const handleContentPress = (event: any): void => {
    event.stopPropagation();
  };

  return (
    <RNModal
      visible={visible}
      animationType={animationType}
      transparent={transparent}
      onRequestClose={onClose}
    >
      <Pressable onPress={handleBackdropPress} style={{ flex: 1 }}>
        <ModalOverlay>
          <Pressable onPress={handleContentPress}>
            <ModalContent height={(height * heightPercentage) / 100}>
              {children}
            </ModalContent>
          </Pressable>
        </ModalOverlay>
      </Pressable>
    </RNModal>
  );
};

export default ModalContainer;
