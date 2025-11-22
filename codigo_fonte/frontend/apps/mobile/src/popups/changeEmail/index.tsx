import React, { useState, useEffect } from "react";
import { Keyboard } from "react-native";
import Modal from "../modal";
import { ModalBody, InputLabel, InputContainer, ErrorText } from "../style";
import { validateEmail } from "../../utils/validate";
import CustomInput from "packages/ui/components/CustomInput";

interface EmailChangeModalProps {
  visible: boolean;
  onClose: () => void;
  onEmailSubmit?: (email: string) => void;
  currentEmail?: string;
}

const EmailChangeModal: React.FC<EmailChangeModalProps> = ({
  visible,
  onClose,
  onEmailSubmit,
  currentEmail = "",
}) => {
  const [email, setEmail] = useState(currentEmail);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (visible) {
      setEmail(currentEmail);
      setError("");
    }
  }, [visible, currentEmail]);

  const handleSubmit = async (): Promise<void> => {
    Keyboard.dismiss();

    if (!email.trim()) {
      setError("Por favor, insira um endereço de email");
      return;
    }

    if (!validateEmail(email)) {
      setError("Por favor, insira um endereço de email válido");
      return;
    }

    if (email.trim().toLowerCase() === currentEmail.toLowerCase()) {
      setError("Este já é o seu email atual");
      return;
    }

    setError("");
    setIsLoading(true);

    try {
      await onEmailSubmit?.(email.trim());
    } catch (error) {
      setError("Erro ao enviar solicitação. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = (): void => {
    setEmail(currentEmail);
    setError("");
    Keyboard.dismiss();
    onClose();
  };

  return (
    <Modal
      visible={visible}
      onClose={handleClose}
      primaryButtonText={isLoading ? "Enviando..." : "Enviar Confirmação"}
      secondaryButtonText="Cancelar"
      onPrimaryPress={handleSubmit}
      onSecondaryPress={handleClose}
      heightPercentage={45}
      animationType="fade"
    >
      <ModalBody>
        <InputLabel>
          Para qual endereço de email você deseja alterar?
        </InputLabel>

        <InputContainer>
          <CustomInput
            placeholder="Email"
            value={email}
            onChangeText={(text: string) => {
              setEmail(text);
              if (error) setError("");
            }}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </InputContainer>

        {error ? (
          <ErrorText>{error}</ErrorText>
        ) : (
          <InputLabel type="hint">
            Enviaremos um email de verificação para confirmar que este email
            pertence a você.
          </InputLabel>
        )}
      </ModalBody>
    </Modal>
  );
};

export default EmailChangeModal;
