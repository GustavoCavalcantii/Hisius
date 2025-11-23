import React, { useEffect, useRef, useState } from "react";
import { Alert, TextInput } from "react-native";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import * as S from "./style";
import CustomButton from "@hisius/ui/components/Button";
import { Patient, Queue } from "@hisius/services/src";
import Header from "../../components/header";
import { RootStackParamList } from "apps/mobile/navigation/types";
import CadastroPopup from "../../popups/checkinData";

const CODE_LENGTH = 6;

export default function HomeScreen() {
  const [code, setCode] = useState(Array(CODE_LENGTH).fill(""));
  const [loading, setLoading] = useState(false);
  const [showCadastroPopup, setShowCadastroPopup] = useState(false);

  const patient = useRef(new Patient()).current;
  const queue = useRef(new Queue()).current;

  const inputsRef = useRef(
    Array(CODE_LENGTH)
      .fill(0)
      .map(() => React.createRef<TextInput>())
  );

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  useEffect(() => {
    patient.getQueueInfo().then((info) => {
      if (info) navigation.navigate("Queue");
    });
  }, []);

  const handleCodeChange = (text: string, index: number) => {
    const num = text.replace(/[^0-9]/g, "");
    const newCode = [...code];

    if (num.length > 1) {
      const digits = num.split("").slice(0, CODE_LENGTH);
      const filledCode = [
        ...digits,
        ...Array(CODE_LENGTH - digits.length).fill("")
      ];
      setCode(filledCode);
      inputsRef.current[Math.min(digits.length, CODE_LENGTH - 1)].current?.focus();
      return;
    }

    newCode[index] = num;
    setCode(newCode);

    if (num && index < CODE_LENGTH - 1) {
      inputsRef.current[index + 1].current?.focus();
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === "Backspace" && !code[index] && index > 0) {
      inputsRef.current[index - 1].current?.focus();
    }
  };

  const handleJoin = async () => {
    if (code.some((d) => !d)) {
      Alert.alert("Código Incompleto", "Preencha todos os 6 dígitos.");
      return;
    }

    setLoading(true);
    try {
      const success = await queue.joinQueue(code.join(""));

      if (success) {
        navigation.navigate("Queue");
      }
    } catch (err: any) {
      console.log("catch funcionando");
      const message = err?.response?.data?.message;

      if (message === "Perfil de paciente não encontrado para este usuário.") {
        setShowCadastroPopup(true);
        return;
      }

      console.log(err);
      Alert.alert("Erro", "Não foi possível entrar na fila.");
    } finally {
      setLoading(false);
    }
  };

  const handleCadastroSubmit = async (data: any) => {
    try {
      await patient.updateProfile(data);

      setShowCadastroPopup(false);

      handleJoin();
    } catch (err) {
      console.log(err);
      Alert.alert("Erro", "Não foi possível atualizar seus dados.");
    }
  };

  return (
    <S.Container>
      <Header
        softwareName="Hisius"
        onProfilePress={() => navigation.navigate("Profile")}
      />

      <S.ContentContainer>
        <S.HeaderContainer>
          <S.Title>ESTÁ NO HOSPITAL?</S.Title>
          <S.Subtitle>Digite o código de acesso</S.Subtitle>
        </S.HeaderContainer>

        <S.CodeContainer>
          {code.map((value, i) => (
            <S.CodeInput
              key={i}
              ref={inputsRef.current[i]}
              placeholder="0"
              keyboardType="number-pad"
              maxLength={1}
              value={value}
              onChangeText={(t) => handleCodeChange(t, i)}
              onKeyPress={(e) => handleKeyPress(e, i)}
              selectTextOnFocus={true}
            />
          ))}
        </S.CodeContainer>

        <S.ButtonContainer>
          <CustomButton
            title={loading ? "Entrando..." : "Entrar na Fila"}
            onPress={handleJoin}
            disabled={loading || code.some((d) => !d)}
          />
        </S.ButtonContainer>
      </S.ContentContainer>

      <CadastroPopup
        visible={showCadastroPopup}
        onSubmit={handleCadastroSubmit}
        color={{ text: "#000" }}
      />
    </S.Container>
  );
}
