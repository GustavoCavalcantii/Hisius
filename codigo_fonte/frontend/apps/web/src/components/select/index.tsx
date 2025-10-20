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
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
}

export function Select({
  label,
  error,
  options,
  onClick,
  onChange,
  value,
  placeholder = "Selecione uma opção",
  disabled = false,
  required = false,
}: SelectProps) {
  const handleSelectClick = (event: React.MouseEvent) => {
    if (disabled) return;
    event.stopPropagation();
    onClick?.(event);
  };

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    if (disabled) return;
    onChange?.(event);
  };

  return (
    <SelectContainer>
      {label && (
        <SelectLabel>
          {label}
          {required && (
            <span style={{ color: "#e53e3e", marginLeft: "4px" }}>*</span>
          )}
        </SelectLabel>
      )}
      <SelectComponent
        value={value}
        onChange={handleChange}
        onClick={handleSelectClick}
        $hasError={!!error}
        disabled={disabled}
        required={required}
        aria-invalid={!!error}
        aria-describedby={error ? `error-${label}` : undefined}
      >
        <Options value="" disabled hidden>
          {placeholder}
        </Options>

        {options.map((option) => (
          <Options key={option.value} value={option.value}>
            {option.label}
          </Options>
        ))}
      </SelectComponent>
      {error && <ErrorMessage id={`error-${label}`}>{error}</ErrorMessage>}
    </SelectContainer>
  );
}
