import { Router } from "express";
import { EmployeeController } from "../controllers/EmployeeController";
import { RegisterEmployeeMiddleware } from "../middlewares/RegisterEmployeeMiddleware";
import { ValidateRequest } from "../middlewares/ValidateRequest";
import { UserDTO } from "../dtos/user/UserDto";
import JsonRequiredMiddleware from "../middlewares/JsonRequired";

const router = Router();

router.post(
  "/",
  RegisterEmployeeMiddleware,
  JsonRequiredMiddleware,
  ValidateRequest(UserDTO, ["create"]),
  EmployeeController.register
);

export default router;
