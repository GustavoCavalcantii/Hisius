import React, { useState } from "react";
import { ActivityIndicator, Alert, View } from "react-native";
import Input from "@hisius/ui/components/CustomInput";
import * as S from "./style";

import { Login as AuthServiceLogin } from "../../../../../packages/services/src/Auth";
import { Register as AuthServiceRegister } from "../../../../../packages/services/src/Auth";
import CustomInput from "@hisius/ui/components/CustomInput";
import CustomButton from "packages/ui/components/Button";

export default function LoginRegister() {
  const [mode, setMode] = useState<"login" | "register">("login");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");

  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      setLoading(true);

      if (mode === "login") {
        const data = await AuthServiceLogin({ email, password });
        console.log("Token recebido:", data.token);
      } else {
        if (password !== confirmPassword) {
          Alert.alert("Erro", "As senhas não coincidem");
          return;
        }

        const data = await AuthServiceRegister({
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
            <Input placeholder="Nome" value={name} onChangeText={setName} />
          )}

          <CustomInput
            placeholder="E-mail"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />

          <CustomInput
            placeholder="Senha"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          {mode === "register" && (
            <CustomInput
              placeholder="Confirmar senha"
              value={confirmPassword}
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
