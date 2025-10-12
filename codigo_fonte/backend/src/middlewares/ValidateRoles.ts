import { Request, Response, NextFunction } from "express";
import { UserRole } from "../enums/User/UserRole";
import { BadRequestError } from "../utils/errors/BadRequestError";

export function ValidateRoles(neededRole: UserRole) {
  return async (req: Request, _res: Response, next: NextFunction) => {
    try {
      const loggedInUser = req.user;

      if (!loggedInUser) {
        return next(new BadRequestError("Usuário não autenticado"));
      }

      if (loggedInUser.role === undefined || loggedInUser.role === null) {
        return next(new BadRequestError("Usuário sem função definida"));
      }

      const rolesHierarchy = {
        [UserRole.PATIENT]: 0,
        [UserRole.EMPLOYEE]: 1,
        [UserRole.ADMIN]: 2,
      };

      const userRoleLevel = rolesHierarchy[loggedInUser.role];
      const neededRoleLevel = rolesHierarchy[neededRole];

      if (userRoleLevel < neededRoleLevel) {
        return next(new BadRequestError("Acesso negado"));
      }

      next();
    } catch (err) {
      next(err);
    }
  };
}
