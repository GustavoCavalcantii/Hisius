import { NextFunction, Request, Response } from "express";
import { ILoggerOptions } from "../interfaces/logger/ILoggerOptions";
import Logger from "../config/Logger";
import { LogService } from "../service/LogService";

export function LoggerMiddleware(
  options: ILoggerOptions
): (req: Request, res: Response, next: NextFunction) => void {
  return (req: Request, res: Response, next: NextFunction) => {
    res.on("finish", async () => {
      try {
        if (res.statusCode < 400) {
          const logService = new LogService();
          const actionWithMetadata = `${options.action} - ${req.method} ${req.path}`;

          await logService.createLog({
            userId: (req as any).user?.id || null,
            action: actionWithMetadata,
            module: options.resource,
            originIp: req.ip,
            userAgent: req.get("User-Agent") || "",
          });
        }
      } catch (error) {
        Logger.error("Erro ao registrar log:", error);
      }
    });

    next();
  };
}
