import { IsEnum } from "class-validator";
import { QueueType } from "../../enums/Queue/QueueType";

export class QueueParamsDto {
  @IsEnum(QueueType, {
    message: "O tipo da fila deve ser 'triage' ou 'treatment'",
  })
  type: QueueType;
}
