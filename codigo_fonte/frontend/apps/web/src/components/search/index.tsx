import type { ChangeEvent } from "react";
import { SearchInput, SearchContainer, IconContainer } from "./styles";
import { FaSearch } from "react-icons/fa";

interface SearchPatientProps {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  onClick?: () => void;
}

export function SearchPatient({
  value,
  onChange,
  placeholder,
  onClick,
}: SearchPatientProps) {
  return (
    <SearchContainer>
      <SearchInput
        type="text"
        id="search"
        value={value}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          onChange?.(e.target.value)
        }
        placeholder={placeholder}
      />
      {onClick ? (
        <IconContainer onClick={onClick}>
          <FaSearch />
        </IconContainer>
      ) : (
        ""
      )}
    </SearchContainer>
  );
}
