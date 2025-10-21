import { TextValue } from "../../../../../../components/textValue";
import { FrontContainer } from "../../../../../../components/frontContainer";
import { ManchesterTriage } from "@hisius/enums/src";
import { Select } from "../../../../../../components/select";
import { Container, Title } from "./styles";

interface AddCardProps {
  name: string;
  age: number;
  gender: string;
  error?: string;
  selectedClassification: string;
  onClassificationChange: (classification: string) => void;
}

export function AddCard({
  name,
  age,
  gender,
  selectedClassification,
  onClassificationChange,
  error,
}: AddCardProps) {
  const classificationOptions = Object.values(ManchesterTriage).map(
    (value) => ({
      value: value,
      label: value,
    })
  );

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onClassificationChange(event.target.value);
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
          error={error}
        />
      </Container>
    </FrontContainer>
  );
}
