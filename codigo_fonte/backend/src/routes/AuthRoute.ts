import { Router } from "express";
import JsonRequiredMiddleware from "../middlewares/JsonRequired";
import { ValidateRequest } from "../middlewares/ValidateRequest";
import { UserDTO } from "../dtos/user/UserDto";
import { AuthController } from "../controllers/AuthController";

const router = Router();

router.post(
  "/login",
  JsonRequiredMiddleware,
  ValidateRequest(UserDTO, ["login"]),
  AuthController.login
);
export default router;
