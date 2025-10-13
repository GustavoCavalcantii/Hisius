import { validate } from "class-validator";
import { Request, Response, NextFunction } from "express";
import { plainToInstance } from "class-transformer";
import { ErrorResponse } from "../utils/responses/ErrorResponse";

export function ValidateRequest<T extends object>(
  dtoClass: new () => T,
  groups?: string[],
  source: "body" | "query" | "params" = "body"
) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const data = req[source];
    const dtoInstance = plainToInstance(dtoClass, data);

    const errors = await validate(dtoInstance, { groups });

    if (errors.length > 0) {
      const errorDetails = errors.flatMap((error) =>
        Object.entries(error.constraints || {}).map(([_, message]) => ({
          field: error.property,
          message,
        }))
      );

      res
        .status(400)
        .json(ErrorResponse("Requisição inválida", 400, errorDetails));
      return;
    }

    next();
  };
}
