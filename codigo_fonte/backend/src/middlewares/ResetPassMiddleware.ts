import { Request, Response, NextFunction } from "express";
import { BadRequestError } from "../utils/errors/BadResquestError";
import { ForbiddenError } from "../utils/errors/ForbiddenError";
import { TokenUtils } from "../utils/TokenUtils";
import { TokenType } from "../enums/Token/TokenTypes";

var tokenUtils = new TokenUtils();

export async function ResetPassMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = getBearerToken(req);
  if (!token) return next(new BadRequestError("Token ausente"));

  try {
    const payload = tokenUtils.validateResetPassToken(token);

    if (payload.type !== TokenType.RESET_PASS) {
      throw new BadRequestError("Token inválido");
    }

    req.user = { id: payload.id };

    next();
  } catch {
    next(new ForbiddenError("Token inválido"));
  }
}

function getBearerToken(req: Request): string | null {
  const header = req.headers["authorization"];
  if (!header) return null;

  const parts = header.split(" ");
  if (parts.length !== 2) return null;

  const [scheme, token] = parts;
  if (scheme !== "Bearer") return null;

  return token;
}
