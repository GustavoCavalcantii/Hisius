import { Request, Response, NextFunction } from "express";
import { ErrorResponse } from "../utils/Responses/ErrorResponse";
import Logger from "../config/Logger";

const errorResponses: Record<string, { status: number; message: string }> = {
  UniqueConstraintError: { status: 409, message: "Registro duplicado." },
  ValidationError: { status: 422, message: "Dados inválidos." },
};

export function ErrorMiddleware(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  Logger.error("Erro:", err);

  if (err instanceof Error) {
    const config = errorResponses[err.constructor.name];
    if (config) {
      return res
        .status(config.status)
        .json(ErrorResponse(config.message, config.status));
    }
  }

  return res.status(500).json(ErrorResponse("Erro interno do servidor.", 500));
}
