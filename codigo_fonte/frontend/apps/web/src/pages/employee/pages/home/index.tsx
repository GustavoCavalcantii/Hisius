import { useState, useEffect } from "react";
import { QueueHeader } from "../../../../components/navbar";
import Toggle from "../../components/toggle";
import {
  Container,
  InputAndButtonContainer,
  NextButton,
  PatientButtonContainer,
  PatientContainer,
  PopupText,
} from "./styles";
import { PatientCard } from "./components/patientCard";
import type { IPatient } from "@hisius/interfaces/src";
import Pagination from "../../../../components/pagination";
import { FaPlus } from "react-icons/fa";
import { Sidebar } from "../../components/sidebar";
import { useNavigate } from "react-router-dom";
import { Queue } from "@hisius/services";
import { useNotification } from "../../../../components/notification/context";
import Popup from "../../../../components/popup";
import CustomButton from "@hisius/ui/components/Button";
import CustomInput from "@hisius/ui/components/CustomInput";
import { LuDoorOpen } from "react-icons/lu";

export function Employee() {
  const [searchTerm, setSearchTerm] = useState("");
  const [room, setRoom] = useState("");
  const [patients, setPatients] = useState<IPatient[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isTriage, setIsTriage] = useState<boolean>(false);
  const [nextPatient, setNextPatient] = useState<IPatient>();
  const [reloadFlag, setReloadFlag] = useState(false);
  const totalItems = patients.length || 0;
  const navigate = useNavigate();
  const { addNotification } = useNotification();
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const queueService = new Queue();

  const handleReloadFlag = () => {
    setReloadFlag((prev) => !prev);
  };

  const generateCard = (patients: IPatient[]) => {
    return patients.map((patient) => (
      <PatientCard
        key={patient.id}
        patient={patient}
        onChange={handleReloadFlag}
      />
    ));
  };

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const patientsData = await queueService.getPatientByQueue(
          isTriage,
          searchTerm
        );
        setPatients(patientsData);
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
  }, [searchTerm, isTriage, isPopupOpen, reloadFlag]);

  const handleToggleChange = async (checked: boolean) => {
    setIsTriage(checked);
  };

  const handleClick = async () => {
    const nextPatient = patients.find((patient) => !patient.classification);
    const nextPatientId = nextPatient?.id || patients[0]?.id;

    if (!nextPatientId) {
      addNotification("Nenhum paciente na fila", "warning");
      return;
    }

    try {
      const patient = await queueService.getPatient(Number(nextPatientId));
      setNextPatient(patient);
      setIsPopupOpen(true);
    } catch (err: any) {
      const errors = err.response?.data?.errors || [];
      const messages = errors
        .map((error: any) => error?.message || error)
        .filter(Boolean);

      if (messages.length === 0) {
        messages.push(
          err.response?.data?.message ||
            err.message ||
            "Erro ao chamar paciente"
        );
      }

      messages.forEach((message: string) => {
        addNotification(message, "error");
      });
    }
  };

  const handleClickNext = async () => {
    try {
      const next = await queueService.getNextPatient(isTriage, room);

      if (!next?.id) {
        addNotification("Nenhum paciente na fila", "warning");
        return;
      }

      if (isTriage) navigate(`/funcionario/filas/${next.id}`);
      addNotification("Paciente chamado com sucesso", "success");
      setIsPopupOpen(false);
    } catch (err: any) {
      const errors = err.response?.data?.errors || [];
      const messages = errors
        .map((error: any) => error?.message || error)
        .filter(Boolean);

      if (messages.length === 0) {
        messages.push(
          err.response?.data?.message ||
            err.message ||
            "Erro ao chamar paciente"
        );
      }

      messages.forEach((message: string) => {
        addNotification(message, "error");
      });
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    console.log(`Changed to page: ${page}`);
  };

  return (
    <>
      <Sidebar />
      <Popup
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        title={`Chamar ${nextPatient?.name} para a próxima fila`}
        size="medium"
      >
        <PopupText>Para qual sala você deseja chamar o paciente?</PopupText>

        <InputAndButtonContainer>
          <CustomInput
            value={room}
            onChangeText={setRoom}
            placeholder="Digite o nome da sala"
            icon={<LuDoorOpen />}
          />
          <CustomButton title={"Chamar"} onPress={handleClickNext} />
        </InputAndButtonContainer>
      </Popup>
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
