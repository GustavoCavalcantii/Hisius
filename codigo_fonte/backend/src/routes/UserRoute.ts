import { Router } from "express";
import JsonRequiredMiddleware from "../middlewares/JsonRequired";
import { ValidateRequest } from "../middlewares/ValidateRequest";
import { UserDTO } from "../dtos/user/UserDto";
import { UserController } from "../controllers/UserController";
import { AuthMiddleware } from "../middlewares/AuthMiddleware";
import { UserRole } from "../enums/User/UserRole";
import { ValidateRoles } from "../middlewares/ValidateRoles";
import { UserParamsDto } from "../dtos/user/UserParamsDto";
import { LoggerMiddleware } from "../middlewares/LoggerMiddleware";

const router = Router();

router.post(
  "/",
  JsonRequiredMiddleware,
  ValidateRequest(UserDTO, ["create"]),
  UserController.register
);

router.get("/me", AuthMiddleware, UserController.getUser);

router.put(
  "/:userId",
  AuthMiddleware,
  ValidateRoles(UserRole.ADMIN),
  JsonRequiredMiddleware,
  ValidateRequest(UserParamsDto, ["role"], "params"),
  ValidateRequest(UserDTO, ["role"]),
  LoggerMiddleware({
    action: "ATUALIZAR_NIVEL_ACESSO",
    resource: "USUARIO",
  }),
  UserController.updateRole
);

router.delete("/", AuthMiddleware, UserController.deleteUser);

export default router;
