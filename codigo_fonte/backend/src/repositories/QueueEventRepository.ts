import QueueEvent from "../database/models/QueueEvent";
import { QueueType } from "../enums/Queue/QueueType";
import { QueueTypePT } from "../enums/Queue/QueueTypePT";
import {
  IAvgWait,
  ICreateQueueEventInput,
} from "../interfaces/queue/ICreateQueueEventInput";
import { Op, QueryTypes } from "sequelize";

export class QueueEventRepository {
  async create(queue: QueueType, data: ICreateQueueEventInput) {
    const queueName = QueueTypePT[queue as QueueType];

    return await QueueEvent.create({
      queueId: data.queueId,
      queue: queueName.toLowerCase(),
      patientId: data.patientId,
      enteredAt: data.enteredAt,
      startedAt: data.startedAt,
    });
  }

  async getAverageWaitTimeByQueue(
    queue: QueueType,
    startDate?: Date,
    endDate?: Date
  ) {
    const whereClause: any = {
      queue: QueueTypePT[queue],
      startedAt: { [Op.not]: null },
    };

    if (startDate && endDate) {
      whereClause.enteredAt = { [Op.between]: [startDate, endDate] };
    }

    const result = (await QueueEvent.findOne({
      where: whereClause,
      attributes: [
        [
          QueueEvent.sequelize!.literal(
            `ROUND(AVG(TIMESTAMPDIFF(SECOND, enteredAt, startedAt)))`
          ),
          "avgWaitSeconds",
        ],
      ],
      raw: true,
    })) as IAvgWait | null;

    return result?.avgWaitSeconds ?? 0;
  }

  async findById(id: string) {
    return QueueEvent.findByPk(id);
  }

  async findByQueueId(queueId: string) {
    return QueueEvent.findOne({ where: { queueId } });
  }

  async findByPatientId(patientId: string) {
    return QueueEvent.findAll({ where: { patientId } });
  }

  async findByQueue(queue: "triagem" | "atendimento") {
    return QueueEvent.findAll({ where: { queue } });
  }

  async findByDateRange(startDate: Date, endDate: Date) {
    return QueueEvent.findAll({
      where: {
        enteredAt: {
          [Op.between]: [startDate, endDate],
        },
      },
      order: [["entrou_em", "ASC"]],
    });
  }

  async getPeakDemandByWeek(startDate: Date, endDate: Date) {
    const result = await QueueEvent.sequelize!.query(
      `
          SELECT 
              DATE_FORMAT(entrou_em, '%a') as day,
              COUNT(*) as total_entries
          FROM fila_eventos 
          WHERE entrou_em BETWEEN ? AND ?
          GROUP BY DATE_FORMAT(entrou_em, '%a')
      `,
      {
        replacements: [startDate, endDate],
        type: QueryTypes.SELECT,
      }
    );

    const dayMap: Record<string, string> = {
      Sun: "DOM",
      Mon: "SEG",
      Tue: "TER",
      Wed: "QUA",
      Thu: "QUI",
      Fri: "SEX",
      Sat: "SAB",
    };

    return (result as any[]).reduce(
      (acc, row) => ({
        ...acc,
        [dayMap[row.day] || row.day]: Number(row.total_entries),
      }),
      {}
    );
  }

  async getMostFrequentWaitTimes(startDate: Date, endDate: Date) {
    const result = await QueueEvent.sequelize!.query(
      `
        WITH wait_times AS (
          SELECT 
              fila AS queue,
              ROUND(TIMESTAMPDIFF(SECOND, entrou_em, iniciou_em)) AS wait_time_seconds,
              COUNT(*) AS frequency
          FROM fila_eventos 
          WHERE entrou_em BETWEEN ? AND ?
          AND iniciou_em IS NOT NULL
          GROUP BY fila, ROUND(TIMESTAMPDIFF(SECOND, entrou_em, iniciou_em))
        )
        SELECT queue, wait_time_seconds, frequency
        FROM wait_times 
        ORDER BY frequency DESC
        LIMIT 5
      `,
      {
        replacements: [startDate, endDate],
        type: QueryTypes.SELECT,
      }
    );

    return (result as any[]).reduce(
      (acc, row) => {
        const queueKey = row.queue.toLowerCase();
        const item = {
          averageWaitTime:
            row.wait_time_seconds !== null
              ? Number(row.wait_time_seconds)
              : null,
          count: row.frequency !== null ? Number(row.frequency) : null,
        };
        return {
          ...acc,
          [queueKey]: [...(acc[queueKey] || []), item],
        };
      },
      { atendimento: [], triagem: [] }
    );
  }

  async getPatientJourney(patientId: string) {
    return QueueEvent.findAll({
      where: { patientId },
      order: [["entrou_em", "ASC"]],
    });
  }

  async update(id: string, data: Partial<ICreateQueueEventInput>) {
    const record = await QueueEvent.findByPk(id);
    return record?.update(data) || null;
  }

  async delete(id: string) {
    return QueueEvent.destroy({ where: { id } });
  }
}

export default QueueEventRepository;
