import { QueueType } from "../enums/Queue/QueueType";
import { ICreateQueueEventInput } from "../interfaces/queue/ICreateQueueEventInput";
import { IReportResponse } from "../interfaces/report/IReportResponse";
import { QueueEventService } from "./QueueEventService";

export class ReportService {
  private queueEventService = new QueueEventService();

  async createEvent(queue: QueueType, data: ICreateQueueEventInput) {
    this.queueEventService.create(queue, data);
  }

  async updateExit(queueId: string, exitDate: Date) {
    return await this.queueEventService.update(queueId, exitDate);
  }

  async getAvgTimeByQueue(queue: QueueType) {
    return await this.queueEventService.getQueueAvgTime(queue);
  }

  async getQueueReport(
    startDate: Date,
    endDate: Date
  ): Promise<IReportResponse> {
    const event = await this.queueEventService.getQueueEventInfo(
      startDate,
      endDate
    );

    if (event.peakDemand && Object.keys(event.peakDemand).length > 0)
      return event;

    return {
      avgTimeTreatmentInSec: [],
      avgTimeTriageInSec: [],
      peakDemand: {},
    };
  }
}
