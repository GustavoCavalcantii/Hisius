import { Matches, IsString, Validate } from "class-validator";
import { IsStartDateBeforeEndDateConstraint } from "../../decorators/DateRange";

export class ReportParamsDto {
  /**
   * Data de início para o relatório (formato DD-MM-YYYY)
   * Exemplo: 25-10-2005
   */
  @IsString({ message: "A data de início deve ser uma string" })
  @Matches(/^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[0-2])-\d{4}$/, {
    message:
      "A data de início deve estar no formato DD-MM-YYYY (ex: 25-10-2005)",
  })
  startDate: string;

  /**
   * Data de fim para o relatório (formato DD-MM-YYYY)
   * Exemplo: 25-10-2005
   */
  @IsString({ message: "A data de fim deve ser uma string" })
  @Matches(/^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[0-2])-\d{4}$/, {
    message: "A data de fim deve estar no formato DD-MM-YYYY (ex: 25-10-2005)",
  })
  @Validate(IsStartDateBeforeEndDateConstraint)
  endDate: string;
}
