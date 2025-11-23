import React, { useState } from "react";
import { HiOutlineMail, HiOutlineCheckCircle } from "react-icons/hi";
import CustomInput from "@hisius/ui/components/CustomInput";
import CustomButton from "@hisius/ui/components/Button";
import { Auth } from "@hisius/services/src";
import { color } from "@hisius/ui/theme/colors";
import { useNavigate } from "react-router-dom";
import {
  ScreenContainer,
  AuthCard,
  AuthForm,
  AuthHeader,
  ScreenTitle,
  ScreenDescription,
  StatusMessage,
  SuccessScreen,
  EmailHighlight,
  ScreenLink,
  ScreenFooter,
} from "./style";
import type { FormErrors, ResetPasswordStep } from "./types";
import { validateEmail } from "../../../../utils";

const ResetPasswordScreen: React.FC = () => {
  const [currentStep, setCurrentStep] =
    useState<ResetPasswordStep>("EMAIL_INPUT");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const authService = new Auth();
  const navigate = useNavigate();

  const validateEmailStep = (): boolean => {
    const newErrors: FormErrors = {};

    if (!validateEmail(email)) {
      newErrors.email = "Por favor, insira um email válido";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRequestResetLink = async (): Promise<void> => {
    if (!validateEmailStep()) return;

    setIsLoading(true);
    setErrorMessage("");

    try {
      await authService.changePass(email);

      setCurrentStep("EMAIL_SENT");
      setSuccessMessage(
        "Link de redefinição enviado para seu email com sucesso!"
      );
    } catch (err: any) {
      setErrorMessage(
        err.response.data.message ||
          "Erro ao solicitar o link de redefinição. Tente novamente."
      );
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (value: string): void => {
    setEmail(value);

    if (errors.email) {
      setErrors((prev) => ({ ...prev, email: undefined }));
    }

    if (errorMessage) {
      setErrorMessage("");
    }
  };

  const handleResendLink = (): void => {
    setErrorMessage("");
    handleRequestResetLink();
  };

  const handleBackToLogin = (): void => {
    navigate("/login");
  };

  const handleSubmitEditing = (): void => {
    if (currentStep === "EMAIL_INPUT") {
      handleRequestResetLink();
    }
  };

  const renderEmailInputStep = () => (
    <>
      <AuthHeader>
        <ScreenTitle>Redefinir Senha</ScreenTitle>
        <ScreenDescription>
          Digite seu email para receber um link seguro de redefinição de senha
        </ScreenDescription>
      </AuthHeader>

      <StatusMessage variant="info">
        <strong>Link seguro</strong>
        <br />
        Enviaremos um link de redefinição que expira em 1 hora
      </StatusMessage>

      <CustomInput
        value={email}
        onChangeText={handleInputChange}
        placeholder="Seu endereço de email"
        error={errors.email}
        icon={<HiOutlineMail />}
        onSubmitEditing={handleSubmitEditing}
        returnKeyType="go"
      />

      <CustomButton
        title="Enviar Link de Redefinição"
        onPress={handleRequestResetLink}
        disabled={isLoading}
      />
    </>
  );

  const renderEmailSentStep = () => (
    <SuccessScreen>
      <HiOutlineCheckCircle
        size={48}
        color={color.error.ok}
        style={{ marginBottom: "16px" }}
      />

      <AuthHeader>
        <ScreenTitle>Email Enviado!</ScreenTitle>
        <ScreenDescription>
          Enviamos um link de redefinição para:
          <br />
          <EmailHighlight>{email}</EmailHighlight>
        </ScreenDescription>
      </AuthHeader>

      <StatusMessage variant="info">
        <strong>Verifique sua caixa de entrada</strong>
        <br />
        Clique no link que enviamos para criar uma nova senha.
        <br />O link expira em 1 hora.
      </StatusMessage>

      <ScreenDescription>
        Não recebeu o email?{" "}
        <ScreenLink
          onClick={handleResendLink}
          type="button"
          disabled={isLoading}
        >
          Reenviar link
        </ScreenLink>
      </ScreenDescription>
    </SuccessScreen>
  );

  return (
    <ScreenContainer>
      <AuthCard>
        <AuthForm
          onSubmit={(e) => {
            e.preventDefault();
            if (currentStep === "EMAIL_INPUT") {
              handleRequestResetLink();
            }
          }}
          noValidate
        >
          {successMessage && (
            <StatusMessage variant="success">{successMessage}</StatusMessage>
          )}

          {errorMessage && (
            <StatusMessage variant="error">{errorMessage}</StatusMessage>
          )}

          {currentStep === "EMAIL_INPUT" && renderEmailInputStep()}
          {currentStep === "EMAIL_SENT" && renderEmailSentStep()}

          <ScreenFooter>
            Lembrou sua senha?{" "}
            <ScreenLink onClick={handleBackToLogin}>
              Voltar para o login
            </ScreenLink>
          </ScreenFooter>
        </AuthForm>
      </AuthCard>
    </ScreenContainer>
  );
};

export default ResetPasswordScreen;
