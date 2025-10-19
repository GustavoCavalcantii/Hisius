import { TextValue } from "../../../../../../components/textValue";
import { FrontContainer } from "../../../../../../components/frontContainer";
import { ManchesterTriage } from "@hisius/enums/src";
import { Select } from "../../../../../../components/select";
import { useState } from "react";
import { Container, Title } from "./styles";

export function AddCard() {
  const classificationOptions = Object.values(ManchesterTriage).map(
    (value) => ({
      value: value,
      label: value,
    })
  );

  const [selectedClassification, setSelectedClassification] =
    useState<string>();

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedClassification(event.target.value);
  };

  const handleSelectClick = (event: React.MouseEvent) => {
    event.stopPropagation();
  };

  return (
    <FrontContainer>
      <Container>
        <Title>Jorge Alfredo</Title>
        <TextValue title="Idade:">a</TextValue>
        <TextValue title="Sexo:">a</TextValue>
        <Select
          label="Classificação"
          options={classificationOptions}
          onClick={handleSelectClick}
          onChange={handleSelectChange}
          value={selectedClassification}
        />
      </Container>
    </FrontContainer>
  );
}
