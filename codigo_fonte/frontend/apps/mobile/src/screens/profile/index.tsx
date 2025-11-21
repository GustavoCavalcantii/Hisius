import React, { useState, useEffect } from "react";
import { View, TouchableOpacity, ScrollView } from "react-native";
import styled from "styled-components/native";
import CustomInput from "@hisius/ui/components/CustomInput";
import CustomButton from "@hisius/ui/components/Button";
import { logout, Patient } from "@hisius/services/src";
import { GlobalText } from "../../components/globalText";
import { color } from "@hisius/ui/theme/colors";
import { Feather } from "@expo/vector-icons";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { IPatient } from "packages/interfaces/src";
import CustomPicker from "../../components/customPicker";
import { RootStackParamList } from "apps/mobile/navigation/types";

export function Profile() {
  const patientInstance = new Patient();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const [name, setName] = useState("");
  const [cpf, setCpf] = useState("");
  const [gender, setGender] = useState<"MASCULINO" | "FEMININO" | "">("");
  const [birthDate, setBirthDate] = useState("");
  const [cnsNumber, setCnsNumber] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [motherName, setMotherName] = useState("");

  const handleBack = () => {
    navigation.goBack();
  };

  const handleLogout = async () => {
    await logout();

    navigation.reset({
      index: 0,
      routes: [{ name: "Login" }],
    });
  };

  const handleSave = async () => {
    const updatedPatient: IPatient = {
      name,
      cpf,
      gender: gender as "MASCULINO" | "FEMININO",
      birthDate,
      cnsNumber,
      email,
      phone,
      motherName,
    };

    try {
      const success = await patientInstance.updateProfile(updatedPatient);
      if (success) {
        alert("Perfil atualizado com sucesso!");
      } else {
        alert("Erro ao atualizar perfil.");
      }
    } catch (err) {
      console.error(err);
      alert("Erro ao atualizar perfil.");
    }
  };

  useEffect(() => {
    patientInstance
      .getProfile()
      .then((data) => {
        if (!data) return;

        setName(data.name ?? "");
        setCpf(data.cpf ?? "");
        setGender(data.gender ?? "");
        setBirthDate(data.birthDate ?? "");
        setCnsNumber(data.cnsNumber ?? "");
        setEmail(data.email ?? "");
        setPhone(data.phone ?? "");
        setMotherName(data.motherName ?? "");
      })
      .catch(console.error);
  }, []);

  return (
    <Container>
      <Header>
        <BackButton onPress={handleBack}>
          <Feather name="arrow-left" size={24} color={color.text} />
        </BackButton>

        <TitleBox>
          <Subtitle>EDITE</Subtitle>
          <Title>SEUS DADOS</Title>
        </TitleBox>
      </Header>

      <CustomInput
        placeholder="Nome completo"
        value={name ?? ""}
        onChangeText={setName}
        icon={<Feather name="user" size={15} color={color.text} />}
      />

      <CustomInput
        placeholder="Email"
        value={email ?? ""}
        onChangeText={setEmail}
        icon={<Feather name="mail" size={15} color={color.text} />}
      />

      <CustomInput
        placeholder="Data de Nascimento"
        value={birthDate ?? ""}
        onChangeText={setBirthDate}
        icon={<Feather name="calendar" size={15} color={color.text} />}
      />

      <CustomInput
        placeholder="CPF"
        value={cpf ?? ""}
        onChangeText={setCpf}
        icon={<Feather name="credit-card" size={15} color={color.text} />}
      />

      <CustomPicker
        value={gender}
        onValueChange={(v) => setGender(v as "" | "MASCULINO" | "FEMININO")}
        options={[
          { label: "Masculino", value: "MASCULINO" },
          { label: "Feminino", value: "FEMININO" },
        ]}
        placeholder="Sexo"
        icon={<Feather name="user" size={15} color={color.text} />}
      />

      <CustomInput
        placeholder="Telefone"
        value={phone ?? ""}
        onChangeText={setPhone}
        icon={<Feather name="phone" size={15} color={color.text} />}
      />

      <CustomInput
        placeholder="Nome da Mãe"
        value={motherName ?? ""}
        onChangeText={setMotherName}
        icon={<Feather name="users" size={15} color={color.text} />}
      />

      <CustomInput
        placeholder="CNS"
        value={cnsNumber ?? ""}
        onChangeText={setCnsNumber}
        icon={<Feather name="clipboard" size={15} color={color.text} />}
      />

      <TouchableOpacity onPress={handleLogout}>
        <LogoutText>Sair da conta</LogoutText>
      </TouchableOpacity>

      <ButtonContainer>
        <CustomButton title="Salvar" onPress={handleSave} />
      </ButtonContainer>
    </Container>
  );
}

const ButtonContainer = styled(View)`
  margin-top: 70px;
`;

const LogoutText = styled(GlobalText)`
  color: ${color.error.error};
  font-size: 16px;
  margin-top: 20px;
  text-align: center;
`;

const Container = styled(ScrollView)`
  flex: 1;
  background-color: ${color.background};
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

const Title = styled(GlobalText)`
  font-size: 22px;
  font-weight: 700;
`;

const Subtitle = styled(GlobalText)`
  font-size: 22px;
  font-weight: 300;
`;

const PickerContainer = styled(View)`
  border-width: 1px;
  border-color: ${color.gray};
  border-radius: 6px;
  margin-bottom: 15px;
  padding: 5px;
  background-color: ${color.card};
`;
