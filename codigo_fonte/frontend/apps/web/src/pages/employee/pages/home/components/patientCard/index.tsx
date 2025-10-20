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

interface PatientCardProp {
  key: number;
  patient: IPatient;
}

export function PatientCard(props: PatientCardProp) {
  const [isSelected, setIsSelected] = useState(false);
  const [selectedClassification, setSelectedClassification] =
    useState<string>();

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

  const handleButtonClick = () => {};
  const notSelectedCard = () => {
    return (
      <Description>
        {props.patient.classification ? (
          <>
            Classificação de risco:{" "}
            <TriageBadge type={props.patient.classification}>
              {props.patient.classification}
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
        <TextValue title="Idade:">{props.patient.age.toString()}</TextValue>
        <TextValue title="Sexo:">{props.patient.gender}</TextValue>
        {props.patient.classification ? (
          <TextValue title="Classificação:">
            <TriageBadge type={props.patient.classification}>
              {props.patient.classification.toString()}
            </TriageBadge>
          </TextValue>
        ) : (
          ""
        )}
        <Select
          label="Classificação"
          options={classificationOptions}
          onClick={handleSelectClick}
          onChange={handleSelectChange}
          value={selectedClassification}
        />
        <Button title="Alterar classificação" onPress={handleButtonClick} />
      </SelectedCardContainer>
    );
  };

  return (
    <>
      <Container
        isSelected={isSelected}
        type={props.patient.classification}
        onClick={handleCardClick}
      >
        <TitleContainer>
          <NameTitle isSelected={isSelected}>{props.patient.name}</NameTitle>
        </TitleContainer>
        {!isSelected ? notSelectedCard() : selectedCard()}
      </Container>
    </>
  );
}
