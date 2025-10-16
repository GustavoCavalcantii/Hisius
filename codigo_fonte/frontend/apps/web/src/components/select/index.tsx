import { Value } from "../textValue/styles";
import {
  SelectContainer,
  SelectLabel,
  SelectComponent,
  ErrorMessage,
  Options,
} from "./styles";

interface SelectProps {
  label?: string;
  error?: string;
  value?: string;
  options: { value: string; label: string }[];
  onClick?: (event: React.MouseEvent) => void;
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

export function Select({
  label,
  error,
  options,
  onClick,
  onChange,
  value,
}: SelectProps) {
  const handleSelectClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    onClick?.(event);
  };

  return (
    <SelectContainer>
      {label && <SelectLabel>{label}</SelectLabel>}
      <SelectComponent
        value={value}
        onChange={onChange}
        onClick={handleSelectClick}
        $hasError={!!error}
      >
        {options.map((option) => (
          <Options key={option.value} value={option.value}>
            {option.label}
          </Options>
        ))}
      </SelectComponent>
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </SelectContainer>
  );
}
