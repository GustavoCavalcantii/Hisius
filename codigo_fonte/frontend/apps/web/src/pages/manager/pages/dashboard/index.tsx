import { QueueHeader } from "../../../../components/navbar";
import { Sidebar } from "../../components/sidebar";
import { HiOutlineClipboard } from "react-icons/hi2";
import {
  Container,
  InfoCardContainer,
  InfoContainer,
  InfoIcon,
  QueueContainer,
  SectionTitle,
  SubtitleInfo,
  TextContainer,
  TitleInfo,
} from "./styles";
import { Log } from "./components/log";

export function Dashboard() {
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
                <SubtitleInfo>15</SubtitleInfo>
              </TextContainer>
              <InfoIcon>
                <HiOutlineClipboard />
              </InfoIcon>
            </InfoContainer>
            <InfoContainer>
              <TextContainer>
                <TitleInfo>Pessoas na Triagem</TitleInfo>
                <SubtitleInfo>15</SubtitleInfo>
              </TextContainer>
              <InfoIcon>
                <HiOutlineClipboard />
              </InfoIcon>
            </InfoContainer>
          </QueueContainer>

          <InfoContainer>
            <TextContainer>
              <TitleInfo>Codigo do Hospital</TitleInfo>
              <SubtitleInfo>123458</SubtitleInfo>
            </TextContainer>
          </InfoContainer>
        </InfoCardContainer>
        <SectionTitle>Atividades recentes</SectionTitle>
        <Log />
      </Container>
    </>
  );
}
