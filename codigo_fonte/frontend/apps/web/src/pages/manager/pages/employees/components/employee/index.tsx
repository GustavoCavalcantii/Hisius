import type { IEmployee } from "@hisius/interfaces";
import { Container, Name, ViewMore } from "./styles";
interface EmployeeProps {
  employee: IEmployee;
  onClick: () => void;
}

export function Employee({ employee, onClick }: EmployeeProps) {
  return (
    <Container onClick={onClick}>
      <Name>{employee.name}</Name>
      <ViewMore>Ver Mais</ViewMore>
    </Container>
  );
}
