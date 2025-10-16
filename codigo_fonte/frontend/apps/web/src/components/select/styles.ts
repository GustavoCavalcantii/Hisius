import { color } from "@hisius/ui/theme/colors";
import styled from "styled-components";

interface SelectProps {
  $hasError?: boolean;
}

export const SelectContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  width: 100%;
  max-width: 300px;
`;

export const SelectLabel = styled.label`
  font-size: 13px;
  color: ${color.text};
  margin-bottom: 4px;
`;

export const Options = styled.option`
  font-size: 13px;
  font-weight: 400;
`;

export const SelectComponent = styled.select<SelectProps>`
  background-color: ${color.background};
  border: 1.5px solid
    ${(props) => (props.$hasError ? color.error.error : color.gray)};
  border-radius: 4px;
  padding: 0.5rem;
  font-size: 13px;
  font-weight: 400;
  color: ${color.text};
  width: 100%;
  cursor: pointer;
  transition: all 0.25s ease;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%236B7280' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 12px center;
  background-size: 16px;

  &:focus {
    outline: none;
    border-color: ${(props) =>
      props.$hasError ? color.error.error : color.secondary};
    box-shadow: 0 0 0 3px
      ${(props) =>
        props.$hasError ? "rgba(229, 62, 62, 0.1)" : "rgba(0, 123, 255, 0.1)"};
  }
  &:active {
    transform: scale(0.98);
    transition: all 0.1s ease;
  }

  &:hover {
    border-color: ${(props) =>
      props.$hasError ? color.error.error : color.secondary};
  }

  &::placeholder {
    color: ${color.gray};
  }
`;

export const ErrorMessage = styled.span`
  font-size: 13px;
  color: ${color.error.error};
  margin-top: 4px;
`;
