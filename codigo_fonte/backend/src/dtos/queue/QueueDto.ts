import { Type } from "class-transformer";
import { IsNumber, Min } from "class-validator";

export class QueueDto {
  @Type(() => Number)
  @IsNumber({}, { message: "O parâmetro start deve ser um número" })
  @Min(0, { message: "O start não pode ser negativo" })
  page: number = 0;

  @Type(() => Number)
  @IsNumber({}, { message: "O parâmetro limit deve ser um número" })
  @Min(1, { message: "O limit deve ser pelo menos 1" })
  limit: number = 10;
}
