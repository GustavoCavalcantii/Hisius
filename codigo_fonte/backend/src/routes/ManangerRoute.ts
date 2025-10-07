import { Router } from "express";
import JsonRequiredMiddleware from "../middlewares/JsonRequired";
import { ValidateRequest } from "../middlewares/ValidateRequest";
import { UserDTO } from "../dtos/user/UserDto";
import { ManagerController } from "../controllers/ManagerController";

const router = Router();

router.post(
  "/",
  JsonRequiredMiddleware,
  ValidateRequest(UserDTO, ["create"]),
  ManagerController.register
);

export default router;
