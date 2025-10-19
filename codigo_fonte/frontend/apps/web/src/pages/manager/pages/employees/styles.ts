import { color } from "@hisius/ui/theme/colors";
import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  position: relative;
  min-height: 100%;
  flex-direction: column;
  gap: 1rem;
`;
export const EmployeContainer = styled.div`
  display: grid;
  gap: 1rem;
  place-items: center;
  grid-template-columns: repeat(9, 1fr);
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
