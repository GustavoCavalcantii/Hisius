import React, { useEffect, useState } from "react";
import {
  Alert,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import * as S from "./style";

import { Auth, getToken, saveToken, saveUser } from "@hisius/services";
import CustomInput from "@hisius/ui/components/CustomInput";
import CustomButton from "@hisius/ui/components/Button";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "apps/mobile/navigation/types";
import { Feather } from "@expo/vector-icons";
import { color } from "@hisius/ui/theme/colors";
import { useFormErrors } from "../../hooks/FormErrors";

export default function LoginRegister() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const [mode, setMode] = useState<"login" | "register">("login");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const AuthService = new Auth();

  const [loading, setLoading] = useState(false);

  const { errors, clearFieldError, clearAllErrors, handleApiErrors } =
    useFormErrors();

  useEffect(() => {
    const checkToken = async () => {
      const token = await getToken();
      if (token) {
        navigation.navigate("Home");
      }
    };
    checkToken();
  }, []);

  const handleSubmit = async () => {
    try {
      clearAllErrors();

      setLoading(true);

      if (mode === "login") {
        const data = await AuthService.Login({ email, password });
        const { accessToken, ...rest } = data;
        saveToken(accessToken);
        saveUser(rest);

        navigation.navigate("Home");
        return;
      }

      const response = await AuthService.register({
        name,
        email,
        password,
        confirmPassword,
      });

      const loginData = await AuthService.Login({ email, password });
      const { accessToken, ...rest } = loginData;
      saveToken(accessToken);
      saveUser(rest);

      navigation.navigate("Home");
    } catch (error: any) {
      if (error.response?.data) {
        handleApiErrors(error.response.data);
      } else {
        Alert.alert("Erro", "Falha ao processar a ação.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleEmailChange = (text: string) => {
    setEmail(text);
    if (errors.email) clearFieldError("email");
  };

  const handlePasswordChange = (text: string) => {
    setPassword(text);
    if (errors.password) clearFieldError("password");
  };

  const handleConfirmPasswordChange = (text: string) => {
    setConfirmPassword(text);
    if (errors.confirmPassword) clearFieldError("confirmPassword");
  };

  const handleNameChange = (text: string) => {
    setName(text);
    if (errors.name) clearFieldError("name");
  };

  const handleModeChange = (newMode: "login" | "register") => {
    setMode(newMode);
    clearAllErrors();
    if (newMode === "login") {
      setConfirmPassword("");
      setName("");
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <S.Container>
          <S.Title>HISIUS</S.Title>

          <View style={{ flex: 1, width: "100%" }}>
            <S.TabContainer>
              <S.TabButton
                active={mode === "login"}
                onPress={() => handleModeChange("login")}
              >
                <S.TabText>Entrar</S.TabText>
                {mode === "login" && <S.ActiveBar />}
              </S.TabButton>

              <S.TabButton
                active={mode === "register"}
                onPress={() => handleModeChange("register")}
              >
                <S.TabText>Registrar</S.TabText>
                {mode === "register" && <S.ActiveBar />}
              </S.TabButton>
            </S.TabContainer>

            <S.InnerContainer>
              <S.InputContainer>
                {mode === "register" && (
                  <CustomInput
                    placeholder="Nome"
                    value={name}
                    inputId="name"
                    icon={<Feather name="user" size={15} color={color.text} />}
                    onChangeText={handleNameChange}
                    error={errors.name}
                  />
                )}

                <CustomInput
                  placeholder="E-mail"
                  value={email}
                  inputId="email"
                  onChangeText={handleEmailChange}
                  icon={<Feather name="mail" size={15} color={color.text} />}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  error={errors.email}
                />

                <CustomInput
                  placeholder="Senha"
                  value={password}
                  inputId="password"
                  icon={<Feather name="lock" size={15} color={color.text} />}
                  onChangeText={handlePasswordChange}
                  visibilityOff={
                    <Feather name="eye-off" size={15} color={color.text} />
                  }
                  visibilityOn={
                    <Feather name="eye" size={15} color={color.text} />
                  }
                  secureTextEntry
                  error={errors.password}
                />

                {mode === "register" && (
                  <CustomInput
                    placeholder="Confirmar senha"
                    value={confirmPassword}
                    inputId="confirmpassword"
                    icon={<Feather name="lock" size={15} color={color.text} />}
                    visibilityOff={
                      <Feather name="eye-off" size={15} color={color.text} />
                    }
                    visibilityOn={
                      <Feather name="eye" size={15} color={color.text} />
                    }
                    onChangeText={handleConfirmPasswordChange}
                    secureTextEntry
                    error={errors.confirmPassword}
                  />
                )}
              </S.InputContainer>

              <CustomButton
                title={mode === "login" ? "Entrar" : "Registrar"}
                onPress={handleSubmit}
                disabled={loading}
              />
            </S.InnerContainer>
          </View>
        </S.Container>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
