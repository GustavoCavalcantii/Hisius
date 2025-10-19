import { ButtonContainer, Container, ContentContainer } from "./styles";
import { QueueHeader } from "../../../../components/navbar";
import { AddCard } from "./components/addCard";
import CustomButton from "@hisius/ui/components/Button";
import { Sidebar } from "../../components/sidebar";

export function AddPatient() {
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
          <AddCard />
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
