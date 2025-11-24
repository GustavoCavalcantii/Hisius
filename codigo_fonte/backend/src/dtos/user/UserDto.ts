import {
  IsString,
  IsEmail,
  Length,
  IsIn,
  IsStrongPassword,
} from "class-validator";
import { Match } from "../../decorators/Match";
import { UserRole } from "../../enums/User/UserRole";
import { Type } from "class-transformer";
import { PasswordRequirements } from "../../decorators/PasswordRequirements";

export class UserDTO {
  /**
   * Nome do usuário
   * Deve ter entre 2 e 100 caracteres
   */
  @IsString({
    message: "O nome deve ser um texto",
    groups: ["create", "update", "updateName"],
  })
  @Length(2, 100, {
    message: "O nome deve ter entre 2 e 100 caracteres",
    groups: ["create", "update", "updateName"],
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
   * Deve ter no mínimo 8 caracteres
   */
  @IsString({
    message: "A senha deve ser um texto",
    groups: ["create", "login", "reset"],
  })
  @PasswordRequirements({
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

  @Type(() => Number)
  @IsIn([UserRole.ADMIN, UserRole.EMPLOYEE], {
    message: `Role inválida. Use ${UserRole.ADMIN} (ADMIN) ou ${UserRole.EMPLOYEE} (EMPLOYEE).`,
    groups: ["role"],
  })
  role!: UserRole;
}
