import { IsString, IsEmail, Length } from "class-validator";
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
  name!: string;

  @IsEmail(
    {},
    { message: "O email deve ser válido", groups: ["create", "login"] }
  )
  email!: string;

  @IsString({
    message: "A senha deve ser uma string",
    groups: ["create", "login"],
  })
  @Length(6, 255, {
    message: "A senha deve ter pelo menos 6 caracteres",
    groups: ["create"],
  })
  password!: string;

  @IsString({
    message: "Confirmar senha deve ser uma string",
    groups: ["create"],
  })
  @Match("password", { message: "As senhas não conferem", groups: ["create"] })
  confirmPassword!: string;
}
