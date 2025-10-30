import { Router } from "express";
import { ValidateRequest } from "../middlewares/ValidateRequest";
import { AuthMiddleware } from "../middlewares/AuthMiddleware";
import { ValidateRoles } from "../middlewares/ValidateRoles";
import { UserRole } from "../enums/User/UserRole";
import { AttendanceQueryDto } from "../dtos/attendance/AttendanceQueryDto";
import { AttendanceParamDto } from "../dtos/attendance/AttendanceParamDto";
import { AttendanceController } from "../controllers/AttendanceController";
import { AttendanceDto } from "../dtos/attendance/AttendanceDto";

const router = Router();

router.get(
  "/patient/:patientId",
  AuthMiddleware,
  ValidateRoles(UserRole.ADMIN),
  ValidateRequest(AttendanceQueryDto, ["search"], "query"),
  ValidateRequest(AttendanceParamDto, ["search"], "params"),
  AttendanceController.getAttendances
);

router.get(
  "/:attendanceId",
  AuthMiddleware,
  ValidateRoles(UserRole.ADMIN),
  ValidateRequest(AttendanceParamDto, ["get"], "params"),
  AttendanceController.getAttendance
);

router.delete(
  "/:attendanceId",
  AuthMiddleware,
  ValidateRoles(UserRole.ADMIN),
  ValidateRequest(AttendanceParamDto, ["delete"], "params"),
  AttendanceController.deleteAttendance
);

router.put(
  "/:attendanceId",
  AuthMiddleware,
  ValidateRoles(UserRole.ADMIN),
  ValidateRequest(AttendanceDto, ["update"]),
  ValidateRequest(AttendanceParamDto, ["update"], "params"),
  AttendanceController.update
);

export default router;
