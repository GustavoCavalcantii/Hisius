import { CopyButton } from "../../../../../../components/copyButton";
import { CodeContainer, Container, Text } from "./styles";

interface LogProps {
  onClick?: () => void;
}

export function Log({ onClick }: LogProps) {
  return (
    <Container>
      <Text>Jorge Alberto</Text>
      <Text>Jorge Alberto</Text>
      <CodeContainer>
        <Text>Jorge Alberto</Text>
        <CopyButton onClick={onClick} />
      </CodeContainer>
    </Container>
  );
}
