import type { ReactNode } from "react";
import { Container } from "./styles";

interface FrontContainerProps {
  children?: ReactNode;
}

export function FrontContainer({ children }: FrontContainerProps) {
  return <Container>{children}</Container>;
}
