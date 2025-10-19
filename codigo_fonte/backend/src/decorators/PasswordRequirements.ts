import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
} from "class-validator";

export function PasswordRequirements(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: "PasswordRequirements",
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: {
        validate(value: string) {
          if (typeof value !== "string") return false;
          return (
            value.length >= 8 &&
            /[a-z]/.test(value) &&
            /[A-Z]/.test(value) &&
            /\d/.test(value) &&
            /[^A-Za-z0-9]/.test(value)
          );
        },
        defaultMessage(args: ValidationArguments) {
          const value = args.value as string;
          const missing: string[] = [];

          if (!value || value.length < 8) missing.push("8 caracteres");
          if (!/[a-z]/.test(value)) missing.push("letra minúscula");
          if (!/[A-Z]/.test(value)) missing.push("letra maiúscula");
          if (!/\d/.test(value)) missing.push("número");
          if (!/[^A-Za-z0-9]/.test(value)) missing.push("símbolo");

          return `A senha deve conter: ${missing.join(", ")}.`;
        },
      },
    });
  };
}
