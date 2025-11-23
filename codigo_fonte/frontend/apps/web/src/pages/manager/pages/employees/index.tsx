import { QueueHeader } from "../../../../components/navbar";
import { Sidebar } from "../../components/sidebar";
import { Employee } from "./components/employee";
import { HiPlus, HiOutlineEnvelope } from "react-icons/hi2";
import {
  AddButton,
  ContactContainer,
  Container,
  CopyTextContainer,
  DataContainer,
  EmployeContainer,
  TextToCopy,
  NoEmployeesMessage,
  ButtonContainer,
} from "./styles";
import { useEffect, useState } from "react";
import { Admin } from "@hisius/services";
import { useNotification } from "../../../../components/notification/context";
import type { User } from "@hisius/interfaces";
import Popup from "../../../../components/popup";
import { CopyButton } from "../../../../components/copyButton";
import { copyToClipboard, truncateName } from "../../../../utils";
import Pagination from "../../../../components/pagination";
import CustomButton from "@hisius/ui/components/Button";

export function EmployeesList() {
  const adminService = new Admin();
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [employees, setEmployees] = useState<User[]>([]);
  const [selectedEmployee, setSelectedEmployee] = useState<User | null>(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isPopupCopyOpen, setIsPopupCopyOpen] = useState(false);
  const [code, setCode] = useState<string>("");
  const { addNotification } = useNotification();

  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [itemsPerPage] = useState(12);
  const [isLoading, setIsLoading] = useState(false);

  const fetchEmployees = async () => {
    try {
      const apiPage = currentPage - 1;

      const searchName =
        debouncedSearchTerm.length >= 3 ? debouncedSearchTerm : undefined;

      const employeesData = await adminService.getEmployees(
        searchName,
        apiPage,
        itemsPerPage
      );

      setEmployees(employeesData.users);
      employeesData.pagination
        ? setTotalItems(employeesData.pagination.totalItems)
        : setTotalItems(employeesData.users.length);
    } catch (error) {
      addNotification("Erro ao buscar funcionários", "error");
      setEmployees([]);
      setTotalItems(0);
    }
  };

  const handleMakeAdmin = async () => {
    if (!selectedEmployee) return;

    setIsLoading(true);
    try {
      await adminService.changeUserRole(selectedEmployee.id, 0);
      addNotification(
        "Funcionário promovido a administrador com sucesso!",
        "success"
      );
      await fetchEmployees();

      handleClosePopup();
    } catch (error) {
      addNotification("Erro ao promover funcionário a administrador", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmployeeClick = (employee: User) => {
    setSelectedEmployee(employee);
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setSelectedEmployee(null);
  };

  const handleClosePopupCopy = () => {
    setIsPopupCopyOpen(false);
    setCode("null");
  };

  const handleAddEmployee = async () => {
    const code = await adminService.getEmployeeRegisterCode();
    setCode(`http://localhost:5173/registrar?token=${encodeURIComponent(code)}`);
    setIsPopupCopyOpen(true);
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
    fetchEmployees();
  }, [currentPage, debouncedSearchTerm]);

  const handleCopy = async () => {
    const isOk = await copyToClipboard(code);
    if (isOk) addNotification("Texto copiado com sucesso!", "success");
  };

  return (
    <>
      <Sidebar />
      <Popup
        isOpen={isPopupCopyOpen}
        onClose={handleClosePopupCopy}
        title={"Adicionar novo funcionário"}
        size="medium"
      >
        <ContactContainer>
          <p>Copie o link abaixo e mande para o seu funcionário</p>
          <CopyTextContainer>
            <TextToCopy>{code}</TextToCopy>
            <CopyButton onClick={handleCopy} />
          </CopyTextContainer>
        </ContactContainer>
      </Popup>
      <Popup
        isOpen={isPopupOpen}
        onClose={handleClosePopup}
        title={truncateName(selectedEmployee?.name, 28) || "Funcionário"}
        size="medium"
      >
        <ContactContainer>
          <p>Contato:</p>
          <DataContainer>
            <HiOutlineEnvelope /> {selectedEmployee?.email}
          </DataContainer>
          <DataContainer>ID: {selectedEmployee?.id}</DataContainer>
          <ButtonContainer>
            <CustomButton
              title={isLoading ? "Processando..." : "Tornar Administrador"}
              onPress={handleMakeAdmin}
              disabled={isLoading}
            />
          </ButtonContainer>
        </ContactContainer>
      </Popup>
      <Container className="containerSide">
        <QueueHeader
          queueTitle="Funcionários"
          queueSubtitle="Lista de todos os funcionários"
          searhTerm={searchTerm}
          onChange={setSearchTerm}
          canSearch
          placeholder="Pesquisar funcionários"
        />

        <EmployeContainer>
          {employees.length > 0 ? (
            employees.map((employee) => (
              <Employee
                key={employee.id}
                employee={employee}
                onClick={() => handleEmployeeClick(employee)}
              />
            ))
          ) : (
            <NoEmployeesMessage>
              nenhum funcionário encontrado
            </NoEmployeesMessage>
          )}
        </EmployeContainer>

        {totalItems > 0 && (
          <Pagination
            totalItems={totalItems}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            onPageChange={handlePageChange}
            maxVisibleButtons={5}
          />
        )}

        <AddButton onClick={handleAddEmployee}>
          <HiPlus />
        </AddButton>
      </Container>
    </>
  );
}
