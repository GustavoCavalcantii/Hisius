import { color } from "@hisius/ui/theme/colors";
import styled from "styled-components";

export const Name = styled.h1`
  font-size: 13px;
  font-weight: 400;
`;

export const ViewMore = styled.button`
  cursor: pointer;
  &:active {
    transform: scale(0.98);
    transition: all 0.1s ease;
  }
  font-size: 13px;
  font-weight: 200;
  background: none;
  border-radius: 5px;
  border: 1px solid ${color.secondary};
`;

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
  cursor: pointer;
  transform-origin: top center;
  transition: all 0.3s ease;
  &:hover {
    transform: scale(1.005);
    box-shadow: 0px 4px 5px rgba(0, 0, 0, 0.05);
  }
  z-index: 1;
`;
