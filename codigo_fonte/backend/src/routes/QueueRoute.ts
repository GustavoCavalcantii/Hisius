import { Router } from "express";
import { AuthMiddleware } from "../middlewares/AuthMiddleware";
import { QueueController } from "../controllers/QueueController";

const router = Router();

router.post("/join", AuthMiddleware, QueueController.queueJoin);

export default router;
