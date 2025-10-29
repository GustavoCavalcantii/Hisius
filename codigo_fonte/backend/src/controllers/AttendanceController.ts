import { plainToInstance } from "class-transformer";
import { NextFunction, Request, Response } from "express";
import { SuccessResponse } from "../utils/responses/SuccessResponse";
import { AttendanceService } from "../service/AttendanceService";
import { AttendanceQueryDto } from "../dtos/attendance/AttendanceQueryDto";
import { AttendanceParamDto } from "../dtos/attendance/AttendanceParamDto";

const attendanceService = new AttendanceService();

export class AttendanceController {
  static async getAttendance(req: Request, res: Response, next: NextFunction) {
    try {
      const queryDto = plainToInstance(AttendanceQueryDto, req.query);
      const paramDto = plainToInstance(AttendanceParamDto, req.params);

      const attendances = await attendanceService.getPaginated({
        page: queryDto.page,
        limit: queryDto.limit,
        patientId: paramDto.patientId,
      });
      res
        .status(200)
        .json(
          SuccessResponse(
            attendances,
            "Atendimentos capturados com sucesso",
            200
          )
        );
    } catch (err) {
      next(err);
    }
  }
}
