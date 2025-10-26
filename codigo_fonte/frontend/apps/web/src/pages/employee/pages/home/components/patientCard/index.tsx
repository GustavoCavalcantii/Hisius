import type { IPatient } from "@hisius/interfaces/src";
import {
  Container,
  Description,
  NameTitle,
  SelectedCardContainer,
  TitleContainer,
  TriageBadge,
} from "./styles";
import { useState } from "react";
import { TextValue } from "../../../../../../components/textValue";
import { ManchesterTriage } from "@hisius/enums/src";
import { Select } from "../../../../../../components/select";
import Button from "@hisius/ui/components/Button";
import { useNotification } from "../../../../../../components/notification/context";
import { Queue } from "@hisius/services";
import { capitalizeWords } from "../../../../../../utils";

interface PatientCardProp {
  key: number;
  patient: IPatient;
  onChange: () => void;
}

export function PatientCard(props: PatientCardProp) {
  const [isSelected, setIsSelected] = useState(false);
  const [selectedClassification, setSelectedClassification] = useState<string>(
    props.patient.classification || ""
  );
  const { addNotification } = useNotification();
  const queueService = new Queue();

  const classificationOptions = Object.values(ManchesterTriage).map(
    (value) => ({
      value: value,
      label: value,
    })
  );

  const handleCardClick = () => {
    setIsSelected(!isSelected);
  };

  const handleSelectClick = (event: React.MouseEvent) => {
    event.stopPropagation();
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedClassification(event.target.value);
  };

  const handleButtonClick = async () => {
    try {
      await queueService.updateClassification(
        Number(props.patient.id),
        selectedClassification
      );
      props.onChange?.();
      addNotification("Classificação alterada com sucesso", "success");
      setIsSelected(false);
    } catch (err: any) {
      const errors = err.response?.data?.errors || [];
      const messages = errors
        .map((error: any) => error?.message || error)
        .filter(Boolean);

      if (messages.length === 0) {
        messages.push(
          err.response?.data?.message ||
            err.message ||
            "Erro ao mudar classificação do paciente"
        );
      }

      messages.forEach((message: string) => {
        addNotification(message, "error");
      });
    }
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
        <TextValue title="Idade:">{props.patient.age}</TextValue>
        <TextValue title="Sexo:">{props.patient.gender}</TextValue>
        {props.patient.classification ? (
          <>
            <TextValue title="Classificação:">
              <TriageBadge type={props.patient.classification}>
                {capitalizeWords(props.patient.classification.toString())}
              </TriageBadge>
            </TextValue>

            <Select
              label="Classificação"
              options={classificationOptions}
              onClick={handleSelectClick}
              onChange={handleSelectChange}
              value={selectedClassification}
            />
            <Button title="Alterar classificação" onPress={handleButtonClick} />
          </>
        ) : (
          ""
        )}
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
