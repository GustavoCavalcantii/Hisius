import { Router } from "express";
import { EmployeeController } from "../controllers/EmployeeController";
import { RegisterEmployeeMiddleware } from "../middlewares/RegisterEmployeeMiddleware";
import { ValidateRequest } from "../middlewares/ValidateRequest";
import { UserDTO } from "../dtos/user/UserDto";
import JsonRequiredMiddleware from "../middlewares/JsonRequired";
import { EmployeeDto } from "../dtos/employee/EmployeeDto";
import { AuthMiddleware } from "../middlewares/AuthMiddleware";
import { ValidateRoles } from "../middlewares/ValidateRoles";
import { UserRole } from "../enums/User/UserRole";

const router = Router();

router.post(
  "/",
  RegisterEmployeeMiddleware,
  JsonRequiredMiddleware,
  ValidateRequest(UserDTO, ["create"]),
  EmployeeController.register
);

router.get(
  "/",
  AuthMiddleware,
  ValidateRoles(UserRole.ADMIN),
  ValidateRequest(EmployeeDto, ["search"]),
  EmployeeController.getEmployees
);

export default router;
