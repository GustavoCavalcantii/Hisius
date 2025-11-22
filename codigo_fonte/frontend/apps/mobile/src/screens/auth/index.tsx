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

export default function LoginRegister() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const [mode, setMode] = useState<"login" | "register">("login");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const AuthService = new Auth();

  const [loading, setLoading] = useState(false);

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
      setLoading(true);

      if (mode === "login") {
        const data = await AuthService.Login({ email, password });
        const { accessToken, ...rest } = data;
        saveToken(accessToken);
        saveUser(rest);

        navigation.navigate("Home");
        return;
      }

      if (password !== confirmPassword) {
        Alert.alert("Erro", "As senhas não coincidem");
        return;
      }

      await AuthService.register({
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
    } catch (error) {
      Alert.alert("Erro", "Falha ao processar a ação.");
    } finally {
      setLoading(false);
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

          {/* Tabs */}
          <View style={{ flex: 1, width: "100%" }}>
            <S.TabContainer>
              <S.TabButton
                active={mode === "login"}
                onPress={() => setMode("login")}
              >
                <S.TabText>Entrar</S.TabText>
                {mode === "login" && <S.ActiveBar />}
              </S.TabButton>

              <S.TabButton
                active={mode === "register"}
                onPress={() => setMode("register")}
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
                    onChangeText={setName}
                  />
                )}

                <CustomInput
                  placeholder="E-mail"
                  value={email}
                  inputId="email"
                  onChangeText={setEmail}
                  icon={<Feather name="mail" size={15} color={color.text} />}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />

                <CustomInput
                  placeholder="Senha"
                  value={password}
                  inputId="password"
                  icon={<Feather name="lock" size={15} color={color.text} />}
                  onChangeText={setPassword}
                  secureTextEntry
                />

                {mode === "register" && (
                  <CustomInput
                    placeholder="Confirmar senha"
                    value={confirmPassword}
                    inputId="confirmpassword"
                    icon={<Feather name="lock" size={15} color={color.text} />}
                    onChangeText={setConfirmPassword}
                    secureTextEntry
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
