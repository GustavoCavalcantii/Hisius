import { color } from "@hisius/ui/theme/colors";
import styled from "styled-components";

export const Container = styled.div`
  display: grid;
  gap: 1rem;
  grid-template-columns: 1fr 3fr 1fr;
  padding: 1rem;
  background: ${color.front};
  border: 0.7px solid rgba(13, 19, 41, 0.12);
  border-radius: 5px;

  & > *:nth-child(1) {
    border-right: 0.7px solid rgba(13, 19, 41, 0.12);
  }
  & * {
    display: flex;
    align-items: center;
  }
`;

export const CodeContainer = styled.div`
  display: flex;
  gap: 1rem;
`;

export const Text = styled.span`
  font-size: 13px;
  font-weight: 200;
  height: 100%;
`;
