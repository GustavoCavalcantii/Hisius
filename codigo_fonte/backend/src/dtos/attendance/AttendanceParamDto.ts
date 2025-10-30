import { Type } from "class-transformer";
import { IsNumber, Min } from "class-validator";

export class AttendanceParamDto {
  /**
   * ID do paciente
   */
  @Type(() => Number)
  @IsNumber(
    {},
    {
      message: "O id do paciente deve ser um número",
      groups: ["search"],
    }
  )
  @Min(1, {
    message: "O id do paciente deve ser pelo menos 1",
    groups: ["search"],
  })
  patientId: number;

  /**
   * ID do atendimento
   */
  @Type(() => Number)
  @IsNumber(
    {},
    {
      message: "O id do atendimento deve ser um número",
      groups: ["delete", "update", "get"],
    }
  )
  @Min(1, {
    message: "O id do atendimento deve ser pelo menos 1",
    groups: ["delete", "update", "get"],
  })
  attendanceId: number;
}
