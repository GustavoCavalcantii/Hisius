import { CopyButton } from "../../../../../../components/copyButton";
import { CodeContainer, Container, Text } from "./styles";

interface LogProps {
  onClick?: () => void;
  action: string;
  module: string;
  id: string;
}

export function Log({ onClick, module, action, id }: LogProps) {
  return (
    <Container>
      <Text>{module}</Text>
      <Text>{action}</Text>
      <CodeContainer>
        <Text>{id}</Text>
        <CopyButton onClick={onClick} />
      </CodeContainer>
    </Container>
  );
}
