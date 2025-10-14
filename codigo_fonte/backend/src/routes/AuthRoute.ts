import { Router } from "express";
import JsonRequiredMiddleware from "../middlewares/JsonRequired";
import { ValidateRequest } from "../middlewares/ValidateRequest";
import { UserDTO } from "../dtos/user/UserDto";
import { AuthController } from "../controllers/AuthController";
import { ResetPassMiddleware } from "../middlewares/ResetPassMiddleware";
import { ResetEmailMiddleware } from "../middlewares/ResetEmailMiddleware";
import { AuthMiddleware } from "../middlewares/AuthMiddleware";
import BruteForceProtection from "../middlewares/BruteForceProtection";

const router = Router();

router.post(
  "/login",
  JsonRequiredMiddleware,
  ValidateRequest(UserDTO, ["login"]),
  BruteForceProtection,
  AuthController.login
);

router.post(
  "/change-email-request",
  JsonRequiredMiddleware,
  AuthMiddleware,
  ValidateRequest(UserDTO, ["changeEmail"]),
  AuthController.requestEmail
);

router.put(
  "/confirm-change-email",
  ResetEmailMiddleware,
  AuthController.changeEmail
);

router.post(
  "/forgot-password",
  JsonRequiredMiddleware,
  ValidateRequest(UserDTO, ["forgot"]),
  AuthController.requestResetPassword
);

router.put(
  "/recover-password",
  ValidateRequest(UserDTO, ["reset"]),
  ResetPassMiddleware,
  AuthController.recoverPassword
);

router.post("/refresh", AuthController.refresh);

router.delete("/refresh-token", AuthController.logout);

export default router;
