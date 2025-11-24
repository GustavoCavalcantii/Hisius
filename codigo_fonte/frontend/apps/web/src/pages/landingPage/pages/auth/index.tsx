import React, { useState } from "react";
import {
  HiOutlineMail,
  HiOutlineLockClosed,
  HiOutlineUser,
} from "react-icons/hi";
import {
  LoginContainer,
  LoginFormWrapper,
  Subtitle,
  Title,
  Link,
  FormsWrapper,
  FormContainer,
  TogglePanel,
  TogglePanelContent,
  ToggleTitle,
  ToggleText,
  ToggleButton,
  ToggleOverlay,
  StatusMessage,
} from "./style";
import CustomInput from "@hisius/ui/components/CustomInput";
import CustomButton from "@hisius/ui/components/Button";
import { Auth } from "@hisius/services/src";
import { useFormErrors } from "../../../../hooks/FormErrors";
import { useAuth } from "../../../../context/authContext";
import { usePageTitle } from "../../../../hooks/PageTitle";

export interface LoginFormData {
  email: string;
  password: string;
}

export interface RegisterFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const LoginForm: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [loginData, setLoginData] = useState<LoginFormData>({
    email: "",
    password: "",
  });
  const [registerData, setRegisterData] = useState<RegisterFormData>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  usePageTitle("Autenticação");

  const {
    errors,
    handleApiErrors,
    setFieldError,
    clearFieldError,
    clearAllErrors,
  } = useFormErrors();

  const authService = new Auth();
  const auth = useAuth();

  const validateLoginForm = (): boolean => {
    const newErrors: Partial<LoginFormData> = {};

    if (!loginData.email) newErrors.email = "Email é obrigatório";
    if (!loginData.password) newErrors.password = "Senha é obrigatória";

    Object.keys(newErrors).forEach((field) => {
      setFieldError(field, newErrors[field as keyof LoginFormData]!);
    });

    return Object.keys(newErrors).length === 0;
  };

  const validateRegisterForm = (): boolean => {
    const newErrors: Partial<RegisterFormData> = {};

    if (!registerData.name) newErrors.name = "Nome é obrigatório";
    if (!registerData.email) newErrors.email = "Email é obrigatório";
    if (!registerData.password) newErrors.password = "Senha é obrigatória";
    if (!registerData.confirmPassword)
      newErrors.confirmPassword = "Confirme sua senha";
    if (registerData.password !== registerData.confirmPassword) {
      newErrors.confirmPassword = "Senhas não coincidem";
    }

    Object.keys(newErrors).forEach((field) => {
      setFieldError(field, newErrors[field as keyof RegisterFormData]!);
    });

    return Object.keys(newErrors).length === 0;
  };

  const handleLoginSubmit = async () => {
    setErrorMessage("");
    setSuccessMessage("");

    if (!validateLoginForm()) return;

    try {
      const data = await authService.Login(loginData);
      const { accessToken, ...rest } = data;

      if (rest.role != 0 && rest.role != 2) {
        setErrorMessage("Você não tem permissão para acessar");
        return;
      }

      auth.login(rest, accessToken!);
      window.location.reload();
    } catch (err: any) {
      if (err.response?.data) {
        handleApiErrors(err.response.data);
        setErrorMessage(err.response.data.message || "Erro ao fazer login");
      }
    }
  };

  const handleRegisterSubmit = async () => {
    setErrorMessage("");
    setSuccessMessage("");

    if (!validateRegisterForm()) return;

    try {
      await authService.adminRegister(registerData);
      setSuccessMessage("Cadastro realizado com sucesso!");
      setTimeout(() => window.location.reload(), 2000);
    } catch (err: any) {
      if (err.response?.data) {
        handleApiErrors(err.response.data);
        setErrorMessage(err.response.data.message || "Erro ao cadastrar");
      }
    }
  };

  const handleInputChange =
    (form: "login" | "register", field: string) => (value: string) => {
      if (form === "login") {
        setLoginData((prev) => ({ ...prev, [field]: value }));
      } else {
        setRegisterData((prev) => ({ ...prev, [field]: value }));
      }
      if (errors[field]) {
        clearFieldError(field);
      }
      if (errorMessage) {
        setErrorMessage("");
      }
    };

  const toggleForm = () => {
    setIsLogin(!isLogin);
    clearAllErrors();
    setErrorMessage("");
    setSuccessMessage("");
  };

  const iconStyle = { width: "20px", height: "20px" };

  return (
    <LoginContainer>
      <FormsWrapper>
        <FormContainer position="left" isActive={isLogin}>
          <LoginFormWrapper onSubmit={(e) => e.preventDefault()}>
            <Title>Entrar</Title>
            <Subtitle>Entre na sua conta</Subtitle>

            {successMessage && (
              <StatusMessage variant="success">{successMessage}</StatusMessage>
            )}

            {errorMessage && (
              <StatusMessage variant="error">{errorMessage}</StatusMessage>
            )}

            <CustomInput
              value={loginData.email}
              onChangeText={handleInputChange("login", "email")}
              placeholder="Email"
              error={errors.email}
              icon={<HiOutlineMail style={iconStyle} />}
            />

            <CustomInput
              value={loginData.password}
              onChangeText={handleInputChange("login", "password")}
              placeholder="Senha"
              error={errors.password}
              icon={<HiOutlineLockClosed style={iconStyle} />}
              secureTextEntry
            />
            <p>
              <Link href="/senha/esqueci">Esqueci minha senha</Link>
            </p>
            <p>
              Não tem uma conta? <Link onClick={toggleForm}>Cadastre-se</Link>
            </p>
            <CustomButton title="Entrar" onPress={handleLoginSubmit} />
          </LoginFormWrapper>
        </FormContainer>

        <FormContainer position="right" isActive={!isLogin}>
          <LoginFormWrapper onSubmit={(e) => e.preventDefault()}>
            <Title>Cadastre-se</Title>
            <Subtitle>Crie sua conta de administrador</Subtitle>

            {successMessage && (
              <StatusMessage variant="success">{successMessage}</StatusMessage>
            )}

            {errorMessage && (
              <StatusMessage variant="error">{errorMessage}</StatusMessage>
            )}

            <CustomInput
              value={registerData.name}
              onChangeText={handleInputChange("register", "name")}
              placeholder="Nome completo"
              error={errors.name}
              icon={<HiOutlineUser style={iconStyle} />}
            />

            <CustomInput
              value={registerData.email}
              onChangeText={handleInputChange("register", "email")}
              placeholder="Email"
              error={errors.email}
              icon={<HiOutlineMail style={iconStyle} />}
            />

            <CustomInput
              value={registerData.password}
              onChangeText={handleInputChange("register", "password")}
              placeholder="Senha"
              error={errors.password}
              icon={<HiOutlineLockClosed style={iconStyle} />}
              secureTextEntry
            />

            <CustomInput
              value={registerData.confirmPassword}
              onChangeText={handleInputChange("register", "confirmPassword")}
              placeholder="Confirmar senha"
              error={errors.confirmPassword}
              icon={<HiOutlineLockClosed style={iconStyle} />}
              secureTextEntry
            />
            <p>
              Já tem uma conta? <Link onClick={toggleForm}>Entrar</Link>
            </p>
            <CustomButton title="Cadastrar" onPress={handleRegisterSubmit} />
          </LoginFormWrapper>
        </FormContainer>

        <TogglePanel isLogin={isLogin}>
          <ToggleOverlay />
          <TogglePanelContent isVisible={isLogin}>
            <ToggleTitle>Olá!</ToggleTitle>
            <ToggleText>
              Preencha seus dados para seguir com a gente.
            </ToggleText>
            <ToggleButton onClick={toggleForm}>Criar conta</ToggleButton>
          </TogglePanelContent>

          <TogglePanelContent isVisible={!isLogin}>
            <ToggleTitle>Bom te ver de volta!</ToggleTitle>
            <ToggleText>
              Para continuar, insira as informações da sua conta.
            </ToggleText>
            <ToggleButton onClick={toggleForm}>Entrar</ToggleButton>
          </TogglePanelContent>
        </TogglePanel>
      </FormsWrapper>
    </LoginContainer>
  );
};

export default LoginForm;
