import { color } from "@hisius/ui/theme/colors";
import styled from "styled-components";

export const Container = styled.div`
  position: relative;
  display: flex;
  width: 50vw;
  max-width: 535px;
  min-width: fit-content;
  padding: 1.5rem;
  background: ${color.front};
  border: 0.7px solid rgba(13, 19, 41, 0.12);
  border-radius: 5px;

  @media (max-width: 968px) {
    width: 80vw;
  }
`;
