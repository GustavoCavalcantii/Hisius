import type { IEmployee } from "@hisius/interfaces";
import { Container, Name, ViewMore } from "./styles";
import { truncateName } from "../../../../../../utils";

interface EmployeeProps {
  employee: IEmployee;
  onClick: () => void;
  maxLength?: number;
}

export function Employee({ employee, onClick, maxLength = 8 }: EmployeeProps) {
  return (
    <Container onClick={onClick}>
      <Name>{truncateName(employee.name, maxLength)}</Name>
      <ViewMore>Ver Mais</ViewMore>
    </Container>
  );
}
