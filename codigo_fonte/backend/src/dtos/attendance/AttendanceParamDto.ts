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
      message: "O patientId deve ser um número",
      groups: ["create", "update", "search"],
    }
  )
  @Min(1, {
    message: "O patientId deve ser pelo menos 1",
    groups: ["create", "update", "search"],
  })
  patientId: number;
}
