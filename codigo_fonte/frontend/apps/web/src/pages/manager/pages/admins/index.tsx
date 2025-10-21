import { QueueHeader } from "../../../../components/navbar";
import { Sidebar } from "../../components/sidebar";
import { AdminCard } from "./components/adminCard";
import { AdminsContainer, Container } from "./styles";
import { useEffect, useState } from "react";
import { Admin } from "@hisius/services";
import { useNotification } from "../../../../components/notification/context";
import type { User } from "@hisius/interfaces";

export function AdminsList() {
  const adminService = new Admin();
  const [searchTerm, setSearchTerm] = useState("");
  const [admins, setAdmins] = useState<User[]>([]);
  const { addNotification } = useNotification();

  const fetchAdmins = async () => {
    try {
      const adminsData = await adminService.getAdmins();
      setAdmins(adminsData.users);
    } catch (error) {
      addNotification("Erro ao buscar administradores", "error");
    }
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      fetchAdmins();
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchTerm]);

  return (
    <>
      <Sidebar />
      <Container className="containerSide">
        <QueueHeader
          queueTitle="Administradores"
          queueSubtitle="Administradores cadastrados"
          searhTerm={searchTerm}
          onChange={setSearchTerm}
          canSearch
          placeholder="Pesquisar administradores"
        />
        <AdminsContainer>
          {admins.map((admin) => (
            <AdminCard key={admin.id} name={admin.name} email={admin.email} />
          ))}
        </AdminsContainer>
      </Container>
    </>
  );
}
