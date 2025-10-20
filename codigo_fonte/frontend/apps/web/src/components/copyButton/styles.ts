import { color } from "@hisius/ui/theme/colors";
import styled from "styled-components";
import { clickAnim } from "../../assets/animations";

export const Container = styled.button`
  display: flex;
  justify-content: center;
  cursor: pointer;
  background: ${color.background};
  border: 0.7px solid rgba(13, 19, 41, 0.12);
  border-radius: 5px;

  & svg {
    width: 20px;
    height: 20px;
  }

  ${clickAnim}
`;
