import { Request, Response } from "express";
import { ReportService } from "../../service/ReportService";

const reportService = new ReportService();

export class ReportController {
  async createReport(req: Request, res: Response) {
    try {
      const { atendimento_id, tempo_medio } = req.body;
      const report = await reportService.createReport(atendimento_id, tempo_medio);
      res.status(201).json(report);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async getAllReports(req: Request, res: Response) {
    try {
      const reports = await reportService.getAllReports();
      res.json(reports);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  async getReportById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const report = await reportService.getReportById(Number(id));
      if (report) {
        res.json(report);
      } else {
        res.status(404).json({ message: "O Relatório não foi encontrado" });
      }
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async exportReport(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { format } = req.query;
      if (format !== "pdf" && format !== "csv") {
        return res.status(400).json({ message: "Formato inválido" });
      }

      const result = await reportService.exportReport(Number(id), format as "pdf" | "csv");
      res.json({ message: result });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }
}
