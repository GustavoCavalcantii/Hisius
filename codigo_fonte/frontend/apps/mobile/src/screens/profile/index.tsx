import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import styled from "styled-components/native";
import CustomInput from "./CustomInput";
import { Ionicons } from "@expo/vector-icons";
import { getProfile as profileService } from "../../services/profile";

export function Profile() {
  const [email, setEmail] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [cpf, setCpf] = useState("");
  const [gender, setGender] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    profileService()
      .then((data) => {
        setEmail(data?.email ?? "");
        setBirthdate(data?.birthdate ?? "");
        setCpf(data?.cpf ?? "");
        setGender(data?.gender ?? "");
        setPhone(data?.phone ?? "");
      })
      .catch(console.error);
  }, []);

  return (
    <Container>
      <Header>
        <BackButton>
          <Ionicons name="arrow-back" size={24} color="black" />
        </BackButton>
        <TitleBox>
          <Subtitle>EDITE</Subtitle>
          <Title>SEUS DADOS</Title>
        </TitleBox>
      </Header>

      <InputWrapper>
        <CustomInput placeholder="Email" value={email} onChangeText={setEmail} icon="mail-outline" />
      </InputWrapper>
      <InputWrapper>
        <CustomInput placeholder="Data de Nascimento" value={birthdate} onChangeText={setBirthdate} icon="calendar-outline" />
      </InputWrapper>
      <InputWrapper>
        <CustomInput placeholder="CPF" value={cpf} onChangeText={setCpf} icon="person-outline" />
      </InputWrapper>
      <InputWrapper>
        <CustomInput placeholder="Sexo" value={gender} onChangeText={setGender} icon="male-female-outline" />
      </InputWrapper>
      <InputWrapper>
        <CustomInput placeholder="Telefone" value={phone} onChangeText={setPhone} icon="call-outline" />
      </InputWrapper>

      <SaveButton>
        <SaveText>Salvar</SaveText>
      </SaveButton>
    </Container>
  );
}



const Container = styled(ScrollView)`
  flex: 1;
  background-color: #f3f3f3;
  padding: 24px;
`;

const Header = styled(View)`
  flex-direction: row;
  align-items: center;
  margin-bottom: 40px;
`;

const BackButton = styled(TouchableOpacity)`
  margin-right: 12px;
`;

const TitleBox = styled(View)`
  margin-top: 10px;
`;

const Title = styled(Text)`
  font-size: 22px;
  font-weight: 700;
  color: #000;
`;

const Subtitle = styled(Text)`
  font-size: 22px;
  font-weight: 300;
  color: #000;
`;

const InputWrapper = styled(View)`
  width: 100%;
  margin-top: 16px;
`;

const SaveButton = styled(TouchableOpacity)`
  width: 60%;
  height: 46px;
  background-color: #2f4a8a;
  align-self: center;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  margin-top: 40px;
`;

const SaveText = styled(Text)`
  color: white;
  font-size: 16px;
  font-weight: 600;
`;