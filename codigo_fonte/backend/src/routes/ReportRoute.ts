import { Router, Request, Response, NextFunction } from "express"; 
import { ReportController } from "../controllers/ReportController";
import { AuthMiddleware } from "../middlewares/AuthMiddleware";
import { ForbiddenError } from "../utils/errors/ForbiddenError"; 

const router = Router();

/**
 * Middleware customizado que permite o acesso apenas para Admins (0) e Funcionários (1).
 */
const allowAdminOrEmployee = (req: Request, res: Response, next: NextFunction) => {
  const user = req.user;

  // Se o user.role for 0 OU 1, permite o acesso.
  if (user && (user.role === 0 || user.role === 1)) {
    return next(); 
  }

  return next(new ForbiddenError("Acesso negado. Apenas administradores e funcionários podem ver os relatórios."));
};


router.get(
  "/",
  AuthMiddleware,
  allowAdminOrEmployee,
  ReportController.getReport
);

export default router;