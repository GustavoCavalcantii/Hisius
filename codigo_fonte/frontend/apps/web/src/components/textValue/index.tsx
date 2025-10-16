import type { ReactNode } from "react";
import { Container, Title, Value } from "./styles";

interface TextValueProps {
  title: string;
  children: ReactNode;
}

export function TextValue(props: TextValueProps) {
  return (
    <Container>
      <Title>{props.title}</Title>
      <Value>{props.children}</Value>
    </Container>
  );
}
