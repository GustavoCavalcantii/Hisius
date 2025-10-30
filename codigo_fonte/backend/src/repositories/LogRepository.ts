import { Op } from "sequelize";
import Log from "../database/models/Log";
import { ILogFilter } from "../interfaces/log/ILogFilter";
import { ILogCreate } from "../interfaces/log/ILogCreate";

export class LogRepository {
  async create(data: ILogCreate) {
    return Log.create({
      userId: data.userId,
      action: data.action,
      module: data.module,
      originIp: data.originIp,
      userAgent: data.userAgent,
    });
  }

  async findById(id: number) {
    return Log.findOne({ where: { id } });
  }

  async findByUserId(userId: number) {
    return Log.findAll({
      where: { userId },
      order: [["createdAt", "DESC"]],
    });
  }

  async findPaginated(params: ILogFilter) {
    const { offset, limit, userId, action, module } = params;
    const whereClause: any = {};

    if (userId) {
      whereClause.userId = {
        [Op.eq]: userId,
      };
    }

    if (action) {
      whereClause.action = {
        [Op.like]: `%${action}%`,
      };
    }

    if (module) {
      whereClause.module = {
        [Op.like]: `%${module}%`,
      };
    }

    const { count, rows } = await Log.findAndCountAll({
      where: whereClause,
      limit,
      offset,
      order: [["createdAt", "DESC"]],
    });

    return {
      logs: rows,
      total: count,
    };
  }
}
