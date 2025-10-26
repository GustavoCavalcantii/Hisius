import { QueueHeader } from "../../../../components/navbar";
import { Sidebar } from "../../components/sidebar";
import { HiOutlineClipboard } from "react-icons/hi2";
import {
  Container,
  InfoCardContainer,
  InfoContainer,
  InfoIcon,
  LogContainer,
  QueueContainer,
  SectionTitle,
  SubtitleInfo,
  TextContainer,
  TitleInfo,
} from "./styles";
import { Log } from "./components/log";
import { useEffect, useState } from "react";
import { Admin, Queue } from "@hisius/services";
import { useNotification } from "../../../../components/notification/context";

export function Dashboard() {
  const [hospitalCode, setHospitalCode] = useState<string>("");
  const [triageCount, setTriageCount] = useState<number>();
  const [treatmentCount, setTreatmentCount] = useState<number>();
  const adminService = new Admin();
  const queueService = new Queue();
  const { addNotification } = useNotification();

  useEffect(() => {
    const fetchPatientData = async () => {
      try {
        const hospitalInfo = await adminService.getHospitalInfo();
        const triageCount = await queueService.getQueueCount("triage");
        const treatmentCount = await queueService.getQueueCount("treatment");
        setTriageCount(triageCount);
        setTreatmentCount(treatmentCount);
        setHospitalCode(hospitalInfo.hospitalCode);
      } catch (error) {
        addNotification("Erro ao buscar informações", "error");
      }
    };

    fetchPatientData();
  }, []);

  return (
    <>
      <Sidebar />
      <Container className="containerSide">
        <QueueHeader
          queueTitle="Painel de operações"
          queueSubtitle="Verifique dados importantes"
        />
        <InfoCardContainer>
          <QueueContainer>
            <InfoContainer>
              <TextContainer>
                <TitleInfo>Pessoas na Triagem</TitleInfo>
                <SubtitleInfo>{triageCount}</SubtitleInfo>
              </TextContainer>
              <InfoIcon>
                <HiOutlineClipboard />
              </InfoIcon>
            </InfoContainer>
            <InfoContainer>
              <TextContainer>
                <TitleInfo>Pessoas no Atendimento</TitleInfo>
                <SubtitleInfo>{treatmentCount}</SubtitleInfo>
              </TextContainer>
              <InfoIcon>
                <HiOutlineClipboard />
              </InfoIcon>
            </InfoContainer>
          </QueueContainer>

          <InfoContainer style={{ justifySelf: "end" }}>
            <TextContainer>
              <TitleInfo>Codigo do Hospital</TitleInfo>
              <SubtitleInfo>{hospitalCode}</SubtitleInfo>
            </TextContainer>
          </InfoContainer>
        </InfoCardContainer>
        <SectionTitle>Atividades recentes</SectionTitle>
        <LogContainer>
          <Log />
          <Log />
          <Log />
          <Log />
          <Log />
        </LogContainer>
      </Container>
    </>
  );
}
