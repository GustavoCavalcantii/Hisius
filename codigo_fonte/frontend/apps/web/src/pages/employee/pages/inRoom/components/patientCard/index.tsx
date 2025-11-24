import type { IPatient } from "@hisius/interfaces/src";
import {
  Container,
  Description,
  NameTitle,
  SelectedCardContainer,
  TitleContainer,
  TriageBadge,
  PatientInfoGrid,
  InfoItem,
  InfoLabel,
  InfoValue,
} from "./styles";
import { useState } from "react";
import { TextValue } from "../../../../../../components/textValue";
import Button from "@hisius/ui/components/Button";
import { capitalizeWords } from "../../../../../../utils";
import { useNavigate } from "react-router-dom";
import { Queue } from "@hisius/services/src";
import { useNotification } from "../../../../../../components/notification/context";

interface PatientCardProp {
  key: number;
  patient: IPatient;
  id?: number;
  isTriage: boolean;
  onChange: () => void;
}

export function PatientCard(props: PatientCardProp) {
  const [isSelected, setIsSelected] = useState(false);
  const navigate = useNavigate();
  const queueService = new Queue();
  const { addNotification } = useNotification();

  const handleCardClick = () => {
    setIsSelected(!isSelected);
  };

  const handleButtonClick = async () => {
    if (props.isTriage) navigate(`/funcionario/filas/${props.id}`);
    else {
      try {
        await queueService.finishTreatment(props.id!);
        addNotification("Atendimento finalizado com sucesso", "success");
      } catch (err: any) {
        const errors = err.response?.data?.errors || [];
        const messages = errors
          .map((error: any) => error?.message || error)
          .filter(Boolean);

        if (messages.length === 0) {
          messages.push(
            err.response?.data?.message ||
              err.message ||
              "Erro ao chamar finalizar cadastro"
          );
        }

        messages.forEach((message: string) => {
          addNotification(message, "error");
        });
      }
    }

    props.onChange?.();
    setIsSelected(false);
  };

  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("pt-BR");
  };

  const notSelectedCard = () => {
    return (
      <Description>
        {props.patient.classification ? (
          <>
            Classificação de risco:{" "}
            <TriageBadge type={props.patient.classification}>
              {capitalizeWords(props.patient.classification.toString())}
            </TriageBadge>
          </>
        ) : (
          "Paciente aguardando avaliação triagem"
        )}
      </Description>
    );
  };

  const selectedCard = () => {
    return (
      <SelectedCardContainer>
        <PatientInfoGrid>
          <InfoItem>
            <InfoLabel>ID:</InfoLabel>
            <InfoValue>{props.patient.id}</InfoValue>
          </InfoItem>
          <InfoItem>
            <InfoLabel>Idade:</InfoLabel>
            <InfoValue>{props.patient.age} anos</InfoValue>
          </InfoItem>
          <InfoItem>
            <InfoLabel>Sexo:</InfoLabel>
            <InfoValue>{props.patient.gender}</InfoValue>
          </InfoItem>
          <InfoItem>
            <InfoLabel>Data de Nascimento:</InfoLabel>
            <InfoValue>{formatDate(props.patient.birthDate)}</InfoValue>
          </InfoItem>
          <InfoItem>
            <InfoLabel>Nome da Mãe:</InfoLabel>
            <InfoValue>{props.patient.motherName}</InfoValue>
          </InfoItem>
          <InfoItem>
            <InfoLabel>Número CNS:</InfoLabel>
            <InfoValue>{props.patient.cnsNumber}</InfoValue>
          </InfoItem>
        </PatientInfoGrid>

        {props.patient.classification ? (
          <>
            <TextValue title="Classificação:">
              <TriageBadge type={props.patient.classification}>
                {capitalizeWords(props.patient.classification.toString())}
              </TriageBadge>
            </TextValue>
          </>
        ) : (
          ""
        )}
        <Button
          title={props.isTriage ? "Ver informações" : "Finalizar atendimento"}
          onPress={handleButtonClick}
        />
      </SelectedCardContainer>
    );
  };

  return (
    <>
      <Container
        $isSelected={isSelected}
        type={props.patient.classification}
        onClick={handleCardClick}
      >
        <TitleContainer>
          <NameTitle $isSelected={isSelected}>{props.patient.name}</NameTitle>
        </TitleContainer>
        {!isSelected ? notSelectedCard() : selectedCard()}
      </Container>
    </>
  );
}
