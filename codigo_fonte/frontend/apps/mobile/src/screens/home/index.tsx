import React, { useEffect, useRef, useState } from "react";
import { TextInput, View } from "react-native";
import * as S from "./style";
import CustomButton from "@hisius/ui/components/Button";
import { Patient, Queue } from "@hisius/services/src";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "apps/mobile/navigation/types";
import Header from "../../components/header";

export default function Home() {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const inputsRef = useRef(
    Array.from({ length: code.length }, () => React.createRef<TextInput>())
  );
  const queueInstance = new Queue();
  const patientInstance = new Patient();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const handleProfile = () => {
    navigation.navigate("Profile");
  };

  useEffect(() => {
    const checkInfo = async () => {
      try {
        const info = await patientInstance.getQueueInfo();
        if (info) {
          navigation.navigate("Queue");
        }
      } catch (err) {}
    };
    checkInfo();
  }, []);

  const handleChange = (text: string, index: number) => {
    const newCode = [...code];
    newCode[index] = text;
    setCode(newCode);

    if (text && index < code.length - 1) {
      inputsRef.current[index + 1].current?.focus();
    }
    if (!text && index > 0) {
      inputsRef.current[index - 1].current?.focus();
    }
  };

  const handleJoin = async () => {
    try {
      let success = await queueInstance.joinQueue();

      if (success) {
        navigation.navigate("Queue");
      }
    } catch (err) {}
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

      {/*  
      <S.SeparatorContainer>
        <S.Line />
        <S.OrText>ou</S.OrText>
        <S.Line />
      </S.SeparatorContainer>

    
      <S.QrButton>
        <Ionicons name="qr-code-outline" size={18} color="#0E1D47" />
        <S.QrText>Escanear QR Code</S.QrText>
      </S.QrButton>
      */}

      <S.ButtonContainer>
        <CustomButton title="Entrar" onPress={handleJoin} />
      </S.ButtonContainer>
    </S.Container>
  );
}
