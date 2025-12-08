import { TextValue } from "../../../../../../components/textValue";
import { FrontContainer } from "../../../../../../components/frontContainer";
import { ManchesterTriage } from "@hisius/enums/src";
import { Select } from "../../../../../../components/select";
import { Container, Title } from "./styles";
import type { IPatient } from "@hisius/interfaces/src";

interface AddCardProps {
  name: string;
  patient: IPatient;
  dateHourAttendance?: string;
  error?: string;
  selectedClassification: string;
  onClassificationChange: (classification: string) => void;
}

const formatDate = (dateString: string): string => {
  if (!dateString) return "Não informado";
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString("pt-BR");
  } catch {
    return "Data inválida";
  }
};

const formatDateTime = (dateTimeString?: string): string => {
  if (!dateTimeString) return "Não informado";
  try {
    const date = new Date(dateTimeString);
    return date.toLocaleString("pt-BR");
  } catch {
    return "Data/hora inválida";
  }
};

export function AddCard({
  name,
  patient,
  dateHourAttendance,
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

        <TextValue title="ID:">{patient.id}</TextValue>
        <TextValue title="Idade:">{patient.age} anos</TextValue>
        <TextValue title="Sexo:">{patient.gender}</TextValue>
        <TextValue title="Data de Nascimento:">
          {formatDate(patient.birthDate)}
        </TextValue>
        <TextValue title="Nome da Mãe:">{patient.motherName}</TextValue>
        <TextValue title="Número CNS:">{patient.cnsNumber}</TextValue>

        {dateHourAttendance && (
          <TextValue title="Data/Hora Atendimento:">
            {formatDateTime(patient.dateHourAttendance)}
          </TextValue>
        )}

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
