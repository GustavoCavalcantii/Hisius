import { IsEnum, IsNumber, Min } from "class-validator";
import { QueueType } from "../../enums/Queue/QueueType";
import { Type } from "class-transformer";

export class QueueParamsDto {
  /**
   * Tipo da fila de atendimento
   * Valores válidos: 'triage' ou 'treatment'
   */
  @IsEnum(QueueType, {
    message:
      "O tipo da fila informado não é válido. Deve ser 'triage' ou 'treatment'.",
    groups: ["search"],
  })
  type: QueueType;

  /**
   * ID do paciente
   */
  @Type(() => Number)
  @IsNumber(
    {},
    { message: "O parâmetro 'patientId' deve ser um número", groups: ["next"] }
  )
  @Min(1, {
    message: "O 'patientId' deve ser maior que zero",
    groups: ["next"],
  })
  patientId: number;
}
