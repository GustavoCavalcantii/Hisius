import { Request, Response, NextFunction } from "express";
import { ReportService } from "../service/ReportService";
import { SuccessResponse } from "../utils/Responses/SuccessResponse";

const reportService = new ReportService();

export class ReportController {
  static async getReport(req: Request, res: Response, next: NextFunction) {
    try {
      const { periodo, data } = req.query;
      
      const reportData = await reportService.getDashboardData({
        periodo: periodo as any,
        data: data as string
      });

      res.json(SuccessResponse(reportData, "Relatório gerado com sucesso", 200));
    } catch (err) {
      next(err);
    }
  }
}