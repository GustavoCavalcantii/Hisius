export interface IQueueEvent {
  id: string;
  patientId: string;
  queue: "triagem" | "atendimento";
  enteredAt: Date;
  startedAt: Date | null;
  finishedAt: Date | null;
  queueId: string;
}
