import { QueueHeader } from "../../../../components/navbar";
import { Sidebar } from "../../components/sidebar";
import { Employee } from "./components/employee";
import { Container, EmployeContainer } from "./styles";

export function EmployeesList() {
  return (
    <>
      <Sidebar />
      <Container className="containerSide">
        <QueueHeader
          queueTitle="Funcionários"
          queueSubtitle="Lista de todos os funcionários"
          canSearch
          placeholder="Pesquisar funcionários"
        />
        <EmployeContainer>
          <Employee />
          <Employee />
          <Employee />
          <Employee />
          <Employee />
          <Employee />
          <Employee />
          <Employee />
          <Employee />
          <Employee />
          <Employee />
          <Employee />
          <Employee />
          <Employee />
          <Employee />
        </EmployeContainer>
      </Container>
    </>
  );
}
