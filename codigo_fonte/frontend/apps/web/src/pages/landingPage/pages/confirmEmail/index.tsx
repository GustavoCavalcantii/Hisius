import React, { useState, useEffect } from "react";
import { HiOutlineCheckCircle } from "react-icons/hi";
import CustomButton from "@hisius/ui/components/Button";
import { Auth } from "@hisius/services/src";
import { color } from "@hisius/ui/theme/colors";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  ScreenContainer,
  AuthCard,
  AuthForm,
  AuthHeader,
  ScreenTitle,
  ScreenDescription,
  StatusMessage,
  SuccessScreen,
} from "./style";

const ConfirmEmailScreen: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isVerified, setIsVerified] = useState(false);

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const authService = new Auth();

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }
    handleVerifyEmail(token);
  }, [token]);

  const handleVerifyEmail = async (token: string): Promise<void> => {
    setIsLoading(true);
    setError("");

    try {
      await authService.resetEmail(token);
      setIsVerified(true);
    } catch (err: any) {
      setError(err.response.data.message || "Link expirado ou inválido.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isVerified) {
    return (
      <ScreenContainer>
        <AuthCard>
          <SuccessScreen>
            <HiOutlineCheckCircle size={48} color={color.error.ok} />
            <AuthHeader>
              <ScreenTitle>Email Verificado!</ScreenTitle>
              <ScreenDescription>
                Seu email foi verificado com sucesso.
              </ScreenDescription>
            </AuthHeader>
            <CustomButton
              title="Ir para o Login"
              onPress={() => navigate("/login")}
            />
          </SuccessScreen>
        </AuthCard>
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer>
      <AuthCard>
        <AuthForm onSubmit={(e) => e.preventDefault()} noValidate>
          <AuthHeader>
            <ScreenTitle>
              {error ? "Falha na Verificação" : "Verificar Email"}
            </ScreenTitle>
            <ScreenDescription>
              {error
                ? "Não foi possível verificar seu email."
                : "Estamos verificando seu email..."}
            </ScreenDescription>
          </AuthHeader>

          {error && <StatusMessage variant="error">{error}</StatusMessage>}

          {!error && isLoading && (
            <StatusMessage variant="info">Verificando...</StatusMessage>
          )}
        </AuthForm>
      </AuthCard>
    </ScreenContainer>
  );
};

export default ConfirmEmailScreen;
