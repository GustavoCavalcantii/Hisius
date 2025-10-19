export interface IAvgWait {
  avgWaitSeconds: number;
}

export interface ICreateQueueEventInput {
  patientId: number;
  queueId: string;
  enteredAt: Date;
  startedAt?: Date;
}
