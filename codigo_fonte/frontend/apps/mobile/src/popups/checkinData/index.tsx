import { useState } from "react";
import { Modal, TouchableWithoutFeedback } from "react-native";
import CustomInput from "@hisius/ui/components/CustomInput";
import CustomButton from "@hisius/ui/components/Button";
import { Feather } from "@expo/vector-icons";
import { IPatient } from "../../../../../packages/interfaces/src";
import * as S from "./style";
import CustomPicker from "../../components/customPicker";
import { useFormErrors } from "../../hooks/FormErrors";

type Props = {
  visible: boolean;
  color?: { text: string };
  onSubmit?: (
    data: Pick<
      IPatient,
      "birthDate" | "cpf" | "gender" | "phone" | "motherName" | "cnsNumber"
    >
  ) => void;
  errors?: Record<string, string>;
};

type GenderType = "" | "MASCULINO" | "FEMININO";

export default function CadastroPopup({
  visible,
  onSubmit,
  color,
  errors,
}: Props) {
  const [birthDate, setBirthDate] = useState("");
  const [cpf, setCpf] = useState("");
  const [gender, setGender] = useState<GenderType>("");
  const [phone, setPhone] = useState("");
  const [icePhone, setIcePhone] = useState("");
  const [motherName, setMotherName] = useState("");
  const [cnsNumber, setCnsNumber] = useState("");

  const { clearFieldError } = useFormErrors();

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

  const handleDateChange = (text: string) => {
    const formattedDate = formatDateToISO(text);
    setBirthDate(formattedDate);
    if (errors?.birthDate) clearFieldError("birthDate");
  };

  const handleCpfChange = (text: string) => {
    setCpf(text);
    if (errors?.cpf) clearFieldError("cpf");
  };

  const handleGenderChange = (value: GenderType) => {
    setGender(value);
    if (errors?.gender) clearFieldError("gender");
  };

  const handlePhoneChange = (text: string) => {
    setPhone(text);
    if (errors?.phone) clearFieldError("phone");
  };

  const handleIcePhoneChange = (text: string) => {
    setIcePhone(text);
    if (errors?.icePhone) clearFieldError("icePhone");
  };

  const handleMotherNameChange = (text: string) => {
    setMotherName(text);
    if (errors?.motherName) clearFieldError("motherName");
  };

  const handleCnsNumberChange = (text: string) => {
    setCnsNumber(text);
    if (errors?.cnsNumber) clearFieldError("cnsNumber");
  };

  const handleSubmit = () => {
    const isoDate = convertToISO(birthDate);

    const submitData = {
      birthDate: isoDate,
      cpf,
      gender: gender as "MASCULINO" | "FEMININO",
      phone,
      icePhone,
      motherName,
      cnsNumber,
    };

    if (gender) {
      onSubmit?.(submitData);
    }
  };

  const validateDate = (dateString: string): boolean => {
    if (dateString.length !== 10) return false;

    const parts = dateString.split("/");
    if (parts.length !== 3) return false;

    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10);
    const year = parseInt(parts[2], 10);

    if (month < 1 || month > 12) return false;
    if (day < 1 || day > 31) return false;
    if (year < 1900 || year > new Date().getFullYear()) return false;

    return true;
  };

  const isFormValid =
    validateDate(birthDate) &&
    cpf &&
    gender &&
    phone &&
    motherName &&
    cnsNumber;

  return (
    <Modal visible={visible} transparent animationType="fade">
      <TouchableWithoutFeedback>
        <S.Overlay>
          <S.PopupContainer>
            <S.Title>
              Termine de cadastrar seus dados para seguir para a fila
            </S.Title>

            <S.InputsContainer>
              <CustomInput
                placeholder="Data de nascimento"
                value={birthDate}
                onChangeText={handleDateChange}
                icon={<Feather name="calendar" size={15} color={color?.text} />}
                keyboardType="numeric"
                maxLength={10}
                error={errors?.birthDate}
              />

              <CustomInput
                placeholder="CPF"
                value={cpf}
                onChangeText={handleCpfChange}
                icon={
                  <Feather name="credit-card" size={15} color={color?.text} />
                }
                error={errors?.cpf}
              />

              <CustomPicker
                value={gender}
                onValueChange={handleGenderChange}
                options={[
                  { label: "Masculino", value: "MASCULINO" },
                  { label: "Feminino", value: "FEMININO" },
                ]}
                placeholder="Sexo"
                icon={<Feather name="user" size={16} color={color?.text} />}
                error={errors?.gender}
              />

              <CustomInput
                placeholder="Telefone"
                value={phone}
                onChangeText={handlePhoneChange}
                icon={<Feather name="phone" size={15} color={color?.text} />}
                error={errors?.phone}
              />

              <CustomInput
                placeholder="Telefone de Emergência"
                value={icePhone}
                onChangeText={handleIcePhoneChange}
                icon={<Feather name="phone" size={15} color={color?.text} />}
                error={errors?.icePhone}
              />

              <CustomInput
                placeholder="Nome da Mãe"
                value={motherName}
                onChangeText={handleMotherNameChange}
                icon={<Feather name="users" size={15} color={color?.text} />}
                error={errors?.motherName}
              />

              <CustomInput
                placeholder="CNS"
                value={cnsNumber}
                onChangeText={handleCnsNumberChange}
                icon={
                  <Feather name="clipboard" size={15} color={color?.text} />
                }
                error={errors?.cnsNumber}
              />
            </S.InputsContainer>

            <S.ButtonContainer>
              <CustomButton
                title="Cadastrar"
                onPress={handleSubmit}
                disabled={!isFormValid}
              />
            </S.ButtonContainer>
          </S.PopupContainer>
        </S.Overlay>
      </TouchableWithoutFeedback>
    </Modal>
  );
}
