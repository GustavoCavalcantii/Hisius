import {
  IsString,
  IsEmail,
  IsOptional,
  IsEnum,
  IsDateString,
  Length,
} from "class-validator";
import { Gender } from "../../enums/User/Gender";
import { Match } from "../../decorators/Match";

export class UserDTO {
  @IsString({
    message: "O nome deve ser uma string",
    groups: ["create", "update"],
  })
  @Length(2, 100, {
    message: "O nome deve ter entre 2 e 100 caracteres",
    groups: ["create", "update"],
  })
  nome!: string;

  @IsEmail({}, { message: "O email deve ser válido", groups: ["create"] })
  email!: string;

  @IsString({
    message: "A senha deve ser uma string",
    groups: ["create"],
  })
  @Length(6, 255, {
    message: "A senha deve ter pelo menos 6 caracteres",
    groups: ["create"],
  })
  senha!: string;

  @IsString({
    message: "Confirmar senha deve ser uma string",
    groups: ["create"],
  })
  @Match("senha", { message: "As senhas não conferem", groups: ["create"] })
  confirmarSenha!: string;

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
