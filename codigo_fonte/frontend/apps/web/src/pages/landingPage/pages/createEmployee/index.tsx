import React, { useState, useEffect } from "react";
import {
  HiOutlineLockClosed,
  HiOutlineCheckCircle,
  HiOutlineUser,
  HiOutlineMail,
} from "react-icons/hi";
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
import { useFormErrors } from "../../../../hooks/FormErrors";

interface FormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const EmployeeRegistrationScreen: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const encodedToken = searchParams.get("token");
  const token = encodedToken ? decodeURIComponent(encodedToken) : null;
  const authService = new Auth();
  const { errors, clearFieldError, handleApiErrors } = useFormErrors();

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  const handleSubmit = async (): Promise<void> => {
    setIsLoading(true);
    setError("");

    try {
      await authService.employeeRegister(formData, token!);
      setIsSuccess(true);
      setTimeout(() => navigate("/login"), 2000);
    } catch (err: any) {
      setError(err.response?.data?.message || "Erro ao completar cadastro.");
      if (err.response?.data) {
        handleApiErrors(err.response.data);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange =
    (field: keyof FormData) =>
    (value: string): void => {
      setFormData((prev) => ({ ...prev, [field]: value }));
      clearFieldError(field);
      if (error) setError("");
    };

  if (isSuccess) {
    return (
      <ScreenContainer>
        <AuthCard>
          <SuccessScreen>
            <HiOutlineCheckCircle size={48} color={color.error.ok} />
            <AuthHeader>
              <ScreenTitle>Cadastro Concluído!</ScreenTitle>
              <ScreenDescription>
                Sua conta foi criada com sucesso.
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
            <ScreenTitle>Completar Cadastro</ScreenTitle>
            <ScreenDescription>
              Complete suas informações para criar sua conta
            </ScreenDescription>
          </AuthHeader>

          {error && <StatusMessage variant="error">{error}</StatusMessage>}

          <CustomInput
            value={formData.name}
            onChangeText={handleInputChange("name")}
            placeholder="Digite seu nome completo"
            error={errors.name}
            icon={<HiOutlineUser />}
          />

          <CustomInput
            value={formData.email}
            onChangeText={handleInputChange("email")}
            placeholder="Digite seu email"
            error={errors.email}
            icon={<HiOutlineMail />}
          />

          <CustomInput
            value={formData.password}
            onChangeText={handleInputChange("password")}
            placeholder="Crie uma senha segura"
            error={errors.password}
            icon={<HiOutlineLockClosed />}
            secureTextEntry
          />

          <CustomInput
            value={formData.confirmPassword}
            onChangeText={handleInputChange("confirmPassword")}
            placeholder="Confirme sua senha"
            error={errors.confirmPassword}
            icon={<HiOutlineLockClosed />}
            secureTextEntry
          />

          <CustomButton
            title="Completar Cadastro"
            onPress={handleSubmit}
            disabled={isLoading}
          />

          <ScreenFooter>
            Já tem uma conta?{" "}
            <ScreenLink onClick={() => navigate("/login")}>
              Fazer login
            </ScreenLink>
          </ScreenFooter>
        </AuthForm>
      </AuthCard>
    </ScreenContainer>
  );
};

export default EmployeeRegistrationScreen;
