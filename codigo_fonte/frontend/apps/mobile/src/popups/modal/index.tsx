import React from "react";
import ModalContainer from "../modalContainer";
import {
  ModalBody,
  ModalFooter,
  Button,
  ButtonText,
} from "../style";

interface ModalProps {
  visible: boolean;
  onClose: () => void;
  children: React.ReactNode;
  showFooter?: boolean;
  primaryButtonText?: string;
  secondaryButtonText?: string;
  onPrimaryPress?: () => void;
  onSecondaryPress?: () => void;
  heightPercentage?: number;
  animationType?: "none" | "slide" | "fade";
}

const Modal: React.FC<ModalProps> = ({
  visible,
  onClose,
  children,
  showFooter = true,
  primaryButtonText = "OK",
  secondaryButtonText = "Cancelar",
  onPrimaryPress,
  onSecondaryPress,
  heightPercentage = 80,
  animationType = "slide",
}) => {
  const handlePrimaryPress = (): void => {
    onPrimaryPress?.();
  };

  const handleSecondaryPress = (): void => {
    onSecondaryPress?.();
    onClose?.();
  };

  return (
    <ModalContainer
      visible={visible}
      onClose={onClose}
      heightPercentage={heightPercentage}
      animationType={animationType}
    >
      <ModalBody>{children}</ModalBody>

      {showFooter && (
        <ModalFooter>
          <Button onPress={handleSecondaryPress}>
            <ButtonText>{secondaryButtonText}</ButtonText>
          </Button>
          <Button primary onPress={handlePrimaryPress}>
            <ButtonText primary>{primaryButtonText}</ButtonText>
          </Button>
        </ModalFooter>
      )}
    </ModalContainer>
  );
};

export default Modal;
