import { TextValue } from "../../../../../../components/textValue";
import { FrontContainer } from "../../../../../../components/frontContainer";
import { ManchesterTriage } from "@hisius/enums/src";
import { Select } from "../../../../../../components/select";
import { useState } from "react";
import { Container, Title } from "./styles";

interface AddCardProps {
  name: string;
  age: number;
  gender: string;
  initialClassification?: string;
}

export function AddCard({
  name,
  age,
  gender,
  initialClassification,
}: AddCardProps) {
  const classificationOptions = Object.values(ManchesterTriage).map(
    (value) => ({
      value: value,
      label: value,
    })
  );

  const [selectedClassification, setSelectedClassification] = useState<string>(
    initialClassification || ""
  );

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedClassification(event.target.value);
  };

  const handleSelectClick = (event: React.MouseEvent) => {
    event.stopPropagation();
  };

  return (
    <FrontContainer>
      <Container>
        <Title>{name}</Title>
        <TextValue title="Idade:">{age}</TextValue>
        <TextValue title="Sexo:">{gender}</TextValue>
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
