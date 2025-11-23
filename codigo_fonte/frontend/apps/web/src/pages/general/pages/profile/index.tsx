import { useState, useEffect } from "react";
import { QueueHeader } from "../../../../components/navbar";
import { Sidebar as ManagerSidebar } from "../../../manager/components/sidebar";
import { Sidebar as EmployeeSidebar } from "../../../employee/components/sidebar";
import { useNotification } from "../../../../components/notification/context";
import Popup from "../../../../components/popup";
import CustomButton from "@hisius/ui/components/Button";
import CustomInput from "@hisius/ui/components/CustomInput";
import { HiOutlineEnvelope, HiOutlineLockClosed } from "react-icons/hi2";
import {
  Container,
  ProfileContainer,
  FormContainer,
  Section,
  SectionTitle,
  InputGroup,
  SecurityActions,
  SecurityItem,
  SecurityIcon,
  SecurityTextContainer,
  SecurityTitle,
  SecurityDescription,
  ActionsContainer,
  PopupText,
  StyledIcon,
} from "./styles";
import LocalStorageManager from "@hisius/services/src/helpers/localStorageManager";
import { Auth } from "@hisius/services/src";
import { color } from "@hisius/ui/theme/colors";

export function ProfileScreen() {
  const { addNotification } = useNotification();
  const [isEmailPopupOpen, setIsEmailPopupOpen] = useState(false);
  const [newEmail, setNewEmail] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [initialData, setInitialData] = useState({ name: "", email: "" });
  const [emailError, setEmailError] = useState("");
  const [newEmailError, setNewEmailError] = useState("");
  const [userRole, setUserRole] = useState<number | null>(null);

  const AuthService = new Auth();

  const validateEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const loadProfileData = async () => {
    try {
      const user = LocalStorageManager.getUser();
      if (user && user.role !== undefined) {
        setUserRole(user.role);
      }
      const profileData = await AuthService.getProfile();
      setName(profileData.name || "");
      setEmail(profileData.email || "");
      setInitialData({
        name: profileData.name || "",
        email: profileData.email || "",
      });
      setNewEmail(profileData.email || "");
    } catch (err) {
      console.error("Erro ao carregar perfil:", err);
      addNotification("Erro ao carregar dados do perfil", "error");
    }
  };

  useEffect(() => {
    loadProfileData();
  }, []);

  const handleChangePass = async () => {
    try {
      await AuthService.changePass(email);
      addNotification(
        "Código de verificação enviado para seu email!",
        "success"
      );
      setIsEmailPopupOpen(false);
      setNewEmailError("");
    } catch (err) {
      console.error("Erro ao alterar email:", err);
      addNotification(
        "Erro ao enviar código de verificação. Tente novamente.",
        "error"
      );
    }
  };

  const handleLogout = () => {
    LocalStorageManager.clearAll();
    addNotification("Logout realizado com sucesso!", "success");
    window.location.reload();
  };

  const handleEmailChange = (value: string) => {
    setEmail(value);
    setEmailError(
      value && !validateEmail(value) ? "Por favor, insira um email válido" : ""
    );
  };

  const handleNewEmailChange = (value: string) => {
    setNewEmail(value);
    setNewEmailError(
      value && !validateEmail(value) ? "Por favor, insira um email válido" : ""
    );
  };

  const handleSave = () => {
    if (!validateEmail(email)) {
      setEmailError("Por favor, insira um email válido");
      return;
    }
    addNotification("Perfil atualizado com sucesso!", "success");
    setInitialData({ name, email });
  };

  const handleEmailSubmit = async () => {
    if (!newEmail.trim() || !validateEmail(newEmail)) {
      setNewEmailError("Por favor, insira um email válido");
      return;
    }

    if (newEmail === email) {
      setNewEmailError("O novo email deve ser diferente do atual");
      return;
    }

    try {
      await AuthService.changeEmail(newEmail);
      addNotification(
        "Código de verificação enviado para o novo email!",
        "success"
      );
      setIsEmailPopupOpen(false);
      setNewEmailError("");
    } catch (err) {
      console.error("Erro ao alterar email:", err);
      addNotification(
        "Erro ao enviar código de verificação. Tente novamente.",
        "error"
      );
    }
  };

  const renderSidebar = () => {
    if (userRole === 0) {
      return <ManagerSidebar />;
    } else if (userRole === 2) {
      return <EmployeeSidebar />;
    }
    return null;
  };

  const hasValidChanges = () =>
    name !== initialData.name ||
    (email !== initialData.email &&
      name.trim() !== "" &&
      email.trim() !== "" &&
      validateEmail(email));

  return (
    <>
      {renderSidebar()}

      <Popup
        isOpen={isEmailPopupOpen}
        onClose={() => setIsEmailPopupOpen(false)}
        title="Alterar Email"
        size="medium"
      >
        <CustomInput
          placeholder="Digite o novo email"
          value={newEmail}
          onChangeText={handleNewEmailChange}
          error={newEmailError}
          style={{ marginBottom: 30 }}
        />
        <PopupText>
          Enviaremos um email de verificação para confirmar que este email
          pertence a você.
        </PopupText>
        <CustomButton title="Alterar" onPress={handleEmailSubmit} />
      </Popup>

      <Container className="containerSide">
        <QueueHeader
          queueTitle="Seu Perfil"
          queueSubtitle="Gerencie suas informações pessoais"
        />

        <ProfileContainer>
          <FormContainer>
            <Section>
              <SectionTitle>Informações Pessoais</SectionTitle>
              <InputGroup>
                <CustomInput
                  placeholder="Nome completo"
                  value={name}
                  onChangeText={setName}
                />
              </InputGroup>
              <InputGroup>
                <CustomInput
                  placeholder="Email"
                  value={email}
                  disabled
                  onChangeText={handleEmailChange}
                  error={emailError}
                />
              </InputGroup>
            </Section>

            <Section>
              <SectionTitle>Segurança</SectionTitle>
              <SecurityActions>
                <SecurityItem onClick={() => setIsEmailPopupOpen(true)}>
                  <SecurityIcon>
                    <HiOutlineEnvelope size={24} />
                  </SecurityIcon>
                  <SecurityTextContainer>
                    <SecurityTitle>Alterar Email</SecurityTitle>
                    <SecurityDescription>
                      Modifique seu endereço de email
                    </SecurityDescription>
                  </SecurityTextContainer>
                </SecurityItem>

                <SecurityItem onClick={handleChangePass}>
                  <SecurityIcon>
                    <HiOutlineLockClosed size={24} />
                  </SecurityIcon>
                  <SecurityTextContainer>
                    <SecurityTitle>Alterar Senha</SecurityTitle>
                    <SecurityDescription>
                      Atualize sua senha de acesso
                    </SecurityDescription>
                  </SecurityTextContainer>
                </SecurityItem>

                <SecurityItem onClick={handleLogout}>
                  <SecurityIcon>
                    <StyledIcon size={24} />
                  </SecurityIcon>
                  <SecurityTextContainer>
                    <SecurityTitle style={{ color: color.error.error }}>
                      Sair da Conta
                    </SecurityTitle>
                    <SecurityDescription>Saia da sua conta</SecurityDescription>
                  </SecurityTextContainer>
                </SecurityItem>
              </SecurityActions>
            </Section>

            <ActionsContainer>
              <CustomButton
                title="Salvar Alterações"
                onPress={handleSave}
                disabled={!hasValidChanges()}
              />
            </ActionsContainer>
          </FormContainer>
        </ProfileContainer>
      </Container>
    </>
  );
}
