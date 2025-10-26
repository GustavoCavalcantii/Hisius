import { Container } from "./styles";
import { TbCopy } from "react-icons/tb";
interface CopyButtonProps {
  onClick?: () => void;
}

export function CopyButton({ onClick }: CopyButtonProps) {
  return (
    <Container onClick={onClick}>
      <TbCopy />
    </Container>
  );
}
