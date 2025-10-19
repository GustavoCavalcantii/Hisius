import { color } from "@hisius/ui/theme/colors";
import styled from "styled-components";

export const SearchContainer = styled.div`
  position: relative;
  display: flex;
  min-width: 500px;
  background: ${color.front};
  border: 0.7px solid rgba(13, 19, 41, 0.12);
  border-radius: 5px;
`;

export const IconContainer = styled.button`
  width: 10%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;

  cursor: pointer;

  &:active {
    transform: scale(0.98);
    transition: all 0.1s ease;
  }
  & svg {
    color: ${color.text};
  }
`;

export const SearchInput = styled.input`
  flex: 1;
  padding: 15px 20px;
  border: none;

  border-radius: 5px;
  font-size: 13px;
  background: none;
  transition: all 0.2s;

  &:focus {
    outline: none;
    border-color: ${color.primary};
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }

  &::placeholder {
    color: ${color.text};
    font-weight: 200;
  }
`;
