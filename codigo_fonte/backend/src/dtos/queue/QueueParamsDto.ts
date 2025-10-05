import { IsEnum, IsNumber } from "class-validator";
import { QueueType } from "../../enums/Queue/QueueType";
import { Type } from "class-transformer";

export class QueueParamsDto {
  @IsEnum(QueueType, {
    message: "O tipo da fila deve ser 'triage' ou 'treatment'",
    groups: ["search"],
  })
  type: QueueType;

  @Type(() => Number)
  @IsNumber(
    {},
    { message: "O parâmetro limit deve ser um número", groups: ["next"] }
  )
  patientId: number;
}
