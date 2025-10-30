import { ILog } from "../interfaces/log/ILog";
import { ILogCreate } from "../interfaces/log/ILogCreate";
import { ILogFilter } from "../interfaces/log/ILogFilter";
import { IPagination } from "../interfaces/queue/IPagination";
import { LogRepository } from "../repositories/LogRepository";
import { BadRequestError } from "../utils/errors/BadRequestError";
import { NotFoundError } from "../utils/errors/NotFoundError";

export class LogService {
  private logRepo = new LogRepository();

  private sanitizeLog(log: any): ILog | null {
    if (!log) return null;

    return {
      id: log.id,
      userId: log.userId,
      action: log.action,
      module: log.module,
      originIp: log.originIp,
      userAgent: log.userAgent,
      createdAt: log.createdAt,
    };
  }

  async getLogsPaginated(
    queryParams: ILogFilter
  ): Promise<{ logs: ILog[] | null; pagination: IPagination }> {
    const { page = 0, limit = 10, userId, action, module } = queryParams;

    const offset = page * limit;

    const result = await this.logRepo.findPaginated({
      offset,
      limit,
      userId,
      action,
      module,
    });

    const totalPages = Math.ceil(result.total / limit);
    const hasNext = page < totalPages - 1;
    const hasPrev = page > 0;

    const sanitizedLogs = result.logs
      .map((log) => this.sanitizeLog(log))
      .filter((log): log is ILog => log !== null);

    return {
      logs: sanitizedLogs,
      pagination: {
        currentPage: page,
        totalPages,
        totalItems: result.total,
        itemsPerPage: limit,
        hasNext,
        hasPrev,
        nextPage: hasNext ? page + 1 : null,
        prevPage: hasPrev ? page - 1 : null,
      },
    };
  }

  async getLogById(id: number): Promise<ILog> {
    const log = await this.logRepo.findById(id);
    if (!log) throw new NotFoundError("Registro não encontrado");

    const sanitizedLog = this.sanitizeLog(log);
    if (!sanitizedLog) throw new NotFoundError("Registro não encontrado");

    return sanitizedLog;
  }

  async getLogByUserId(userId: number): Promise<ILog[]> {
    const logs = await this.logRepo.findByUserId(userId);

    const sanitizedLogs = logs
      .map((log) => this.sanitizeLog(log))
      .filter((log): log is ILog => log !== null);

    return sanitizedLogs;
  }

  async createLog(input: ILogCreate): Promise<ILog> {
    const log = await this.logRepo.create(input);

    const sanitizedLog = this.sanitizeLog(log);
    if (!sanitizedLog) throw new BadRequestError("Erro ao criar registro");

    return sanitizedLog;
  }

  async logUserAction(
    userId: number,
    action: string,
    module: string,
    originIp?: string,
    userAgent?: string
  ): Promise<ILog> {
    return this.createLog({
      userId,
      action,
      module,
      originIp: originIp || null,
      userAgent: userAgent || null,
    });
  }
}
