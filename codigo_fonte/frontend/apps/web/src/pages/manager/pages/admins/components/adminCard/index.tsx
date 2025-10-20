import { Container, Description, NameTitle, TitleContainer } from "./styles";

interface AdminCardProp {
  email: string;
  name: string;
}

export function AdminCard(props: AdminCardProp) {
  return (
    <>
      <Container>
        <TitleContainer>
          <NameTitle>{props.name}</NameTitle>
        </TitleContainer>
        <Description>{props.email}</Description>
      </Container>
    </>
  );
}
