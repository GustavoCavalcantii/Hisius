import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import styled from "styled-components/native";
import CustomInput from "@hisius/ui/components/CustomInput";
import {
  HiOutlineArrowLeft,
  HiOutlineEnvelope,
  HiOutlineCalendarDays,
  HiOutlineIdentification,
  HiOutlineUser,
  HiOutlinePhone,
  HiOutlineUsers,
  HiOutlineClipboard,
} from "react-icons/hi2";
import CustomButton from "@hisius/ui/components/Button";
import { Patient } from "@hisius/services/src";

export function Profile() {
  const patientInstance = new Patient();

  const [name, setName] = useState("");
  const [cpf, setCpf] = useState("");
  const [gender, setGender] = useState<"MASCULINO" | "FEMININO" | "">("");
  const [birthDate, setBirthDate] = useState("");
  const [cnsNumber, setCnsNumber] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [motherName, setMotherName] = useState("");

  useEffect(() => {
    patientInstance
      .getProfile()
      .then((data) => {
        if (!data) return;

        setName(data.name);
        setCpf(data.cpf);
        setGender(data.gender);
        setBirthDate(data.birthDate);
        setCnsNumber(data.cnsNumber);
        setEmail(data.email);
        setPhone(data.phone);
        setMotherName(data.motherName);
      })
      .catch(console.error);
  }, []);

  return (
    <Container>
      <Header>
        <BackButton>
          <HiOutlineArrowLeft />
        </BackButton>

        <TitleBox>
          <Subtitle>EDITE</Subtitle>
          <Title>SEUS DADOS</Title>
        </TitleBox>
      </Header>

      {/* NOME */}

      <CustomInput
        placeholder="Nome completo"
        value={name}
        onChangeText={setName}
        icon={<HiOutlineUser />}
      />

      {/* EMAIL */}

      <CustomInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        icon={<HiOutlineEnvelope />}
      />

      {/* DATA DE NASCIMENTO */}

      <CustomInput
        placeholder="Data de Nascimento"
        value={birthDate}
        onChangeText={setBirthDate}
        icon={<HiOutlineCalendarDays />}
      />

      {/* CPF */}

      <CustomInput
        placeholder="CPF"
        value={cpf}
        onChangeText={setCpf}
        icon={<HiOutlineIdentification />}
      />

      {/* GÊNERO */}

      <CustomInput
        placeholder="Sexo"
        value={gender}
        onChangeText={(t) => setGender(t as any)}
        icon={<HiOutlineUser />}
      />

      {/* TELEFONE */}

      <CustomInput
        placeholder="Telefone"
        value={phone}
        onChangeText={setPhone}
        icon={<HiOutlinePhone />}
      />

      {/* NOME DA MÃE */}

      <CustomInput
        placeholder="Nome da Mãe"
        value={motherName}
        onChangeText={setMotherName}
        icon={<HiOutlineUsers />}
      />

      {/* CNS */}

      <CustomInput
        placeholder="CNS"
        value={cnsNumber}
        onChangeText={setCnsNumber}
        icon={<HiOutlineClipboard />}
      />

      <ButtonContainer>
        <CustomButton title="Salvar" onPress={() => {}} />
      </ButtonContainer>
    </Container>
  );
}

const ButtonContainer = styled(View)`
  margin-top: 70px;
`;

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
  font-family: "Montserrat";
  font-size: 22px;
  font-weight: 700;
  color: #000;
`;

const Subtitle = styled(Text)`
  font-family: "Montserrat";
  font-size: 22px;
  font-weight: 300;
  color: #000;
`;
