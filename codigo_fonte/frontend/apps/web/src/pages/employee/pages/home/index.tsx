import { useState, useEffect } from "react";
import { QueueHeader } from "../../../../components/navbar";
import Toggle from "../../components/toggle";
import {
  Container,
  NextButton,
  PatientButtonContainer,
  PatientContainer,
} from "./styles";
import { PatientCard } from "./components/patientCard";
import type { IPatient } from "@hisius/interfaces/src";
import Pagination from "../../../../components/pagination";
import { FaPlus } from "react-icons/fa";
import { Sidebar } from "../../components/sidebar";
import { useNavigate } from "react-router-dom";
import { Queue } from "@hisius/services";
import { useNotification } from "../../../../components/notification/context";

const generateCard = (patients: IPatient[]) => {
  return patients.map((patient) => (
    <PatientCard key={patient.id} patient={patient} />
  ));
};

export function Employee() {
  const [searchTerm, setSearchTerm] = useState("");
  const [patients, setPatients] = useState<IPatient[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isTriage, setIsTriage] = useState<boolean>(false);
  const totalItems = patients.length || 0;
  const navigate = useNavigate();
  const { addNotification } = useNotification();
  const queueService = new Queue();

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const patientsData = await queueService.getPatientByQueue(
          isTriage,
          searchTerm
        );
        setPatients(patientsData);
      } catch (error) {
        console.error("Erro ao buscar pacientes:", error);
        setPatients([]);
      }
    };

    const timeoutId = setTimeout(() => {
      if (searchTerm.length >= 3 || searchTerm.length === 0) {
        fetchPatients();
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchTerm, isTriage]);

  const handleToggleChange = (checked: boolean) => {
    setIsTriage(checked);
  };

  const handleClick = () => {
    const nextPatient = patients.find((patient) => !patient.classification);
    const nextPatientId = nextPatient?.id || patients[0]?.id;

    if (nextPatientId) {
      navigate(`/funcionario/filas/${nextPatientId}`);
      return;
    }

    console.warn("Nenhum paciente disponível para próximo");
    addNotification("Nenhum paciente na fila", "warning");
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    console.log(`Changed to page: ${page}`);
  };

  return (
    <>
      <Sidebar />
      <Container className="containerSide">
        <QueueHeader
          queueTitle="Consultar Paciente"
          queueSubtitle="Consulta paciente na fila"
          searhTerm={searchTerm}
          onChange={setSearchTerm}
          placeholder="Buscar pacientes..."
          canSearch
        />
        <Toggle
          labels={{ on: "Triagem", off: "Atendimento" }}
          onToggle={handleToggleChange}
        />
        <PatientButtonContainer>
          <PatientContainer>
            {patients.length > 0 ? (
              generateCard(patients)
            ) : (
              <p>Nenhum paciente encontrado</p>
            )}
          </PatientContainer>
          <NextButton onClick={handleClick}>
            <FaPlus />
            Próximo paciente
          </NextButton>
        </PatientButtonContainer>
        <Pagination
          totalItems={totalItems}
          itemsPerPage={10}
          currentPage={currentPage}
          onPageChange={handlePageChange}
          maxVisibleButtons={3}
        />
      </Container>
    </>
  );
}
