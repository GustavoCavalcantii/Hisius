import { FaArrowLeft } from "react-icons/fa";
import { SearchPatient } from "../search";
import {
  ArrowContainer,
  Container,
  QueueContainer,
  QueueSubtitle,
  QueueTitle,
} from "./styles";
import { useNavigate } from "react-router-dom";
interface NavbarProps {
  onChange?: (value: string) => void;
  placeholder?: string;
  searhTerm?: string;
  onClick?: () => void;
  queueTitle: string;
  queueSubtitle: string;
  canSearch?: boolean;
  canBack?: boolean;
}

export function QueueHeader(props: NavbarProps) {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <Container>
      <QueueContainer>
        {props.canBack ? (
          <ArrowContainer onClick={handleBack}>
            <FaArrowLeft />
          </ArrowContainer>
        ) : (
          ""
        )}
        <div>
          <QueueTitle>{props.queueTitle}</QueueTitle>
          <QueueSubtitle>{props.queueSubtitle}</QueueSubtitle>
        </div>
      </QueueContainer>
      {props.canSearch ? (
        <SearchPatient
          value={props.searhTerm}
          onChange={props.onChange}
          placeholder={props.placeholder}
          onClick={props.onClick}
        />
      ) : (
        ""
      )}
    </Container>
  );
}
