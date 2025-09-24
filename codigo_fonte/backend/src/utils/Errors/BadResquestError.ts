import { IFieldError } from "../../interfaces/auth/IFieldError";

export class BadRequestError extends Error {
  statusCode: number;
  errors?: IFieldError[];

  constructor(message: string, errors?: IFieldError[]) {
    super(message);
    this.name = "BadRequestError";
    this.statusCode = 400;
    if (errors) this.errors = errors;
  }
}