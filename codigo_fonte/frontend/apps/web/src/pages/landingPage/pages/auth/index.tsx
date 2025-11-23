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
  FormsWrapper,
  FormContainer,
  TogglePanel,
  TogglePanelContent,
  ToggleTitle,
  ToggleText,
  ToggleButton,
  ToggleOverlay,
} from "./style";
import CustomInput from "@hisius/ui/components/CustomInput";
import CustomButton from "@hisius/ui/components/Button";
import { Auth } from "@hisius/services/src";
import LocalStorageManager from "@hisius/services/src/helpers/localStorageManager";
import { useNavigate } from "react-router-dom";

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

interface LoginFormProps {
  onLogin?: (data: LoginFormData) => void;
  onRegister?: (data: RegisterFormData) => void;
  loading?: boolean;
}

const LoginForm: React.FC<LoginFormProps> = () => {
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
  const [errors, setErrors] = useState<
    Partial<LoginFormData & RegisterFormData>
  >({});
  const authService = new Auth();

  const validateLoginForm = (): boolean => {
    const newErrors: Partial<LoginFormData> = {};
    if (!loginData.email) newErrors.email = "Email é obrigatório";
    else if (!/\S+@\S+\.\S+/.test(loginData.email))
      newErrors.email = "Email inválido";

    if (!loginData.password) newErrors.password = "Senha é obrigatória";
    else if (loginData.password.length < 6)
      newErrors.password = "Senha deve ter pelo menos 6 caracteres";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateRegisterForm = (): boolean => {
    const newErrors: Partial<RegisterFormData> = {};
    if (!registerData.name) newErrors.name = "Nome é obrigatório";

    if (!registerData.email) newErrors.email = "Email é obrigatório";
    else if (!/\S+@\S+\.\S+/.test(registerData.email))
      newErrors.email = "Email inválido";

    if (!registerData.password) newErrors.password = "Senha é obrigatória";
    else if (registerData.password.length < 6)
      newErrors.password = "Senha deve ter pelo menos 6 caracteres";

    if (!registerData.confirmPassword)
      newErrors.confirmPassword = "Confirme sua senha";
    else if (registerData.password !== registerData.confirmPassword)
      newErrors.confirmPassword = "Senhas não coincidem";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLoginSubmit = async () => {
    if (!validateLoginForm()) return;

    try {
      const data = await authService.Login(loginData);
      const { accessToken, ...rest } = data;

      LocalStorageManager.setTokens(accessToken);
      LocalStorageManager.setUser(rest);
      window.location.reload();
    } catch (err) {}
  };

  const handleRegisterSubmit = async () => {
    if (!validateRegisterForm()) return;

    try {
      const data = await authService.register(registerData);
      const { accessToken, ...rest } = data;

      LocalStorageManager.setTokens(accessToken);
      LocalStorageManager.setUser(rest);
      window.location.reload();
    } catch (err) {}
  };

  const handleInputChange =
    (form: "login" | "register", field: string) => (value: string) => {
      if (form === "login") {
        setLoginData((prev) => ({ ...prev, [field]: value }));
      } else {
        setRegisterData((prev) => ({ ...prev, [field]: value }));
      }
      if (errors[field as keyof typeof errors]) {
        setErrors((prev) => ({ ...prev, [field]: undefined }));
      }
    };

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setErrors({});
  };

  const iconStyle = { width: "20px", height: "20px" };

  return (
    <LoginContainer>
      <FormsWrapper>
        <FormContainer position="left" isActive={isLogin}>
          <LoginFormWrapper onSubmit={(e) => e.preventDefault()}>
            <Title>Entrar</Title>
            <Subtitle>Entre na sua conta</Subtitle>

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

            <CustomButton title="Entrar" onPress={handleLoginSubmit} />
          </LoginFormWrapper>
        </FormContainer>

        <FormContainer position="right" isActive={!isLogin}>
          <LoginFormWrapper onSubmit={(e) => e.preventDefault()}>
            <Title>Cadastre-se</Title>
            <Subtitle>Crie sua conta</Subtitle>

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
