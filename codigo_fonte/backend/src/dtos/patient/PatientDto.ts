import { IsString, IsOptional, IsEnum, IsDateString, Length } from "class-validator";
import { Gender } from "../../enums/User/Gender";

export class PatientDto {

  @IsString({ message: "O nome deve ser uma string", groups: ["create"] })
  @Length(2, 100, { message: "O nome deve ter entre 2 e 100 caracteres", groups: ["create"] })
  @IsOptional({ groups: ["update"] }) // Opcional no update, obrigatório no create
  nome?: string;

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
