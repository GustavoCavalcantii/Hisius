import { QueueHeader } from "../../../../components/navbar";
import { Sidebar } from "../../components/sidebar";
import { AdminCard } from "./components/adminCard";
import { AdminsContainer, Container } from "./styles";

export function AdminsList() {
  return (
    <>
      <Sidebar />
      <Container className="containerSide">
        <QueueHeader
          queueTitle="Administradores"
          queueSubtitle="Administradores cadastrados"
        />
        <AdminsContainer>
          <AdminCard name="Jorge" email="gustavo@gamil.com" />
          <AdminCard name="Jorge" email="gustavo@gamil.com" />
          <AdminCard name="Jorge" email="gustavo@gamil.com" />
        </AdminsContainer>
      </Container>
    </>
  );
}
