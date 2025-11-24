import React, { useState, useEffect } from "react";
import { View, Alert } from "react-native";
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
import { useFormErrors } from "../../hooks/FormErrors";
import { useNotification } from "../../components/notification/context";

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
  const [loading, setLoading] = useState(false);

  const { addNotification } = useNotification();

  const { errors, clearFieldError, clearAllErrors, handleApiErrors } =
    useFormErrors();

  const openEmailModal = () => setIsEmailModalVisible(true);
  const closeEmailModal = () => setIsEmailModalVisible(false);

  const formatDateFromISO = (isoDate: string): string => {
    if (!isoDate) return "";
    if (isoDate.includes("/")) return isoDate;

    const parts = isoDate.split("-");
    if (parts.length === 3) {
      return `${parts[2]}/${parts[1]}/${parts[0]}`;
    }
    return isoDate;
  };

  const formatDateToISO = (dateString: string): string => {
    const numbers = dateString.replace(/\D/g, "");

    if (numbers.length <= 2) {
      return numbers;
    } else if (numbers.length <= 4) {
      return `${numbers.slice(0, 2)}/${numbers.slice(2)}`;
    } else {
      return `${numbers.slice(0, 2)}/${numbers.slice(2, 4)}/${numbers.slice(4, 8)}`;
    }
  };

  const convertToISO = (dateString: string): string => {
    const parts = dateString.split("/");
    if (parts.length === 3 && parts[2].length === 4) {
      return `${parts[2]}-${parts[1]}-${parts[0]}`;
    }
    return dateString;
  };

  const handleEmailSubmit = async (newEmail: string) => {
    try {
      setLoading(true);
      await AuthService.changeEmail(newEmail);
      addNotification("Link de confirmação enviado!");
      closeEmailModal();
    } catch (err: any) {
      if (err.response?.data) {
        handleApiErrors(err.response.data);
      } else {
        addNotification(
          "Erro ao enviar código de verificação. Tente novamente.",
          "error"
        );
      }
    } finally {
      setLoading(false);
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
      addNotification(
        "Instruções para alteração de senha enviadas para seu e-mail."
      );
    } catch (err: any) {
      if (err.response?.data) {
        handleApiErrors(err.response.data);
      } else {
        addNotification("Falha ao solicitar alteração de senha.", "error");
      }
    }
  };

  const handleChangeEmail = () => {
    openEmailModal();
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      clearAllErrors();

      const isoBirthDate = convertToISO(birthDate);

      const updatedPatient: IPatient = {
        name,
        cpf,
        gender: gender as "MASCULINO" | "FEMININO",
        birthDate: isoBirthDate,
        cnsNumber,
        email,
        phone,
        motherName,
      };

      const success = await patientInstance.updateProfile(updatedPatient);
      if (success) {
        addNotification("Perfil atualizado com sucesso!");
        setInitialData({
          ...updatedPatient,
          birthDate: birthDate,
        });
      } else {
        addNotification("Erro ao atualizar perfil.", "error");
      }
    } catch (err: any) {
      if (err.response?.data) {
        handleApiErrors(err.response.data);
      } else {
        addNotification("Erro ao atualizar perfil.", "error");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleBirthDateChange = (text: string) => {
    const formattedDate = formatDateToISO(text);
    setBirthDate(formattedDate);
    if (errors.birthDate) clearFieldError("birthDate");
  };

  const handleNameChange = (text: string) => {
    setName(text);
    if (errors.name) clearFieldError("name");
  };

  const handleCpfChange = (text: string) => {
    setCpf(text);
    if (errors.cpf) clearFieldError("cpf");
  };

  const handleEmailChange = (text: string) => {
    setEmail(text);
    if (errors.email) clearFieldError("email");
  };

  const handlePhoneChange = (text: string) => {
    setPhone(text);
    if (errors.phone) clearFieldError("phone");
  };

  const handleCnsNumberChange = (text: string) => {
    setCnsNumber(text);
    if (errors.cnsNumber) clearFieldError("cnsNumber");
  };

  const handleMotherNameChange = (text: string) => {
    setMotherName(text);
    if (errors.motherName) clearFieldError("motherName");
  };

  const handleGenderChange = (value: "" | "MASCULINO" | "FEMININO") => {
    setGender(value);
    if (errors.gender) clearFieldError("gender");
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
          birthDate: formatDateFromISO(data.birthDate ?? ""),
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
      .catch(() => {
        navigation.goBack();
        addNotification("Erro ao buscar informações do perfil!", "error");
      });
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
              onChangeText={handleNameChange}
              icon={<Feather name="user" size={16} color={color.text} />}
              error={errors.name}
            />
          </S.InputGroup>

          <S.InputRow>
            <S.InputColumn>
              <CustomInput
                placeholder="Data de Nascimento"
                value={birthDate}
                onChangeText={handleBirthDateChange}
                icon={<Feather name="calendar" size={16} color={color.text} />}
                error={errors.birthDate}
                keyboardType="numeric"
                maxLength={10}
              />
            </S.InputColumn>

            <S.InputColumn>
              <CustomPicker
                value={gender}
                onValueChange={handleGenderChange}
                options={[
                  { label: "Masculino", value: "MASCULINO" },
                  { label: "Feminino", value: "FEMININO" },
                ]}
                placeholder="Sexo"
                icon={<Feather name="user" size={16} color={color.text} />}
                error={errors.gender}
              />
            </S.InputColumn>
          </S.InputRow>

          <S.InputGroup>
            <CustomInput
              placeholder="Nome da Mãe"
              value={motherName}
              onChangeText={handleMotherNameChange}
              icon={<Feather name="users" size={16} color={color.text} />}
              error={errors.motherName}
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
                onChangeText={handleCpfChange}
                icon={
                  <Feather name="credit-card" size={16} color={color.text} />
                }
                error={errors.cpf}
              />
            </S.InputColumn>

            <S.InputColumn>
              <CustomInput
                placeholder="CNS"
                value={cnsNumber}
                onChangeText={handleCnsNumberChange}
                icon={<Feather name="clipboard" size={16} color={color.text} />}
                error={errors.cnsNumber}
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
              onChangeText={handleEmailChange}
              disabled
              icon={<Feather name="mail" size={16} color={color.text} />}
              error={errors.email}
            />
          </S.InputGroup>

          <S.InputGroup>
            <CustomInput
              placeholder="Telefone"
              value={phone}
              onChangeText={handlePhoneChange}
              icon={<Feather name="phone" size={16} color={color.text} />}
              error={errors.phone}
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
              disabled={!hasValidChanges() || loading}
            />
          </View>
        </S.ActionsContainer>
      </S.FormContainer>

      <EmailChangeModal
        visible={isEmailModalVisible}
        onClose={closeEmailModal}
        onEmailSubmit={handleEmailSubmit}
        currentEmail={email}
      />
    </S.Container>
  );
}
