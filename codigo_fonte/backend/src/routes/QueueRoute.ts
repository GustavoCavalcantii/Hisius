import { Router } from "express";
import { ValidateRequest } from "../middlewares/ValidateRequest";
import { AuthMiddleware } from "../middlewares/AuthMiddleware";
import { QueueController } from "../controllers/QueueController";
import { QueueDto } from "../dtos/queue/QueueDto";
import { QueueParamsDto } from "../dtos/queue/QueueParamsDto";
import JsonRequiredMiddleware from "../middlewares/JsonRequired";
import { ValidateRoles } from "../middlewares/ValidateRoles";
import { UserRole } from "../enums/User/UserRole";
import { LoggerMiddleware } from "../middlewares/LoggerMiddleware";
import { EnterQueueDto } from "../dtos/queue/EnterQueueDto";

const router = Router();

router.post(
  "/join",
  AuthMiddleware,
  ValidateRequest(EnterQueueDto),
  QueueController.queueJoin
);

router.delete("/leave", AuthMiddleware, QueueController.queueLeave);

router.post(
  "/:type/call-next",
  AuthMiddleware,
  ValidateRoles(UserRole.EMPLOYEE),
  JsonRequiredMiddleware,
  ValidateRequest(QueueDto, ["next-patient"]),
  ValidateRequest(QueueParamsDto, ["search"], "params"),
  LoggerMiddleware({
    action: "CHAMAR_PROXIMO_PACIENTE",
    resource: "FILA",
  }),
  QueueController.getNextPatient
);

router.put(
  "/:patientId",
  AuthMiddleware,
  ValidateRoles(UserRole.EMPLOYEE),
  JsonRequiredMiddleware,
  ValidateRequest(QueueParamsDto, ["next"], "params"),
  ValidateRequest(QueueDto, ["next"], "body"),
  LoggerMiddleware({
    action: "ATUALIZAR_CLASSIFICACAO_FILA",
    resource: "FILA",
  }),
  QueueController.updateQueueClassification
);

router.put(
  "/:patientId/next",
  AuthMiddleware,
  ValidateRoles(UserRole.EMPLOYEE),
  JsonRequiredMiddleware,
  ValidateRequest(QueueParamsDto, ["next"], "params"),
  ValidateRequest(QueueDto, ["next"], "body"),
  LoggerMiddleware({
    action: "MOVER_PARA_PROXIMA_FILA",
    resource: "FILA",
  }),
  QueueController.moveToNextQueue
);

router.get(
  "/:type/count",
  AuthMiddleware,
  ValidateRoles(UserRole.ADMIN),
  ValidateRequest(QueueParamsDto, ["search"], "params"),
  QueueController.getQueueCount
);

router.get("/me", AuthMiddleware, QueueController.getSelfInfo);

router.get(
  "/:type/called",
  AuthMiddleware,
  ValidateRoles(UserRole.EMPLOYEE),
  ValidateRequest(QueueParamsDto, ["search"], "params"),
  QueueController.getLastCalledPatients
);

router.delete(
  "/:patientId/finish",
  AuthMiddleware,
  ValidateRoles(UserRole.EMPLOYEE),
  ValidateRequest(QueueParamsDto, ["next"], "params"),
  LoggerMiddleware({
    action: "FINALIZAR_ATENDIMENTO",
    resource: "FILA",
  }),
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

router.get(
  "/:type/room",
  AuthMiddleware,
  ValidateRoles(UserRole.EMPLOYEE),
  ValidateRequest(QueueParamsDto, ["search"], "params"),
  ValidateRequest(QueueDto, ["search"], "query"),
  QueueController.getPatientsByRoom
);

export default router;
