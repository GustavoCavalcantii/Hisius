import { Router } from "express";
import StatusController from "../controllers/StatusController";
import JsonRequiredMiddleware from "../middlewares/JsonRequired";
import { ValidateRequest } from "../middlewares/ValidateRequest";
import { UserDTO } from "../dtos/user/UserDto";
import { UserController } from "../controllers/UserController";
import { AuthMiddleware } from "../middlewares/AuthMiddleware";
import { UserRole } from "../enums/User/UserRole";
import { ValidateRoles } from "../middlewares/ValidateRoles";
import { UserParamsDto } from "../dtos/user/UserParamsDto";

const router = Router();

router.get("/", StatusController.getStatus);

router.post(
  "/",
  JsonRequiredMiddleware,
  ValidateRequest(UserDTO, ["create"]),
  UserController.register
);

router.put(
  "/:userId",
  AuthMiddleware,
  ValidateRoles(UserRole.ADMIN),
  JsonRequiredMiddleware,
  ValidateRequest(UserParamsDto, ["role"], "params"),
  ValidateRequest(UserDTO, ["role"]),
  UserController.updateRole
);

router.delete("/", AuthMiddleware, UserController.deleteUser);

export default router;
