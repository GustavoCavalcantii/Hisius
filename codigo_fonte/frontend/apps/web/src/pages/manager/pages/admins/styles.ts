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

export const AdminsContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 1rem;
  ${subtleSlideAnim}
`;
