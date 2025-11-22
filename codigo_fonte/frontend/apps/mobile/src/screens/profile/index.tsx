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
  const [gender, setGender] = useState<"" | "MASCULINO" | "FEMININO">("");
  const [birthDate, setBirthDate] = useState("");
  const [cnsNumber, setCnsNumber] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [motherName, setMotherName] = useState("");

  const [initialData, setInitialData] = useState<Partial<IPatient>>({});

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

  const handleChangePassword = () => {
    //navigation.navigate("ChangePassword");
  };

  const handleChangeEmail = () => {
    //navigation.navigate("ChangeEmail");
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
        setInitialData(updatedPatient);
      } else {
        alert("Erro ao atualizar perfil.");
      }
    } catch (err) {
      console.error(err);
      alert("Erro ao atualizar perfil.");
    }
  };

  const hasValidChanges = () => {
    const currentData = {
      name,
      cpf,
      gender,
      birthDate,
      cnsNumber,
      email,
      phone,
      motherName,
    };

    const hasChanges = Object.keys(currentData).some((key) => {
      const currentValue = currentData[key as keyof typeof currentData];
      const initialValue = initialData[key as keyof typeof initialData];
      return currentValue !== initialValue;
    });

    const hasEmptyFields = !name || !cpf || !birthDate || !email;

    return hasChanges && !hasEmptyFields;
  };

  useEffect(() => {
    patientInstance
      .getProfile()
      .then((data) => {
        if (!data) return;

        const patientData = {
          name: data.name ?? "",
          cpf: data.cpf ?? "",
          gender: data.gender as "MASCULINO" | "FEMININO",
          birthDate: data.birthDate ?? "",
          cnsNumber: data.cnsNumber ?? "",
          email: data.email ?? "",
          phone: data.phone ?? "",
          motherName: data.motherName ?? "",
        };

        setName(patientData.name);
        setCpf(patientData.cpf);
        setGender(patientData.gender || "");
        setBirthDate(patientData.birthDate);
        setCnsNumber(patientData.cnsNumber);
        setEmail(patientData.email);
        setPhone(patientData.phone);
        setMotherName(patientData.motherName);

        setInitialData(patientData);
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
          <Subtitle>Editar informações</Subtitle>
          <Title>Meu Perfil</Title>
        </TitleBox>
      </Header>

      <FormContainer>
        <Section>
          <SectionTitle>Informações Pessoais</SectionTitle>

          <InputGroup>
            <CustomInput
              placeholder="Nome completo"
              value={name}
              onChangeText={setName}
              icon={<Feather name="user" size={16} color={color.text} />}
            />
          </InputGroup>

          <InputRow>
            <InputColumn>
              <CustomInput
                placeholder="Data de Nascimento"
                value={birthDate}
                onChangeText={setBirthDate}
                icon={<Feather name="calendar" size={16} color={color.text} />}
              />
            </InputColumn>

            <InputColumn>
              <CustomPicker
                value={gender}
                onValueChange={(v) =>
                  setGender(v as "" | "MASCULINO" | "FEMININO")
                }
                options={[
                  { label: "Masculino", value: "MASCULINO" },
                  { label: "Feminino", value: "FEMININO" },
                ]}
                placeholder="Sexo"
                icon={<Feather name="user" size={16} color={color.text} />}
              />
            </InputColumn>
          </InputRow>

          <InputGroup>
            <CustomInput
              placeholder="Nome da Mãe"
              value={motherName}
              onChangeText={setMotherName}
              icon={<Feather name="users" size={16} color={color.text} />}
            />
          </InputGroup>
        </Section>

        <Section>
          <SectionTitle>Documentos</SectionTitle>

          <InputRow>
            <InputColumn>
              <CustomInput
                placeholder="CPF"
                value={cpf}
                onChangeText={setCpf}
                icon={
                  <Feather name="credit-card" size={16} color={color.text} />
                }
              />
            </InputColumn>

            <InputColumn>
              <CustomInput
                placeholder="CNS"
                value={cnsNumber}
                onChangeText={setCnsNumber}
                icon={<Feather name="clipboard" size={16} color={color.text} />}
              />
            </InputColumn>
          </InputRow>
        </Section>

        <Section>
          <SectionTitle>Contato</SectionTitle>

          <InputGroup>
            <CustomInput
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              disabled
              icon={<Feather name="mail" size={16} color={color.text} />}
            />
          </InputGroup>

          <InputGroup>
            <CustomInput
              placeholder="Telefone"
              value={phone}
              onChangeText={setPhone}
              icon={<Feather name="phone" size={16} color={color.text} />}
            />
          </InputGroup>
        </Section>

        <Section>
          <SectionTitle>Segurança</SectionTitle>

          <SecurityActions>
            <SecurityItem onPress={handleChangeEmail}>
              <SecurityIcon>
                <Feather name="mail" size={20} color={color.primary} />
              </SecurityIcon>
              <SecurityTextContainer>
                <SecurityTitle>Alterar Email</SecurityTitle>
                <SecurityDescription>
                  Modifique seu endereço de email
                </SecurityDescription>
              </SecurityTextContainer>
              <Feather name="chevron-right" size={20} color={color.text} />
            </SecurityItem>

            <SecurityItem onPress={handleChangePassword}>
              <SecurityIcon>
                <Feather name="lock" size={20} color={color.primary} />
              </SecurityIcon>
              <SecurityTextContainer>
                <SecurityTitle>Alterar Senha</SecurityTitle>
                <SecurityDescription>
                  Atualize sua senha de acesso
                </SecurityDescription>
              </SecurityTextContainer>
              <Feather name="chevron-right" size={20} color={color.text} />
            </SecurityItem>

            <SecurityItem onPress={handleLogout}>
              <SecurityIcon>
                <Feather name="log-out" size={20} color={color.error.error} />
              </SecurityIcon>
              <SecurityTextContainer>
                <SecurityTitle>Logout</SecurityTitle>
                <SecurityDescription>Saia da sua conta</SecurityDescription>
              </SecurityTextContainer>
              <Feather name="chevron-right" size={20} color={color.text} />
            </SecurityItem>
          </SecurityActions>
        </Section>

        <ActionsContainer>
          <ButtonContainer>
            <CustomButton
              title="Salvar Alterações"
              onPress={handleSave}
              disabled={!hasValidChanges()}
            />
          </ButtonContainer>
        </ActionsContainer>
      </FormContainer>
    </Container>
  );
}

const Container = styled(ScrollView)`
  flex: 1;
  background-color: ${color.background};
  padding: 24px;
`;

const Header = styled(View)`
  flex-direction: row;
  align-items: center;
  margin-bottom: 40px;
  padding-top: 16px;
`;

const BackButton = styled(TouchableOpacity)`
  margin-right: 20px;
  padding: 8px;
  background-color: ${color.front};
  border-radius: 12px;
`;

const TitleBox = styled(View)`
  flex: 1;
`;

const Title = styled(GlobalText)`
  font-size: 28px;
  font-weight: 700;
  color: ${color.text};
  letter-spacing: -0.5px;
`;

const Subtitle = styled(GlobalText)`
  font-size: 16px;
  font-weight: 400;
  color: ${color.text};
  margin-bottom: 4px;
`;

const FormContainer = styled(View)`
  gap: 32px;
`;

const Section = styled(View)`
  gap: 16px;
`;

const SectionTitle = styled(GlobalText)`
  font-size: 18px;
  font-weight: 600;
  color: ${color.text};
  margin-bottom: 8px;
  padding-left: 12px;
  border-left-width: 3px;
  border-left-color: ${color.primary};
`;

const InputGroup = styled(View)`
  width: 100%;
`;

const InputRow = styled(View)`
  flex-direction: row;
  gap: 16px;
`;

const InputColumn = styled(View)`
  flex: 1;
`;

const ActionsContainer = styled(View)`
  margin-top: 40px;
  gap: 24px;
`;

const SecurityActions = styled(View)`
  gap: 12px;
`;

const SecurityItem = styled(TouchableOpacity)`
  flex-direction: row;
  align-items: center;
  padding: 16px;
  background-color: ${color.front};
  border-radius: 12px;
  border: 1px solid ${color.gray};
`;

const SecurityIcon = styled(View)`
  margin-right: 12px;
`;

const SecurityTextContainer = styled(View)`
  flex: 1;
`;

const SecurityTitle = styled(GlobalText)`
  font-size: 16px;
  font-weight: 600;
  color: ${color.text};
  margin-bottom: 2px;
`;

const SecurityDescription = styled(GlobalText)`
  font-size: 14px;
  color: ${color.text};
`;

const LogoutButton = styled(TouchableOpacity)`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 20px;
  background-color: ${color.front};
  border-radius: 16px;
  border: 1px solid ${color.gray};
`;

const LogoutText = styled(GlobalText)`
  color: ${color.error.error};
  font-size: 16px;
  font-weight: 600;
`;

const ButtonContainer = styled(View)`
  padding-horizontal: 8px;
`;
