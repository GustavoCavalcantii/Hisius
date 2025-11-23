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

export const ButtonContainer = styled.div`
  display: flex;
  margin-top: 2rem;
  justify-content: center;
  width: 100%;
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

export const ContactContainer = styled.div`
  width: fit-content;
  margin: 2rem auto;
`;

export const AdminsContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 1rem;
  ${subtleSlideAnim}
`;
export const NoAdminsMessage = styled.div`
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
