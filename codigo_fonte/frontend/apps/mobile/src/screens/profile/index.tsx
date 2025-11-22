import React, { useState, useEffect } from "react";
import { View } from "react-native";
import CustomInput from "@hisius/ui/components/CustomInput";
import CustomButton from "@hisius/ui/components/Button";
import { Auth, getUser, logout, Patient } from "@hisius/services/src";
import { color } from "@hisius/ui/theme/colors";
import { Feather } from "@expo/vector-icons";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { IPatient } from "packages/interfaces/src";
import CustomPicker from "../../components/customPicker";
import { RootStackParamList } from "apps/mobile/navigation/types";
import * as S from "./style";
import EmailChangeModal from "../../popups/changeEmail";

export function Profile() {
  const patientInstance = new Patient();
  const AuthService = new Auth();
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
  const [isEmailModalVisible, setIsEmailModalVisible] = useState(false);

  const openEmailModal = () => setIsEmailModalVisible(true);
  const closeEmailModal = () => setIsEmailModalVisible(false);

  const handleEmailSubmit = async (newEmail: string) => {
    try {
      console.log(newEmail);
      await AuthService.changeEmail(newEmail);

      closeEmailModal();
    } catch (err) {
      console.error("Erro ao alterar email:", err);
      alert("Erro ao enviar código de verificação. Tente novamente.");
    }
  };

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

  const handleChangePassword = async () => {
    try {
      const user = JSON.parse(await getUser());
      await AuthService.changePass(user.email);
    } catch (err) {}
  };

  const handleChangeEmail = () => {
    openEmailModal();
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
    <S.Container>
      <S.Header>
        <S.BackButton onPress={handleBack}>
          <Feather name="arrow-left" size={24} color={color.text} />
        </S.BackButton>

        <S.TitleBox>
          <S.Subtitle>Editar informações</S.Subtitle>
          <S.Title>Meu Perfil</S.Title>
        </S.TitleBox>
      </S.Header>

      <S.FormContainer>
        <S.Section>
          <S.SectionTitle>Informações Pessoais</S.SectionTitle>

          <S.InputGroup>
            <CustomInput
              placeholder="Nome completo"
              value={name}
              onChangeText={setName}
              icon={<Feather name="user" size={16} color={color.text} />}
            />
          </S.InputGroup>

          <S.InputRow>
            <S.InputColumn>
              <CustomInput
                placeholder="Data de Nascimento"
                value={birthDate}
                onChangeText={setBirthDate}
                icon={<Feather name="calendar" size={16} color={color.text} />}
              />
            </S.InputColumn>

            <S.InputColumn>
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
            </S.InputColumn>
          </S.InputRow>

          <S.InputGroup>
            <CustomInput
              placeholder="Nome da Mãe"
              value={motherName}
              onChangeText={setMotherName}
              icon={<Feather name="users" size={16} color={color.text} />}
            />
          </S.InputGroup>
        </S.Section>

        <S.Section>
          <S.SectionTitle>Documentos</S.SectionTitle>

          <S.InputRow>
            <S.InputColumn>
              <CustomInput
                placeholder="CPF"
                value={cpf}
                onChangeText={setCpf}
                icon={
                  <Feather name="credit-card" size={16} color={color.text} />
                }
              />
            </S.InputColumn>

            <S.InputColumn>
              <CustomInput
                placeholder="CNS"
                value={cnsNumber}
                onChangeText={setCnsNumber}
                icon={<Feather name="clipboard" size={16} color={color.text} />}
              />
            </S.InputColumn>
          </S.InputRow>
        </S.Section>

        <S.Section>
          <S.SectionTitle>Contato</S.SectionTitle>

          <S.InputGroup>
            <CustomInput
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              disabled
              icon={<Feather name="mail" size={16} color={color.text} />}
            />
          </S.InputGroup>

          <S.InputGroup>
            <CustomInput
              placeholder="Telefone"
              value={phone}
              onChangeText={setPhone}
              icon={<Feather name="phone" size={16} color={color.text} />}
            />
          </S.InputGroup>
        </S.Section>

        <S.Section>
          <S.SectionTitle>Segurança</S.SectionTitle>

          <S.SecurityActions>
            <S.SecurityItem onPress={handleChangeEmail}>
              <S.SecurityIcon>
                <Feather name="mail" size={20} color={color.primary} />
              </S.SecurityIcon>
              <S.SecurityTextContainer>
                <S.SecurityTitle>Alterar Email</S.SecurityTitle>
                <S.SecurityDescription>
                  Modifique seu endereço de email
                </S.SecurityDescription>
              </S.SecurityTextContainer>
              <Feather name="chevron-right" size={20} color={color.text} />
            </S.SecurityItem>

            <S.SecurityItem onPress={handleChangePassword}>
              <S.SecurityIcon>
                <Feather name="lock" size={20} color={color.primary} />
              </S.SecurityIcon>
              <S.SecurityTextContainer>
                <S.SecurityTitle>Alterar Senha</S.SecurityTitle>
                <S.SecurityDescription>
                  Atualize sua senha de acesso
                </S.SecurityDescription>
              </S.SecurityTextContainer>
              <Feather name="chevron-right" size={20} color={color.text} />
            </S.SecurityItem>

            <S.SecurityItem onPress={handleLogout}>
              <S.SecurityIcon>
                <Feather name="log-out" size={20} color={color.error.error} />
              </S.SecurityIcon>
              <S.SecurityTextContainer>
                <S.SecurityTitle>Logout</S.SecurityTitle>
                <S.SecurityDescription>Saia da sua conta</S.SecurityDescription>
              </S.SecurityTextContainer>
              <Feather name="chevron-right" size={20} color={color.text} />
            </S.SecurityItem>
          </S.SecurityActions>
        </S.Section>

        <S.ActionsContainer>
          <View>
            <CustomButton
              title="Salvar Alterações"
              onPress={handleSave}
              disabled={!hasValidChanges()}
            />
          </View>
        </S.ActionsContainer>
      </S.FormContainer>
      {/* Modal de Alteração de Email */}
      <EmailChangeModal
        visible={isEmailModalVisible}
        onClose={closeEmailModal}
        onEmailSubmit={handleEmailSubmit}
        currentEmail={email}
      />
    </S.Container>
  );
}
