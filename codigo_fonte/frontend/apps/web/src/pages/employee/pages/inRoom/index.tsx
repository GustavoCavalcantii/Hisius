import { useState, useEffect } from "react";
import { QueueHeader } from "../../../../components/navbar";
import Toggle from "../../components/toggle";
import { PatientCard } from "./components/patientCard";
import type { IPatient } from "@hisius/interfaces/src";
import Pagination from "../../../../components/pagination";
import { Sidebar } from "../../components/sidebar";
import { Queue } from "@hisius/services";
import { Container, PatientButtonContainer, PatientContainer } from "./styles";
import { usePageTitle } from "../../../../hooks/PageTitle";

export function InRoom() {
  const [searchTerm, setSearchTerm] = useState("");
  const [patients, setPatients] = useState<IPatient[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isTriage, setIsTriage] = useState<boolean>(false);
  const [reloadFlag, setReloadFlag] = useState(false);
  const totalItems = patients.length || 0;
  const queueService = new Queue();

  usePageTitle("Salas - Hisius");

  const handleReloadFlag = () => {
    setReloadFlag((prev) => !prev);
  };

  const generateCard = (patients: IPatient[]) => {
    return patients.map((patient) => (
      <PatientCard
        key={patient.id || 0}
        id={patient.id}
        isTriage={isTriage}
        patient={patient}
        onChange={handleReloadFlag}
      />
    ));
  };

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const patientsData = await queueService.getPatientInRoomByQueue(
          isTriage,
          searchTerm
        );
        setPatients(patientsData.patients);
      } catch (error) {
        setPatients([]);
      }
    };

    const timeoutId = setTimeout(() => {
      if (searchTerm.length >= 3 || searchTerm.length === 0) {
        fetchPatients();
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchTerm, isTriage, reloadFlag]);

  const handleToggleChange = async (checked: boolean) => {
    setIsTriage(checked);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <>
      <Sidebar />
      <Container className="containerSide">
        <QueueHeader
          queueTitle="Consultar Salas"
          queueSubtitle="Consulta paciente nas salas"
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
