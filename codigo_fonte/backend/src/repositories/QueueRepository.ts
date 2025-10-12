import { RedisClientType } from "redis";
import { QueueStatus } from "../interfaces/queue/QueueStatus";
import { getRedis } from "../config/Redis";

export class QueueRepository {
  private redis: RedisClientType;

  private getRedisClient(): RedisClientType {
    if (!this.redis) {
      this.redis = getRedis();
    }
    return this.redis;
  }

  async getPatientMeta(patientId: number): Promise<Record<string, string>> {
    const redis = this.getRedisClient();
    const meta = await redis.hGetAll(`patient:${patientId}:queueData`);
    return meta || {};
  }

  async setPatientMeta(patientId: number, meta: Record<string, string>) {
    const redis = this.getRedisClient();
    await redis.hSet(`patient:${patientId}:queueData`, meta);
  }

  async deletePatientMeta(patientId: number) {
    const redis = this.getRedisClient();
    await redis.del(`patient:${patientId}:queueData`);
  }

  async addPatientToQueue(queueKey: string, patientId: number, score: number) {
    const redis = this.getRedisClient();
    await redis.zAdd(queueKey, {
      score,
      value: patientId.toString(),
    });
  }

  async removePatientFromHistory(
    historyKey: string,
    patientId: number
  ) {
    const redis = this.getRedisClient();
    await redis.zRem(historyKey, patientId.toString());
  }

  async removePatientFromQueue(queueKey: string, patientId: number) {
    const redis = this.getRedisClient();
    await redis.zRem(queueKey, patientId.toString());
  }

  async getQueuePatients(
    queueKey: string,
    start: number,
    end: number
  ): Promise<string[]> {
    const redis = this.getRedisClient();
    return await redis.zRange(queueKey, start, end);
  }

  async getQueueLength(queueKey: string): Promise<number> {
    const redis = this.getRedisClient();
    return await redis.zCard(queueKey);
  }

  async getNextPatientId(queueKey: string): Promise<string | null> {
    const redis = this.getRedisClient();
    const ids = await redis.zRange(queueKey, 0, 0);
    return ids.length > 0 ? ids[0] : null;
  }

  async getPatientPosition(queueKey: string, patientId: number) {
    const rank = await this.redis.zRank(queueKey, patientId.toString());
    return rank !== null ? rank + 1 : 0;
  }

  async getLastTimestamps(historyKey: string, limit = 10) {
    const timestamps = await this.redis.zRange(historyKey, -limit, -1);
    return timestamps.map((t) => Number(t));
  }

  async setPatientStatus(patientId: number, status: QueueStatus) {
    const redis = this.getRedisClient();
    await redis.hSet(`patient:${patientId}:queueData`, { status });
  }

  async registerPatientCalled(queueType: string, patientId: number) {
    const historyKey = `queue:history:${queueType}`;
    const timestamp = Date.now();
    await this.redis.zAdd(historyKey, {
      score: timestamp,
      value: patientId.toString(),
    });
  }

  async patientExistsInQueue(patientId: number): Promise<boolean> {
    const meta = await this.getPatientMeta(patientId);
    return meta && Object.keys(meta).length > 0 && !!meta.type;
  }
}
