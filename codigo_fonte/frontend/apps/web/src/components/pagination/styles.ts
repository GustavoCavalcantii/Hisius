import { color } from "@hisius/ui/theme/colors";
import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.3rem;
  margin: 1rem 0;
  flex-wrap: wrap;
`;

export const PageButton = styled.button<{ $active?: boolean; $dots?: boolean }>`
  padding: 0.5rem 0.8rem;
  border: 1px solid ${color.gray};
  background-color: white;
  color: ${color.text};
  cursor: pointer;
  border-radius: 4px;
  transition: all 0.2s ease;
  min-width: 2.5rem;
  font-family: inherit;

  &:active {
    transform: scale(0.98);
    transition: all 0.1s ease;
  }

  &:hover {
    background-color: ${color.front};
    border-color: ${color.primary};
  }

  ${(props) =>
    props.$active &&
    `
    background-color: ${color.primary}
    color: white;
    border-color: ${color.primary}
    
    &:hover {
      background-color: ${color.primary}
      border-color: ${color.primary}
    }
  `}

  ${(props) =>
    props.$dots &&
    `
    background-color: transparent;
    border: none;
    cursor: default;
    
    &:hover {
      background-color: transparent;
      border: none;
    }
  `}

  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
`;
