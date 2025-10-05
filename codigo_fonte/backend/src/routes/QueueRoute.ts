import { Router } from "express";
import { ValidateRequest } from "../middlewares/ValidateRequest";
import { AuthMiddleware } from "../middlewares/AuthMiddleware";
import { QueueController } from "../controllers/QueueController";
import { QueueDto } from "../dtos/queue/QueueDto";
import { QueueParamsDto } from "../dtos/queue/QueueParamsDto";

const router = Router();

router.post("/join", AuthMiddleware, QueueController.queueJoin);

router.delete("/leave", AuthMiddleware, QueueController.queueLeave);

router.get(
  "/:type",
  ValidateRequest(QueueParamsDto, undefined, "params"),
  ValidateRequest(QueueDto, undefined, "query"),
  QueueController.getPatientsByQueue
);


export default router;
