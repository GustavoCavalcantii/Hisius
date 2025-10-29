import { Router } from "express";
import { ValidateRequest } from "../middlewares/ValidateRequest";
import { AuthMiddleware } from "../middlewares/AuthMiddleware";
import { ValidateRoles } from "../middlewares/ValidateRoles";
import { UserRole } from "../enums/User/UserRole";
import { AttendanceQueryDto } from "../dtos/attendance/AttendanceQueryDto";
import { AttendanceParamDto } from "../dtos/attendance/AttendanceParamDto";
import { AttendanceController } from "../controllers/AttendanceController";

const router = Router();

router.get(
  "/:patientId",
  AuthMiddleware,
  ValidateRoles(UserRole.ADMIN),
  ValidateRequest(AttendanceQueryDto, ["search"], "query"),
  ValidateRequest(AttendanceParamDto, ["search"], "params"),
  AttendanceController.getAttendance
);

export default router;
