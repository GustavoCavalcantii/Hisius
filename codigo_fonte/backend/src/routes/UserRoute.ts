import { Router } from "express";
import StatusController from "../controllers/StatusController";
import JsonRequiredMiddleware from "../middlewares/JsonRequired";
import { ValidateRequest } from "../middlewares/ValidateRequest";
import { UserDTO } from "../dtos/user/UserDto";
import { UserController } from "../controllers/UserController";
import { AuthMiddleware } from "../middlewares/AuthMiddleware";
import User from "../database/models/User";

const router = Router();

router.get("/", StatusController.getStatus);

router.post(
  "/",
  JsonRequiredMiddleware,
  ValidateRequest(UserDTO, ["create"]),
  UserController.register
);

router.post(
  "/reset-password",
  JsonRequiredMiddleware,
  ValidateRequest(UserDTO, ["reset"]),
  UserController.requestReset
);

router.get(
  "/recover-password",
  ValidateRequest(UserDTO, ["reset"]),
  AuthMiddleware,
  UserController.requestReset
);

router.delete("/", AuthMiddleware, UserController.deleteUser);

export default router;
