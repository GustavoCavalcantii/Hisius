import { Router } from "express";
import StatusController from "../controllers/StatusController";
import JsonRequiredMiddleware from "../middlewares/JsonRequired";
import { ValidateRequest } from "../middlewares/ValidateRequest";
import { UserDTO } from "../dtos/user/UserDto";
import { UserController } from "../controllers/UserController";
import { AuthMiddleware } from "../middlewares/AuthMiddleware";

const router = Router();

router.get("/", StatusController.getStatus);

router.post(
  "/",
  JsonRequiredMiddleware,
  ValidateRequest(UserDTO, ["create"]),
  UserController.register
);

router.delete("/", AuthMiddleware, UserController.deleteUser);

export default router;
