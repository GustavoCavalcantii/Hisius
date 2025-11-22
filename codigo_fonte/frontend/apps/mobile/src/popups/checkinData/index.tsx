import { useState } from "react";
import { Modal, TouchableWithoutFeedback } from "react-native";
import CustomInput from "@hisius/ui/components/CustomInput";
import CustomButton from "@hisius/ui/components/Button";
import { Feather } from "@expo/vector-icons";
import { IPatient } from "../../../../../packages/interfaces/src";
import * as S from "./style";

type Props = {
  visible: boolean;
  color?: { text: string };
  onSubmit?: (
    data: Pick<IPatient, "birthDate" | "cpf" | "gender" | "phone" | "motherName" | "cnsNumber">
  ) => void;
};

type GenderType = "" | "MASCULINO" | "FEMININO";

export default function CadastroPopup({ visible, onSubmit, color }: Props) {
  const [birthDate, setBirthDate] = useState("");
  const [cpf, setCpf] = useState("");
  const [gender, setGender] = useState<GenderType>("");
  const [phone, setPhone] = useState("");
  const [showGenderOptions, setShowGenderOptions] = useState(false);
  const [motherName, setMotherName] = useState("");
  const [cnsNumber, setCnsNumber] = useState("");

  const handleSubmit = () => {
    const submitData = {
      birthDate,
      cpf,
      gender: gender as "MASCULINO" | "FEMININO",
      phone,
      motherName,
      cnsNumber
    };

    if (gender) {
      onSubmit?.(submitData);
    }
  };

  const handleGenderSelect = (selectedGender: "MASCULINO" | "FEMININO") => {
    setGender(selectedGender);
    setShowGenderOptions(false);
  };

  const getGenderDisplayText = () => {
    if (gender === "MASCULINO") return "Masculino";
    if (gender === "FEMININO") return "Feminino";
    return "Selecione o sexo";
  };

  return (
    <Modal visible={visible} transparent animationType="fade">
      <TouchableWithoutFeedback onPress={() => setShowGenderOptions(false)}>
        <S.Overlay>
          <S.PopupContainer>
            <S.Title>
              Termine de cadastrar seus dados para seguir para a fila
            </S.Title>

            <S.InputsContainer>
              <CustomInput
                placeholder="Data de nascimento"
                value={birthDate}
                onChangeText={setBirthDate}
                icon={<Feather name="calendar" size={15} color={color?.text} />}
              />

              <CustomInput
                placeholder="CPF"
                value={cpf}
                onChangeText={setCpf}
                icon={<Feather name="credit-card" size={15} color={color?.text} />}
              />

              <S.GenderFieldContainer>
                <S.GenderInputButton
                  onPress={() => setShowGenderOptions(!showGenderOptions)}
                  active={showGenderOptions}
                >
                  <S.GenderInputContent>
                    <S.GenderText selected={!!gender}>
                      {getGenderDisplayText()}
                    </S.GenderText>
                    <Feather
                      name={showGenderOptions ? "chevron-up" : "chevron-down"}
                      size={20}
                      color={color?.text || "#666"}
                    />
                  </S.GenderInputContent>
                </S.GenderInputButton>

                {showGenderOptions && (
                  <S.GenderOptionsContainer>
                    <S.GenderOption
                      onPress={() => handleGenderSelect("MASCULINO")}
                      first
                    >
                      <S.GenderOptionText>Masculino</S.GenderOptionText>
                    </S.GenderOption>
                    <S.GenderOption
                      onPress={() => handleGenderSelect("FEMININO")}
                      last
                    >
                      <S.GenderOptionText>Feminino</S.GenderOptionText>
                    </S.GenderOption>
                  </S.GenderOptionsContainer>
                )}
              </S.GenderFieldContainer>

              <CustomInput
                placeholder="Telefone"
                value={phone}
                onChangeText={setPhone}
                icon={<Feather name="phone" size={15} color={color?.text} />}
              />

              <CustomInput
                placeholder="Nome da Mãe"
                value={motherName}
                onChangeText={setMotherName}
                icon={<Feather name="users" size={15} color={color?.text} />}
              />

              <CustomInput
                placeholder="CNS"
                value={cnsNumber}
                onChangeText={setCnsNumber}
                icon={<Feather name="clipboard" size={15} color={color?.text} />}
              />
            </S.InputsContainer>

            <S.ButtonContainer>
              <CustomButton
                title="Cadastrar"
                onPress={handleSubmit}
                disabled={!birthDate || !cpf || !gender || !phone || !motherName || !cnsNumber}
              />
            </S.ButtonContainer>
          </S.PopupContainer>
        </S.Overlay>
      </TouchableWithoutFeedback>
    </Modal>
  );
}