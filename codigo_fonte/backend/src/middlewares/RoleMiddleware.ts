import { Request, Response, NextFunction } from "express";
import { ForbiddenError } from "../utils/errors/ForbiddenError";
import { UnauthorizedError } from "../utils/errors/UnauthorizedError";


export function RoleMiddleware(allowedRoles: number[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;

    if (!user) {
      return next(new UnauthorizedError("Este usuário não foi autenticado."));
    }

    const userRole = user.role;
    if (allowedRoles.includes(userRole)) {
      return next();
    } else{
      return next(new ForbiddenError("Acesso negado. Você não tem permissão para realizar esta ação."));
    }
  };
}