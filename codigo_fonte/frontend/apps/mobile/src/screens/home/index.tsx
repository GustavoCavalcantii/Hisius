import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import * as S from "./style";
import CustomButton from "@hisius/ui/components/Button";

export default function Home() {
  const [code, setCode] = useState(["", "", "", "", "", ""]);

  const handleChange = (text: string, index: number) => {
    const newCode = [...code];
    newCode[index] = text;
    setCode(newCode);
  };

  return (
    <S.Container>
      <S.Title>ESTÁ NO HOSPITAL?</S.Title>
      <S.Subtitle>Coloque o código</S.Subtitle>

      <S.CodeContainer>
        {code.map((value, index) => (
          <S.CodeInput
            key={index}
            keyboardType="numeric"
            maxLength={1}
            value={value}
            onChangeText={(text) => handleChange(text, index)}
          />
        ))}
      </S.CodeContainer>

      <S.SeparatorContainer>
        <S.Line />
        <S.OrText>ou</S.OrText>
        <S.Line />
      </S.SeparatorContainer>

      <S.QrButton>
        <Ionicons name="qr-code-outline" size={18} color="#0E1D47" />
        <S.QrText>Escanear QR Code</S.QrText>
      </S.QrButton>

      <S.ButtonContainer>
        <CustomButton title="Entrar" onPress={() => {}} />
      </S.ButtonContainer>
    </S.Container>
  );
}
