import { ButtonContainer, Container, ContentContainer } from "./styles";
import { QueueHeader } from "../../../../components/navbar";
import { AddCard } from "./components/addCard";
import CustomButton from "@hisius/ui/components/Button";
import { Sidebar } from "../../components/sidebar";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { IPatient } from "@hisius/interfaces/src";
import { Queue } from "@hisius/services/src";
import { useNotification } from "../../../../components/notification/context";
import { usePageTitle } from "../../../../hooks/PageTitle";

export function AddPatient() {
  const { id } = useParams<{ id: string }>();
  const [patientData, setPatientData] = useState<IPatient | null>(null);
  const [selectedClassification, setSelectedClassification] =
    useState<string>("");
  const { addNotification } = useNotification();
  const navigate = useNavigate();
  const queueService = new Queue();
  usePageTitle("Cadastrar na fila - Hisius");
  useEffect(() => {
    const fetchPatientData = async () => {
      if (!id) {
        addNotification("Id do paciente não encontrado", "error");
        return;
      }
      try {
        const patient = await queueService.getPatient(Number(id));
        setPatientData(patient);
      } catch (error) {
        addNotification("Paciente não encontrado", "error");
        navigate("/funcionario");
      }
    };

    fetchPatientData();
  }, [id]);

  const handleClassificationChange = (classification: string) => {
    setSelectedClassification(classification);
  };

  const handleCallNext = async () => {
    try {
      await queueService.goToTreatment(
        Number(patientData?.id),
        selectedClassification
      );

      addNotification("Paciente foi movido para a outra fila", "success");
      navigate("/funcionario");
    } catch (err: any) {
      const errors = err.response?.data?.errors || [];
      const messages = errors
        .map((error: any) => error?.message || error)
        .filter(Boolean);

      if (messages.length === 0) {
        messages.push(
          err.response?.data?.message || err.message || "Erro ao mover paciente"
        );
      }

      messages.forEach((message: string) => {
        addNotification(message, "error");
      });
    }
  };

  return (
    <>
      <Sidebar />
      <Container className="containerSide">
        <QueueHeader
          queueTitle="Cadastrar na fila"
          queueSubtitle="Passar para a fila de atendimento"
          canBack
        />
        <ContentContainer>
          <AddCard
            name={patientData?.name || "Nome não informado"}
            age={patientData?.age || 0}
            gender={patientData?.gender || "Sexo não informado"}
            selectedClassification={selectedClassification}
            onClassificationChange={handleClassificationChange}
          />
          <ButtonContainer>
            <CustomButton
              title={"Confirmar"}
              onPress={handleCallNext}
            ></CustomButton>
          </ButtonContainer>
        </ContentContainer>
      </Container>
    </>
  );
}
