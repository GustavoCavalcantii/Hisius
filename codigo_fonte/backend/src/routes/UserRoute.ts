import { Router } from "express";
import StatusController from "../controllers/StatusController";
import JsonRequiredMiddleware from "../middlewares/JsonRequired";
import { ValidateRequest } from "../middlewares/ValidateRequest";
import { UserDTO } from "../dtos/user/UserDto";
import { UserController } from "../controllers/user/UserController";
import { SuccessResponse } from "../utils/Responses/SuccessResponse";

SuccessResponse;

const router = Router();

router.get("/", StatusController.getStatus);

router.post(
  "/users",
  JsonRequiredMiddleware,
  ValidateRequest(UserDTO, ["create"]),
  UserController.register
);
export default router;
