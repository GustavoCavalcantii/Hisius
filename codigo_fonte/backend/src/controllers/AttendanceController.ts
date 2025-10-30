import { plainToInstance } from "class-transformer";
import { NextFunction, Request, Response } from "express";
import { SuccessResponse } from "../utils/responses/SuccessResponse";
import { AttendanceService } from "../service/AttendanceService";
import { AttendanceQueryDto } from "../dtos/attendance/AttendanceQueryDto";
import { AttendanceParamDto } from "../dtos/attendance/AttendanceParamDto";
import { AttendanceDto } from "../dtos/attendance/AttendanceDto";

const attendanceService = new AttendanceService();

export class AttendanceController {
  static async getAttendances(req: Request, res: Response, next: NextFunction) {
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
            "Registro de atendimentos capturados com sucesso",
            200
          )
        );
    } catch (err) {
      next(err);
    }
  }

  static async getAttendance(req: Request, res: Response, next: NextFunction) {
    try {
      const paramDto = plainToInstance(AttendanceParamDto, req.params);

      const attendance = await attendanceService.getById(paramDto.attendanceId);
      res
        .status(200)
        .json(
          SuccessResponse(
            attendance,
            "Registro de atendimento capturado com sucesso",
            200
          )
        );
    } catch (err) {
      next(err);
    }
  }

  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const dto = plainToInstance(AttendanceDto, req.body);
      const paramDto = plainToInstance(AttendanceParamDto, req.params);

      await attendanceService.update(dto, paramDto.attendanceId);
      res
        .status(200)
        .json(SuccessResponse(null, "Registro de atendimento atualizado", 200));
    } catch (err) {
      next(err);
    }
  }

  static async deleteAttendance(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const paramDto = plainToInstance(AttendanceParamDto, req.params);

      await attendanceService.delete(paramDto.attendanceId);
      res
        .status(200)
        .json(SuccessResponse(null, "Registro de atendimento deletado", 200));
    } catch (err) {
      next(err);
    }
  }
}
