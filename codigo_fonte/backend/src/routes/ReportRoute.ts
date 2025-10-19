import { Router } from "express";
import { ReportController } from "../controllers/ReportController";
import { ValidateRequest } from "../middlewares/ValidateRequest";
import { ReportParamsDto } from "../dtos/report/ReportParamsDto";

const router = Router();

router.get(
  "/",
  ValidateRequest(ReportParamsDto, undefined, "query"),
  ReportController.getReport
);

export default router;
