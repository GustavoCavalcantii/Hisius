import { color } from "@hisius/ui/theme/colors";
import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  width: 100%;
`;

export const Title = styled.h1`
  text-align: center;
`;

export const ValuesContainer = styled.div`
  height: fit-content;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  background-color: ${color.background};
`;
