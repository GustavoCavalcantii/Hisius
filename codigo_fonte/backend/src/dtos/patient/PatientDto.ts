import {
  IsString,
  IsOptional,
  IsEnum,
  IsDateString,
  IsPhoneNumber,
} from "class-validator";
import { Gender } from "../../enums/User/Gender";

export class PatientDto {
  @IsString({
    message: "O CPF deve ser uma string",
    groups: ["create", "update"],
  })
  @IsOptional({ groups: ["create", "update"] })
  cpf?: string;

  @IsPhoneNumber("BR", {
    message: "O telefone de deve ser um número de telefone válido",
    groups: ["create", "update"],
  })
  @IsOptional({ groups: ["create", "update"] })
  phone?: string;

  @IsEnum(Gender, { message: "Sexo inválido", groups: ["create", "update"] })
  @IsOptional({ groups: ["create", "update"] })
  gender?: Gender;

  @IsDateString(
    {},
    {
      message: "A data de nascimento deve ser uma data válida",
      groups: ["create", "update"],
    }
  )
  @IsOptional({ groups: ["create", "update"] })
  birthDate?: string;

  @IsString({
    message: "CNS deve ser uma string",
    groups: ["create", "update"],
  })
  @IsOptional({ groups: ["create", "update"] })
  cnsNumber?: string;

  @IsPhoneNumber("BR", {
    message: "O telefone de emergência deve ser um número de telefone válido",
    groups: ["create", "update"],
  })
  @IsOptional({ groups: ["create", "update"] })
  icePhone?: string;

  @IsString({
    message: "O nome da mãe deve ser um texto válido",
    groups: ["create", "update"],
  })
  @IsOptional({ groups: ["create", "update"] })
  motherName?: string;
}
