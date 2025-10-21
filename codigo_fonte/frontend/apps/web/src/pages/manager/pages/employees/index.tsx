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
} from "./styles";
import { useEffect, useState } from "react";
import { Admin } from "@hisius/services";
import { useNotification } from "../../../../components/notification/context";
import type { UserResponse, User } from "@hisius/interfaces";
import Popup from "../../../../components/popup";
import { CopyButton } from "../../../../components/copyButton";
import { copyToClipboard } from "../../../../utils";

export function EmployeesList() {
  const adminService = new Admin();
  const [searchTerm, setSearchTerm] = useState("");
  const [employees, setEmployees] = useState<User[]>([]);
  const [selectedEmployee, setSelectedEmployee] = useState<User | null>(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isPopupCopyOpen, setIsPopupCopyOpen] = useState(false);
  const [code, setCode] = useState<string>("");
  const { addNotification } = useNotification();

  const fetchEmployees = async () => {
    try {
      const employeesData: UserResponse =
        await adminService.getEmployees(searchTerm);
      setEmployees(employeesData.users);
    } catch (error) {
      addNotification("Erro ao buscar funcionários", "error");
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
    setCode(`http://localhost:5173/login/?token=${encodeURIComponent(code)}`);

    setIsPopupCopyOpen(true);
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchTerm.length >= 3 || searchTerm.length === 0) {
        fetchEmployees();
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchTerm]);

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
        title={selectedEmployee?.name || "Funcionário"}
        size="medium"
      >
        <ContactContainer>
          <p>Contato:</p>
          <DataContainer>
            <HiOutlineEnvelope /> {selectedEmployee?.email}
          </DataContainer>
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
          {employees.map((employee) => (
            <Employee
              key={employee.id}
              employee={employee}
              onClick={() => handleEmployeeClick(employee)}
            />
          ))}
        </EmployeContainer>
        <AddButton onClick={handleAddEmployee}>
          <HiPlus />
        </AddButton>
      </Container>
    </>
  );
}
