import type { ChangeEvent } from "react";
import { SearchInput, SearchContainer } from "./styles";

interface SearchPatientProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function SearchPatient({
  value,
  onChange,
  placeholder,
}: SearchPatientProps) {
  return (
    <SearchContainer>
      <SearchInput
        type="text"
        value={value}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          onChange(e.target.value)
        }
        placeholder={placeholder}
      />
    </SearchContainer>
  );
}
