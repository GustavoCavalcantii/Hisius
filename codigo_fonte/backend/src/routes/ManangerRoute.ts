import { Router } from "express";
import JsonRequiredMiddleware from "../middlewares/JsonRequired";
import { ValidateRequest } from "../middlewares/ValidateRequest";
import { UserDTO } from "../dtos/user/UserDto";
import { ManagerController } from "../controllers/ManagerController";
import { AuthMiddleware } from "../middlewares/AuthMiddleware";

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

router.get("/hospital-info", AuthMiddleware, ManagerController.getHospitalCode);

export default router;
