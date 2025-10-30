import { plainToInstance } from "class-transformer";
import { NextFunction, Request, Response } from "express";
import { SuccessResponse } from "../utils/responses/SuccessResponse";
import { ILogFilter } from "../interfaces/log/ILogFilter";
import { LogService } from "../service/LogService";
import { LogFilterDto } from "../dtos/log/LogFilterDto";

const logService = new LogService();

export class LogController {
  static async getLogs(req: Request, res: Response, next: NextFunction) {
    try {
      const paramDto = plainToInstance(LogFilterDto, req.query);

      const filter: ILogFilter = {
        page: paramDto.page ? Number(paramDto.page) : 0,
        limit: paramDto.limit ? Number(paramDto.limit) : 10,
        userId: paramDto.userId ? Number(paramDto.userId) : undefined,
        action: paramDto.action as string,
        module: paramDto.module as string,
      };

      const result = await logService.getLogsPaginated(filter);

      return res.json(
        SuccessResponse(result, "Logs recuperados com sucesso", 200)
      );
    } catch (err) {
      next(err);
    }
  }
}
