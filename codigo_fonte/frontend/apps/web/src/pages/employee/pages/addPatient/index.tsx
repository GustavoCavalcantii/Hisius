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

export function AddPatient() {
  const { id } = useParams<{ id: string }>();
  const [patientData, setPatientData] = useState<IPatient | null>(null);
  const { addNotification } = useNotification();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPatientData = async () => {
      if (!id) {
        addNotification("Id do paciente não encontrado", "error");
        return;
      }
      try {
        const queueService = new Queue();
        const patient = await queueService.getPatient(Number(id));
        setPatientData(patient);
      } catch (error) {
        addNotification("Paciente não encontrado", "error");
        navigate("/funcionario");
      }
    };

    fetchPatientData();
  }, [id]);

  const handleClick = () => {};

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
            initialClassification={patientData?.classification}
          />
          <ButtonContainer>
            <CustomButton
              title={"Confirmar"}
              onPress={handleClick}
            ></CustomButton>
          </ButtonContainer>
        </ContentContainer>
      </Container>
    </>
  );
}
