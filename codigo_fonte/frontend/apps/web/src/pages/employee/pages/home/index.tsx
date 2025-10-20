import { useState } from "react";
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
import { ManchesterTriage } from "@hisius/enums/src";
import Pagination from "../../../../components/pagination";
import { FaPlus } from "react-icons/fa";
import { Sidebar } from "../../components/sidebar";
import { useNavigate } from "react-router-dom";

export const mockPatients: IPatient[] = [
  {
    id: 106,
    gender: "Feminino",
    name: "Sofia Castro",
    age: 15,
    queuePos: 6,
  },
  {
    id: 107,
    gender: "Masculino",
    name: "Daniel Gomes",
    age: 50,
    classification: ManchesterTriage.NonUrgent,
    queuePos: 7,
  },
  {
    id: 108,
    gender: "Feminino",
    name: "Tânia Barros",
    age: 33,
    classification: ManchesterTriage.Emergency,
    queuePos: 8,
  },
  {
    id: 109,
    gender: "Masculino",
    name: "Bruno Reis",
    age: 28,
    queuePos: 9,
  },
  {
    id: 110,
    gender: "Feminino",
    name: "Larissa Fonseca",
    age: 19,
    classification: ManchesterTriage.Emergency,
    queuePos: 10,
  },
];

const generateCard = (patients: IPatient[]) => {
  return patients.map((patient) => (
    <PatientCard key={patient.id} patient={patient} />
  ));
};

export function Employee() {
  const [searchTerm, setSearchTerm] = useState("");
  const [patients, setPatients] = useState<IPatient[]>(mockPatients);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const totalItems = 156;
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/funcionario/filas`);
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
        <Toggle labels={{ on: "Atendimento", off: "Triagem" }} />
        <PatientButtonContainer>
          <PatientContainer>{generateCard(patients)}</PatientContainer>
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
