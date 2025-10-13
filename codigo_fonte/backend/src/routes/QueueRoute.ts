import { Router } from "express";
import { ValidateRequest } from "../middlewares/ValidateRequest";
import { AuthMiddleware } from "../middlewares/AuthMiddleware";
import { QueueController } from "../controllers/QueueController";
import { QueueDto } from "../dtos/queue/QueueDto";
import { QueueParamsDto } from "../dtos/queue/QueueParamsDto";
import JsonRequiredMiddleware from "../middlewares/JsonRequired";
import { ValidateRoles } from "../middlewares/ValidateRoles";
import { UserRole } from "../enums/User/UserRole";

const router = Router();

router.post("/join", AuthMiddleware, QueueController.queueJoin);

router.delete("/leave", AuthMiddleware, QueueController.queueLeave);

router.post(
  "/:type/call-next",
  AuthMiddleware,
  ValidateRoles(UserRole.EMPLOYEE),
  JsonRequiredMiddleware,
  ValidateRequest(QueueDto, ["next-patient"]),
  ValidateRequest(QueueParamsDto, ["search"], "params"),
  QueueController.getNextPatient
);

router.put(
  "/:patientId",
  AuthMiddleware,
  ValidateRoles(UserRole.EMPLOYEE),
  JsonRequiredMiddleware,
  ValidateRequest(QueueParamsDto, ["next"], "params"),
  ValidateRequest(QueueDto, ["next"], "body"),
  QueueController.updateQueueClassification
);

router.put(
  "/:patientId/next",
  AuthMiddleware,
  ValidateRoles(UserRole.EMPLOYEE),
  JsonRequiredMiddleware,
  ValidateRequest(QueueParamsDto, ["next"], "params"),
  ValidateRequest(QueueDto, ["next"], "body"),
  QueueController.moveToNextQueue
);

router.get("/me", AuthMiddleware, QueueController.getSelfInfo);

router.delete(
  "/:patientId/finish",
  AuthMiddleware,
  ValidateRoles(UserRole.EMPLOYEE),
  ValidateRequest(QueueParamsDto, ["next"], "params"),
  QueueController.finishTreatment
);

router.get(
  "/:type/patients",
  AuthMiddleware,
  ValidateRoles(UserRole.EMPLOYEE),
  ValidateRequest(QueueParamsDto, ["search"], "params"),
  ValidateRequest(QueueDto, ["search"], "query"),
  QueueController.getPatientsByQueue
);

export default router;
