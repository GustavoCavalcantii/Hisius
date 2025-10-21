import { Router } from "express";
import JsonRequiredMiddleware from "../middlewares/JsonRequired";
import { ValidateRequest } from "../middlewares/ValidateRequest";
import { UserDTO } from "../dtos/user/UserDto";
import { ManagerController } from "../controllers/ManagerController";
import { AuthMiddleware } from "../middlewares/AuthMiddleware";
import { ValidateRoles } from "../middlewares/ValidateRoles";
import { UserRole } from "../enums/User/UserRole";
import { ManagerDto } from "../dtos/manager/ManagerDto";

const router = Router();

router.post(
  "/",
  JsonRequiredMiddleware,
  ValidateRequest(UserDTO, ["create"]),
  ManagerController.register
);

router.post(
  "/staff-code",
  AuthMiddleware,
  ManagerController.generateAddEmployeToken
);

router.get(
  "/",
  AuthMiddleware,
  ValidateRoles(UserRole.ADMIN),
  ValidateRequest(ManagerDto, ["search"]),
  ManagerController.getManagers
);

router.get("/hospital-info", AuthMiddleware, ManagerController.getHospitalCode);

export default router;
