import React, { useState, useEffect } from "react";
import { HiOutlineLockClosed, HiOutlineCheckCircle } from "react-icons/hi";
import CustomInput from "@hisius/ui/components/CustomInput";
import CustomButton from "@hisius/ui/components/Button";
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
  ScreenLink,
  ScreenFooter,
} from "./style";
import { Auth } from "@hisius/services/src";

interface FormData {
  password: string;
  confirmPassword: string;
}

const PasswordSetupScreen: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const authService = new Auth();

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  const validateForm = (): boolean => {
    if (!formData.password) {
      setError("Senha é obrigatória");
      return false;
    }
    if (formData.password.length < 8) {
      setError("A senha deve ter pelo menos 8 caracteres");
      return false;
    }
    if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      setError("A senha deve conter letras maiúsculas, minúsculas e números");
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setError("As senhas não coincidem");
      return false;
    }
    return true;
  };

  const handleSubmit = async (): Promise<void> => {
    if (!validateForm()) return;

    setIsLoading(true);
    setError("");

    try {
      await authService.resetPass(
        token!,
        formData.password,
        formData.confirmPassword
      );
      setIsSuccess(true);
      setTimeout(() => navigate("/login"), 2000);
    } catch (err: any) {
      setError(err.response.data.message || "Erro ao redefinir senha.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange =
    (field: keyof FormData) =>
    (value: string): void => {
      setFormData((prev) => ({ ...prev, [field]: value }));
      if (error) setError("");
    };

  if (isSuccess) {
    return (
      <ScreenContainer>
        <AuthCard>
          <SuccessScreen>
            <HiOutlineCheckCircle size={48} color={color.error.ok} />
            <AuthHeader>
              <ScreenTitle>Senha Redefinida!</ScreenTitle>
              <ScreenDescription>
                Sua senha foi redefinida com sucesso.
                <br />
                Redirecionando para o login...
              </ScreenDescription>
            </AuthHeader>
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
            <ScreenTitle>Redefinir Senha</ScreenTitle>
            <ScreenDescription>
              Crie uma nova senha segura para sua conta
            </ScreenDescription>
          </AuthHeader>

          {error && <StatusMessage variant="error">{error}</StatusMessage>}

          <CustomInput
            value={formData.password}
            onChangeText={handleInputChange("password")}
            placeholder="Digite sua nova senha"
            error={error && !formData.password ? error : undefined}
            icon={<HiOutlineLockClosed />}
            secureTextEntry
          />

          <CustomInput
            value={formData.confirmPassword}
            onChangeText={handleInputChange("confirmPassword")}
            placeholder="Confirme sua senha"
            error={
              error && formData.password !== formData.confirmPassword
                ? error
                : undefined
            }
            icon={<HiOutlineLockClosed />}
            secureTextEntry
          />

          <CustomButton
            title="Redefinir Senha"
            onPress={handleSubmit}
            disabled={isLoading}
          />

          <ScreenFooter>
            Lembrou sua senha?{" "}
            <ScreenLink onClick={() => navigate("/login")}>
              Voltar para o login
            </ScreenLink>
          </ScreenFooter>
        </AuthForm>
      </AuthCard>
    </ScreenContainer>
  );
};

export default PasswordSetupScreen;
