
import { IsString, IsOptional, IsEnum, IsDateString, Length, IsNotEmpty } from "class-validator";
import { Gender } from "../../enums/User/Gender";

export class PatientDto {
  @IsString({ message: "O nome deve ser uma string", groups: ["create", "update"] })
  @Length(2, 100, { message: "O nome deve ter entre 2 e 100 caracteres", groups: ["create"] })
  @IsNotEmpty({ message: "O nome não pode ser vazio", groups: ["create"] })
  @IsOptional({ groups: ["update"] })
  name?: string;

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