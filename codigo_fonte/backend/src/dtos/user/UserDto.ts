import { IsString, IsEmail, Length } from "class-validator";
import { Match } from "../../decorators/Match";

export class UserDTO {
  /**
   * Nome do usuário
   * Deve ter entre 2 e 100 caracteres
   */
  @IsString({
    message: "O nome deve ser um texto",
    groups: ["create", "update"],
  })
  @Length(2, 100, {
    message: "O nome deve ter entre 2 e 100 caracteres",
    groups: ["create", "update"],
  })
  name!: string;

  /**
   * Email do usuário
   */
  @IsEmail(
    {},
    {
      message: "O email informado não é válido",
      groups: ["create", "login", "forgot", "changeEmail"],
    }
  )
  email!: string;

  /**
   * Senha do usuário
   * Deve ter no mínimo 6 caracteres
   */
  @IsString({
    message: "A senha deve ser um texto",
    groups: ["create", "login", "reset"],
  })
  @Length(6, 255, {
    message: "A senha deve ter pelo menos 6 caracteres",
    groups: ["create", "reset"],
  })
  password!: string;

  /**
   * Confirmação da senha
   * Deve ser igual à senha
   */
  @IsString({
    message: "A confirmação da senha deve ser um texto",
    groups: ["create", "reset"],
  })
  @Match("password", {
    message: "As senhas não conferem",
    groups: ["create", "reset"],
  })
  confirmPassword!: string;
}
