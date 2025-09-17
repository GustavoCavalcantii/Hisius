import { IsString, IsOptional, IsEnum, IsDateString } from "class-validator";
import { Gender } from "../../enums/User/Gender";

export class PatientDto {
  @IsOptional({ groups: ["update"] })
  @IsString({ message: "O CPF deve ser uma string", groups: ["update"] })
  cpf?: string;

  @IsOptional({ groups: ["update"] })
  @IsString({ message: "O telefone deve ser uma string", groups: ["update"] })
  telefone?: string;

  @IsOptional({ groups: ["update"] })
  @IsEnum(Gender, { message: "Sexo inválido", groups: ["update"] })
  sexo?: Gender;

  @IsOptional({ groups: ["update"] })
  @IsDateString(
    {},
    {
      message: "A data de nascimento deve ser uma data válida",
      groups: ["update"],
    }
  )
  data_nascimento?: string;
}
