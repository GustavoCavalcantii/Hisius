import { QueueHeader } from "../../../../components/navbar";
import { Sidebar } from "../../components/sidebar";
import { AdminCard } from "./components/adminCard";
import { AdminsContainer, Container, NoAdminsMessage } from "./styles";
import { useEffect, useState } from "react";
import { Admin } from "@hisius/services";
import { useNotification } from "../../../../components/notification/context";
import type { User } from "@hisius/interfaces";
import Pagination from "../../../../components/pagination";

export function AdminsList() {
  const adminService = new Admin();
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [admins, setAdmins] = useState<User[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [itemsPerPage] = useState(12);
  const { addNotification } = useNotification();

  const fetchAdmins = async () => {
    try {
      const apiPage = currentPage - 1;

      const searchName =
        debouncedSearchTerm.length >= 3 ? debouncedSearchTerm : undefined;

      const adminsData = await adminService.getAdmins(
        searchName,
        apiPage,
        itemsPerPage
      );

      setAdmins(adminsData.users);
      adminsData.pagination
        ? setTotalItems(adminsData.pagination.totalItems)
        : setTotalItems(adminsData.users.length);
    } catch (error) {
      addNotification("Erro ao buscar administradores", "error");
      setAdmins([]);
      setTotalItems(0);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
      setCurrentPage(1);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  useEffect(() => {
    fetchAdmins();
  }, [currentPage, debouncedSearchTerm]);

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
          {admins.length > 0 ? (
            admins.map((admin) => (
              <AdminCard key={admin.id} name={admin.name} email={admin.email} />
            ))
          ) : (
            <NoAdminsMessage>nenhum administrador encontrado</NoAdminsMessage>
          )}
        </AdminsContainer>

        {totalItems > 0 && (
          <Pagination
            totalItems={totalItems}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            onPageChange={handlePageChange}
            maxVisibleButtons={5}
          />
        )}
      </Container>
    </>
  );
}
