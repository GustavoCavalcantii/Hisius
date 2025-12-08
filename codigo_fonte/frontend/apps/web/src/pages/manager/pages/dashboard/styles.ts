import { color } from "@hisius/ui/theme/colors";
import { fadeInAnim, subtleSlideAnim } from "../../../../assets/animations";
import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  position: relative;
  min-height: 100%;
  flex-direction: column;
  gap: 1rem;
  ${fadeInAnim}
`;

export const TitleInfo = styled.div`
  font-size: clamp(13px, 2vw, 25px);
  font-weight: 200;
`;

export const SubtitleInfo = styled.div`
  font-size: clamp(15px, 7vw, 25px);
  font-weight: 300;
  color: ${color.primary};
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
    transition: color 0.2s ease;
  }
`;

export const LogContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 1rem;
`;

export const QueueContainer = styled.div`
  display: flex;
  gap: 1rem;

  @media (max-width: 754px) {
    display: flex;
    flex-direction: column;
  }
`;

export const InfoCardContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 1rem;
  width: 100%;
  justify-content: space-between;

  @media (max-width: 897px) {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
`;

export const SectionTitle = styled.h1`
  margin-top: 2rem;
  font-size: 24px;
  font-weight: 400;
  ${subtleSlideAnim}
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
  transition: all 0.2s ease;

  @media (max-width: 897px) {
    width: 100%;
  }
`;
