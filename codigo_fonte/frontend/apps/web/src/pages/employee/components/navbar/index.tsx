import { SearchPatient } from "../../../../components/search";
import { Container, QueueContainer, QueueSubtitle, QueueTitle } from "./styles";
interface NavbarProps {
  searhTerm: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function QueueHeader(props: NavbarProps) {
  return (
    <Container>
      <QueueContainer>
        <QueueTitle>Buscar pacientes</QueueTitle>
        <QueueSubtitle>Fila de atendimento</QueueSubtitle>
      </QueueContainer>
      <SearchPatient
        value={props.searhTerm}
        onChange={props.onChange}
        placeholder={props.placeholder}
      />
    </Container>
  );
}
