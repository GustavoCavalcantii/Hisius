import { Request, Response, NextFunction } from "express";
import { ErrorResponse } from "../utils/responses/ErrorResponse";
import Logger from "../config/Logger";
import { UniqueConstraintError, ValidationError } from "sequelize";
import { BadRequestError } from "../utils/errors/BadResquestError";
const errorHandlers = [
  {
    type: SyntaxError,
    status: 400,
    message: "JSON inválido no corpo da requisição.",
  },
  { type: UniqueConstraintError, status: 409, message: "Registro duplicado." },
  { type: ValidationError, status: 422, message: "Dados inválidos." },
];

export function ErrorMiddleware(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  for (const handler of errorHandlers) {
    if (err instanceof handler.type) {
      return res
        .status(handler.status)
        .json(ErrorResponse(handler.message, handler.status));
    }
  }

  if (err instanceof BadRequestError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
      statusCode: err.statusCode,
      errors: err.errors?.map((e) => ({ field: e.field, message: e.message })),
    });
  }

  if (err.statusCode) {
    return res
      .status(err.statusCode)
      .json(ErrorResponse(err.message, err.statusCode));
  }

  Logger.error("Erro:", err);
  if (err instanceof Error) {
    Logger.error(`Stack: ${err.stack}`);
  }

  return res.status(500).json(ErrorResponse("Erro interno do servidor.", 500));
}
