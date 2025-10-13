import { IsNumber, Min } from "class-validator";
import { Type } from "class-transformer";

export class UserParamsDto {
  /**
   * Id do usuário
   */
  @Type(() => Number)
  @IsNumber(
    {},
    { message: "O parâmetro 'userId' deve ser um número", groups: ["role"] }
  )
  @Min(0, {
    message: "O 'userId' deve ser maior que zero",
    groups: ["role"],
  })
  userId: number;
}
