import React, { useEffect, useRef, useState } from "react";
import { Alert, TextInput } from "react-native";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import * as S from "./style";
import CustomButton from "@hisius/ui/components/Button";
import { Patient, Queue } from "@hisius/services/src";
import Header from "../../components/header";
import { RootStackParamList } from "apps/mobile/navigation/types";
import Header from "../../components/header";
import CadastroPopup from "../../popups/checkinData";

export default function HomeScreen() {
  const [code, setCode] = useState(Array(CODE_LENGTH).fill(""));
  const [loading, setLoading] = useState(false);
  const inputsRef = useRef(
    Array(CODE_LENGTH)
      .fill(0)
      .map(() => React.createRef<TextInput>())
  );

  const [showCadastroPopup, setShowCadastroPopup] = useState(false);

  const queueInstance = new Queue();
  const patientInstance = new Patient();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const handleProfile = () => {
    navigation.navigate("Profile");
  };

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
        ...Array(CODE_LENGTH - digits.length).fill(""),
      ];
      setCode(filledCode);
      inputsRef.current[
        Math.min(digits.length, CODE_LENGTH - 1)
      ].current?.focus();
      return;
    }

    newCode[index] = num;
    setCode(newCode);

    if (num && index < CODE_LENGTH - 1)
      inputsRef.current[index + 1].current?.focus();
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === "Backspace" && !code[index] && index > 0)
      inputsRef.current[index - 1].current?.focus();
  };

  const handleJoin = async () => {
    if (code.some((d) => !d)) {
      Alert.alert("Código Incompleto", "Preencha todos os 6 dígitos.");
      return;
    }

    setLoading(true);
    try {
      let success = await queueInstance.joinQueue();

      if (success) {
        navigation.navigate("Queue");
      }
    } catch (err: any) {
      const message = err?.response?.data?.message;

      if (message === "Perfil de paciente não encontrado para este usuário.") {
        setShowCadastroPopup(true);
        return;
      }
    }
  };

  const handleCadastroSubmit = async (data: any) => {
    try {
      await patientInstance.updateProfile(data);

      setShowCadastroPopup(false);

      handleJoin();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <S.Container>
      <Header softwareName="Hisius" onProfilePress={handleProfile} />
      <View>
        <S.Title>ESTÁ NO HOSPITAL?</S.Title>
        <S.Subtitle>Coloque o código</S.Subtitle>
      </View>

      <S.CodeContainer>
        {code.map((value, index) => (
          <S.CodeInput
            key={index}
            ref={inputsRef.current[index]}
            placeholder="0"
            keyboardType="numeric"
            maxLength={1}
            value={value}
            onChangeText={(text) => handleChange(text, index)}
          />
        ))}
      </S.CodeContainer>

      <S.ButtonContainer>
        <CustomButton title="Entrar" onPress={handleJoin} />
      </S.ButtonContainer>

      <CadastroPopup
        visible={showCadastroPopup}
        onSubmit={handleCadastroSubmit}
        color={{ text: "#000" }}
      />
    </S.Container>
  );
}
