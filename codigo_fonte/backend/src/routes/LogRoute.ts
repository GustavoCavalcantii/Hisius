import { Router } from "express";
import { ValidateRequest } from "../middlewares/ValidateRequest";
import { AuthMiddleware } from "../middlewares/AuthMiddleware";
import { UserRole } from "../enums/User/UserRole";
import { ValidateRoles } from "../middlewares/ValidateRoles";
import { LogFilterDto } from "../dtos/log/LogFilterDto";
import { LogController } from "../controllers/LogController";

const router = Router();

router.get(
  "/",
  AuthMiddleware,
  ValidateRoles(UserRole.ADMIN),
  ValidateRequest(LogFilterDto, undefined, "query"),
  LogController.getLogs
);

export default router;
