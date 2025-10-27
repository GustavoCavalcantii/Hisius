import {
  IsString,
  IsOptional,
  IsEnum,
  IsDateString,
  IsPhoneNumber,
  Matches,
  MaxLength,
  MinLength,
} from "class-validator";
import { Gender } from "../../enums/User/Gender";

export class PatientDto {
  @IsString({
    message: "O CPF deve ser uma string",
    groups: ["create", "update"],
  })
  @Matches(/^\d{11}$/, {
    message: "CPF deve conter exatamente 11 dígitos",
    groups: ["create", "update"],
  })
  @IsOptional({ groups: ["update"] })
  cpf?: string;

  @IsPhoneNumber("BR", {
    message: "O telefone deve ser um número brasileiro válido",
    groups: ["create", "update"],
  })
  @IsOptional({ groups: ["create", "update"] })
  phone?: string;

  @IsEnum(Gender, { message: "Sexo inválido" })
  @IsOptional({ groups: ["update"] })
  gender?: Gender;

  @IsDateString(
    {},
    {
      message: "A data de nascimento deve ser uma data válida",
      groups: ["create", "update"],
    }
  )
  @IsOptional({ groups: ["update"] })
  birthDate?: string;

  @IsString({
    message: "CNS deve ser uma string",
    groups: ["create", "update"],
  })
  @Matches(/^\d{15}$/, {
    message: "CNS deve conter exatamente 15 dígitos numéricos",
    groups: ["create", "update"],
  })
  @IsOptional({ groups: ["update"] })
  cnsNumber?: string;

  @IsPhoneNumber("BR", {
    message: "O telefone de emergência deve ser um número de telefone válido",
    groups: ["create", "update"],
  })
  @IsOptional({ groups: ["update"] })
  icePhone?: string;

  @MaxLength(100, {
    message: "O nome da mãe deve ter no máximo 100 caracteres",
    groups: ["create", "update"],
  })
  @MinLength(3, {
    message: "O nome da mãe deve ter no mínimo 3 caracteres",
    groups: ["create", "update"],
  })
  @IsOptional({ groups: ["update"] })
  motherName?: string;
}
