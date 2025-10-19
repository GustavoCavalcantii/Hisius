import { QueueType } from "../enums/Queue/QueueType";
import { ICreateQueueEventInput } from "../interfaces/queue/ICreateQueueEventInput";
import { IReportResponse } from "../interfaces/report/IReportResponse";
import QueueEventRepository from "../repositories/QueueEventRepository";
import { BadRequestError } from "../utils/errors/BadRequestError";

export class QueueEventService {
  private queueEventRepo = new QueueEventRepository();

  async create(queue: QueueType, data: ICreateQueueEventInput) {
    this.queueEventRepo.create(queue, data);
  }

  async update(queueId: string, exitDate: Date) {
    const event = await this.queueEventRepo.findByQueueId(queueId);
    if (!event) throw new BadRequestError("Paciente não encontrado na fila");
    event.startedAt = exitDate;
    return await event.save();
  }

  async getQueueAvgTime(queue: QueueType) {
    return await this.queueEventRepo.getAverageWaitTimeByQueue(queue);
  }

  async getQueueEventInfo(
    startDate: Date,
    endDate: Date
  ): Promise<IReportResponse> {
    const [peakDemand, frequentTimes] = await Promise.all([
      this.queueEventRepo.getPeakDemandByWeek(startDate, endDate),
      this.queueEventRepo.getMostFrequentWaitTimes(startDate, endDate),
    ]);

    return {
      avgTimeTreatmentInSec: frequentTimes.atendimento,
      avgTimeTriageInSec: frequentTimes.triagem,
      peakDemand,
    };
  }
}
