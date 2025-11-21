import React, { useEffect, useState } from "react";
import { Alert, View } from "react-native";
import * as S from "./style";

import { Auth, getToken, saveToken } from "@hisius/services";
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
        saveToken(data.accessToken);

        navigation.navigate("Home");
        return;
      }

      if (password !== confirmPassword) {
        Alert.alert("Erro", "As senhas não coincidem");
        return;
      }

      const registerData = await AuthService.register({
        name,
        email,
        password,
        confirmPassword,
      });

      console.log("Usuário registrado:", registerData);

      const loginData = await AuthService.Login({ email, password });
      saveToken(loginData.accessToken);

      navigation.navigate("Home");

      console.log("Usuário logado automaticamente:", loginData);
    } catch (error) {
      Alert.alert("Erro", "Falha ao processar a ação.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <S.Container>
      <S.Title>HISIUS</S.Title>

      {/* Tabs */}
      <View>
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

        <S.InputContainer>
          {mode === "register" && (
            <CustomInput
              placeholder="Nome"
              value={name}
              icon={<Feather name="user" size={15} color={color.text} />}
              onChangeText={setName}
            />
          )}

          <CustomInput
            placeholder="E-mail"
            value={email}
            onChangeText={setEmail}
            icon={<Feather name="mail" size={15} color={color.text} />}
            keyboardType="email-address"
          />

          <CustomInput
            placeholder="Senha"
            value={password}
            icon={<Feather name="lock" size={15} color={color.text} />}
            onChangeText={setPassword}
            secureTextEntry
          />

          {mode === "register" && (
            <CustomInput
              placeholder="Confirmar senha"
              value={confirmPassword}
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
      </View>
    </S.Container>
  );
}
