import { NextFunction, Request, Response } from "express";
import { ReportService } from "../service/ReportService";
import { SuccessResponse } from "../utils/responses/SuccessResponse";
import { plainToInstance } from "class-transformer";
import { ReportParamsDto } from "../dtos/report/ReportParamsDto";

const reportService = new ReportService();

export class ReportController {
  static async getReport(req: Request, res: Response, next: NextFunction) {
    try {
      const params = plainToInstance(ReportParamsDto, req.query);

      const startDateObj = new Date(
        parseInt(params.startDate.split("-")[2]),
        parseInt(params.startDate.split("-")[1]) - 1,
        parseInt(params.startDate.split("-")[0]),
        0,
        0,
        0,
        0
      );

      const endDateObj = new Date(
        parseInt(params.endDate.split("-")[2]),
        parseInt(params.endDate.split("-")[1]) - 1,
        parseInt(params.endDate.split("-")[0]),
        23,
        59,
        59,
        999
      );

      const response = await reportService.getQueueReport(
        startDateObj,
        endDateObj
      );

      return res.json(
        SuccessResponse(response, "Dados coletados com sucesso", 200)
      );
    } catch (err) {
      next(err);
    }
  }
}
