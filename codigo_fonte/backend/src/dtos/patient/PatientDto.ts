
import { IsString, IsOptional, IsEnum, IsDateString, Length, IsNotEmpty } from "class-validator";
import { Gender } from "../../enums/User/Gender";

export class PatientDto {
  @IsString({ message: "O CPF deve ser uma string", groups: ["create", "update"] })
  @IsOptional({ groups: ["create", "update"] })
  cpf?: string;

  @IsString({ message: "O telefone deve ser uma string", groups: ["create", "update"] })
  @IsOptional({ groups: ["create", "update"] })
  phone?: string;

  @IsEnum(Gender, { message: "Sexo inválido", groups: ["create", "update"] })
  @IsOptional({ groups: ["create", "update"] })
  gender?: Gender;

  @IsDateString({}, { message: "A data de nascimento deve ser uma data válida", groups: ["create", "update"] })
  @IsOptional({ groups: ["create", "update"] })
  birthDate?: string;
}