import React, { useState } from "react";
import { Alert, View } from "react-native";
import * as S from "./style";

import { Auth } from "@hisius/services";
import CustomInput from "@hisius/ui/components/CustomInput";
import CustomButton from "@hisius/ui/components/Button";
import {
  HiOutlineEnvelope,
  HiOutlineLockClosed,
  HiOutlineUser,
} from "react-icons/hi2";

export default function LoginRegister() {
  const [mode, setMode] = useState<"login" | "register">("login");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const AuthService = new Auth();

  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      setLoading(true);

      if (mode === "login") {
        const data = await AuthService.Login({ email, password });
        console.log("Token recebido:", data.accessToken);
      } else {
        if (password !== confirmPassword) {
          Alert.alert("Erro", "As senhas não coincidem");
          return;
        }

        const data = await AuthService.register({
          name,
          email,
          password,
          confirmPassword,
        });

        console.log("Usuário registrado:", data);
      }
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
              icon={<HiOutlineUser />}
              onChangeText={setName}
            />
          )}

          <CustomInput
            placeholder="E-mail"
            value={email}
            onChangeText={setEmail}
            icon={<HiOutlineEnvelope />}
            keyboardType="email-address"
          />

          <CustomInput
            placeholder="Senha"
            value={password}
            icon={<HiOutlineLockClosed />}
            onChangeText={setPassword}
            secureTextEntry
          />

          {mode === "register" && (
            <CustomInput
              placeholder="Confirmar senha"
              value={confirmPassword}
              icon={<HiOutlineLockClosed />}
              onChangeText={setConfirmPassword}
              secureTextEntry
            />
          )}
        </S.InputContainer>

        <CustomButton
          title={mode === "login" ? "Entrar" : "Registrar"}
          onPress={handleSubmit}
        />
      </View>
    </S.Container>
  );
}
