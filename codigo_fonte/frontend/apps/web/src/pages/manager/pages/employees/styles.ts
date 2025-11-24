import { color } from "@hisius/ui/theme/colors";
import { fadeInAnim } from "../../../../assets/animations";
import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  position: relative;
  min-height: 100%;
  flex-direction: column;
  gap: 1rem;
`;


export const ButtonContainer = styled.div`
  display: flex;
  margin-top: 2rem;
  justify-content: center;
  width: 100%;
`;

export const ItemsPerPageSelector = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;

  label {
    font-size: 0.9rem;
    color: ${color.gray};
  }

  select {
    padding: 0.25rem 0.5rem;
    border-radius: 4px;
    border: 1px solid ${color.gray};
    background-color: white;
  }
`;

export const NoEmployeesMessage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  color: ${color.text};
  font-size: 16px;
  width: 100%;
  text-align: center;
  grid-column: 1 / -1;
`;

export const EmployeContainer = styled.div`
  display: grid;
  gap: 1rem;
  place-items: center;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 130px), 1fr));

  @media (min-width: 1200px) {
    grid-template-columns: repeat(8, 1fr);
  }
  ${fadeInAnim}
`;

export const ContactContainer = styled.div`
  width: fit-content;
  margin: 2rem auto;
`;

export const CopyTextContainer = styled.div`
  display: flex;
  margin-top: 2rem;
  justify-content: space-between;
  background-color: ${color.background};
  border: 1px solid ${color.gray};
  border-radius: 4px;
  padding: 0.5rem;
  align-items: center;
`;

export const TextToCopy = styled.span`
  flex: 1;
  width: 100px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-right: 1rem;
  color: ${color.text};
`;

export const DataContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;

  & svg {
    width: 20px;
    height: 20px;
  }
`;

export const AddButton = styled.button`
  width: 60px;
  aspect-ratio: 1/1;
  border-radius: 50%;
  border: none;
  cursor: pointer;

  display: flex;
  place-items: center;

  position: fixed;

  right: 5%;
  bottom: 5%;

  z-index: 9;

  padding: 1rem;

  &:active {
    transform: scale(0.98);
    transition: all 0.1s ease;
  }

  background-color: ${color.primary};
  color: ${color.front};

  & svg {
    width: 100%;
    height: 100%;
    color: ${color.front};
    aspect-ratio: 1/1;
  }
`;

export const TitleInfo = styled.div`
  font-size: 16px;
  font-weight: 200;
`;

export const SubtitleInfo = styled.div`
  font-size: 24px;
  font-weight: 300;
`;

export const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
`;

export const InfoIcon = styled.div`
  & svg {
    width: 50px;
    height: 50px;
    color: ${color.text};
  }
`;

export const QueueContainer = styled.div`
  display: flex;
  gap: 1rem;
`;

export const InfoCardContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;

export const SectionTitle = styled.h1`
  margin-top: 2rem;
  font-size: 24px;
  font-weight: 400;
`;

export const InfoContainer = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: space-around;
  align-items: center;
  padding: 1.5rem;
  background: ${color.front};
  border: 0.7px solid rgba(13, 19, 41, 0.12);
  border-radius: 5px;
`;
