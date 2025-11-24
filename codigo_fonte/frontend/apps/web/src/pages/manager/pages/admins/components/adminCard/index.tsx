import { Container, Description, NameTitle, TitleContainer } from "./styles";

interface AdminCardProp {
  email: string;
  onClick: () => void;
  name: string;
  id: number;
}

export function AdminCard(props: AdminCardProp) {
  return (
    <>
      <Container onClick={props.onClick}>
        <TitleContainer>
          <NameTitle>{props.name}</NameTitle>
        </TitleContainer>
        <Description>ID: {props.id}</Description>

        <Description>{props.email}</Description>
      </Container>
    </>
  );
}
