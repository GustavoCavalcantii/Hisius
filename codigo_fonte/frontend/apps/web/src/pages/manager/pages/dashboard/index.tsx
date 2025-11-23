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
import type { LogData } from "@hisius/interfaces/src";
import { usePageTitle } from "../../../../hooks/PageTitle";

export function Dashboard() {
  const [hospitalCode, setHospitalCode] = useState<string>("");
  const [triageCount, setTriageCount] = useState<number>();
  const [treatmentCount, setTreatmentCount] = useState<number>();
  const [logs, setLogs] = useState<LogData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const adminService = new Admin();
  const queueService = new Queue();
  const { addNotification } = useNotification();

  usePageTitle("Administrador - Hisius");

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString("pt-BR");
  };

  const handleCopyLog = (logId: number) => {
    navigator.clipboard.writeText(`Log ID: ${logId}`);
    addNotification("Log copiado para a área de transferência", "success");
  };

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

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const logsResponse = await adminService.getLogs(0, 8);
        setLogs(logsResponse.logs);
      } catch (error) {
        addNotification("Erro ao buscar logs", "error");
      } finally {
        setLoading(false);
      }
    };

    fetchLogs();
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
          {loading ? (
            <p>Carregando logs...</p>
          ) : logs.length > 0 ? (
            logs.map((log) => (
              <Log
                key={log.id}
                module={log.module}
                id={log.id.toString()}
                action={`${log.action} - ${formatDate(log.createdAt)}`}
                onClick={() => handleCopyLog(log.id)}
              />
            ))
          ) : (
            <p>Nenhum log encontrado</p>
          )}
        </LogContainer>
      </Container>
    </>
  );
}
