import { color } from "@hisius/ui/theme/colors";
import { fadeInAnim } from "../../../../assets/animations";
import styled from "styled-components";

export const PatientButtonContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  align-items: start;
  gap: 2rem;

  @media (max-width: 969px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

export const PatientContainer = styled.div`
  grid-column: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  width: 100%;

  @media (max-width: 969px) {
    grid-column: 1 / span 2;
    order: 2;
  }

  @media (max-width: 480px) {
    grid-column: 1;
  }
`;

export const NextButton = styled.button`
  grid-column: 3;
  justify-self: start;
  display: flex;
  font-size: 16px;
  font-weight: 400;
  align-items: center;
  justify-content: center;
  background-color: ${color.front};
  border: 0.7px solid ${color.gray};
  border-radius: 5px;
  padding: 1rem;
  gap: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;
  flex-shrink: 0;
  margin-left: 1rem;

  @media (max-width: 969px) {
    grid-column: 1;
    order: 1;
    margin-left: 0;
  }

  @media (max-width: 480px) {
    grid-column: 1;
    justify-self: stretch;
    order: 1;
    margin-top: 1rem;
  }

  &:hover {
    background-color: ${color.primary};
    color: ${color.front};
    border-color: ${color.primary};
    transform: translateY(-1px);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  &:active {
    transform: scale(0.98);
    transition: all 0.1s ease;
  }
`;

export const InputAndButtonContainer = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;

  gap: 1rem;
`;

export const PopupText = styled.p`
  margin-bottom: 2rem;
  width: 100%;
  text-align: center;
`;

export const Container = styled.div`
  display: flex;
  min-height: 100%;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
  ${fadeInAnim}
`;
