import { Type } from "class-transformer";
import { IsEnum, IsNumber, Min } from "class-validator";
import { ManchesterClassification } from "../../enums/Queue/ManchesterClassification";

export class QueueDto {
  @Type(() => Number)
  @IsNumber(
    {},
    { message: "O parâmetro start deve ser um número", groups: ["search"] }
  )
  @Min(0, { message: "O start não pode ser negativo", groups: ["search"] })
  page: number = 0;

  @Type(() => Number)
  @IsNumber(
    {},
    { message: "O parâmetro limit deve ser um número", groups: ["search"] }
  )
  @Min(1, { message: "O limit deve ser pelo menos 1", groups: ["search"] })
  limit: number = 10;

  @IsEnum(ManchesterClassification, {
    message: "A classificação deve ser um tipo válido",
    groups: ["next"],
  })
  classification: ManchesterClassification;
}
