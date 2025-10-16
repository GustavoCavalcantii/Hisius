import { color } from "@hisius/ui/theme/colors";
import styled from "styled-components";

export const SearchContainer = styled.div`
  position: relative;
  min-width: 500px;
`;

export const SearchInput = styled.input`
  width: 100%;
  padding: 15px 20px;
  border: .7px solid rgba(13, 19, 41, 0.12);
  border-radius: 5px;
  font-size: 13px;
  background: ${color.front};
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