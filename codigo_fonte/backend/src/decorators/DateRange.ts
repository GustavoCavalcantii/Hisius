import {
  ValidationArguments,
  ValidatorConstraintInterface,
} from "class-validator";

export class IsStartDateBeforeEndDateConstraint
  implements ValidatorConstraintInterface
{
  validate(endDate: string, args: ValidationArguments) {
    const startDate = (args.object as any).startDate;

    const [startDay, startMonth, startYear] = startDate.split("-").map(Number);
    const [endDay, endMonth, endYear] = endDate.split("-").map(Number);

    const start = new Date(startYear, startMonth - 1, startDay);
    const end = new Date(endYear, endMonth - 1, endDay);

    return start <= end;
  }

  defaultMessage(args: ValidationArguments) {
    return "A data de início não pode ser maior que a data de fim";
  }
}
