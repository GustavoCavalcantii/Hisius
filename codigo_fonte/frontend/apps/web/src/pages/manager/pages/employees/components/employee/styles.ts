import { color } from "@hisius/ui/theme/colors";
import { clickAnim, tabAnim } from "../../../../../../assets/animations";
import styled, { css } from "styled-components";

export const Container = styled.div`
  width: 100%;
  max-width: 115px;
  background-color: ${color.front};
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 22px 20px;
  position: relative;
  gap: 2rem;
  transform-origin: top center;
  transition: all 0.3s ease-out;

  &:hover {
    transform: scale(1.005);
    box-shadow: 0px 4px 5px rgba(0, 0, 0, 0.05);
  }
  z-index: 1;
`;

export const ViewMore = styled.button`
  cursor: pointer;
  ${clickAnim}
  font-size: 13px;
  font-weight: 200;
  background: none;
  border-radius: 5px;
  border: 1px solid ${color.secondary};
`;

export const Name = styled.h1`
  transition: all ease .4s;
  font-size: 13px;
  font-weight: 400;
  ${css`
    ${Container}:hover & {
      ${tabAnim}
    }
  `}
`;
