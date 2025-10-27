import { RedisClientType } from "redis";
import { QueueStatus } from "../enums/Queue/QueueStatus";
import { getRedis } from "../config/Redis";
import Redis from "ioredis";
import { IQueueHistoryResponse } from "../interfaces/queue/IQueueHistoryResponse";
import { QueueType } from "../enums/Queue/QueueType";

export class QueueRepository {
  private redis: Redis;

  private getRedisClient(): Redis {
    if (!this.redis) {
      this.redis = getRedis();
    }
    return this.redis;
  }

  async getPatientMeta(patientId: number): Promise<Record<string, string>> {
    const redis = this.getRedisClient();
    const meta = await redis.hgetall(`patient:${patientId}:queueData`);
    return meta || {};
  }

  async setPatientMeta(patientId: number, meta: Record<string, string>) {
    const redis = this.getRedisClient();
    await redis.hset(`patient:${patientId}:queueData`, meta);
  }

  async deletePatientMeta(patientId: number) {
    const redis = this.getRedisClient();
    await redis.del(`patient:${patientId}:queueData`);
  }

  async addPatientToQueue(
    queueType: QueueType,
    patientId: number,
    score: number
  ) {
    const redis = this.getRedisClient();
    const queueKey = `queue:${queueType}`;
    await redis.zadd(queueKey, score, patientId.toString());
  }

  async removePatientFromHistory(queueType: QueueType, patientId: number) {
    const redis = this.getRedisClient();
    const historyKey = `queue:history:${queueType}`;
    await redis.zrem(historyKey, patientId.toString());
  }

  async removePatientFromQueue(queueType: QueueType, patientId: number) {
    const redis = this.getRedisClient();
    const queueKey = `queue:${queueType}`;
    await redis.zrem(queueKey, patientId.toString());
  }

  async addPatientToCalledHistory(
    queueType: QueueType,
    patientId: number,
    name: string,
    room: string
  ): Promise<void> {
    const timestamp = Date.now();
    const historyKey = `queue:called:history:${queueType}`;
    await this.redis
      .multi()
      .hset(`queue:called:${queueType}:${patientId}`, {
        name,
        room,
        timestamp: timestamp.toString(),
      })
      .zadd(historyKey, timestamp, patientId.toString())
      .zremrangebyrank(historyKey, 0, -7)
      .exec();
  }

  async getLastCalledPatients(
    queueType: QueueType
  ): Promise<IQueueHistoryResponse[]> {
    const redis = this.getRedisClient();
    const limit = 6;
    const historyKey = `queue:called:history:${queueType}`;

    const patientIds = await redis.zrevrange(historyKey, 0, limit - 1);

    const patients: IQueueHistoryResponse[] = [];

    for (const patientId of patientIds) {
      const data = await redis.hgetall(
        `queue:called:${queueType}:${patientId}`
      );
      if (data && Object.keys(data).length > 0) {
        patients.push({
          name: data.name,
          room: data.room,
          timestamp: Number(data.timestamp),
        });
      }
    }

    return patients;
  }

  async getQueuePatients(
    queueType: QueueType,
    start: number,
    end: number
  ): Promise<string[]> {
    const redis = this.getRedisClient();
    const queueKey = `queue:${queueType}`;
    return await redis.zrange(queueKey, start, end);
  }

  async getQueueLength(queueType: QueueType): Promise<number> {
    const redis = this.getRedisClient();
    const queueKey = `queue:${queueType}`;
    return await redis.zcard(queueKey);
  }

  async getNextPatientId(queueType: QueueType): Promise<string | null> {
    const redis = this.getRedisClient();
    const queueKey = `queue:${queueType}`;
    const ids = await redis.zrange(queueKey, 0, 0);
    return ids.length > 0 ? ids[0] : null;
  }

  async getPatientPosition(queueType: QueueType, patientId: number) {
    const queueKey = `queue:${queueType}`;
    const rank = await this.redis.zrank(queueKey, patientId.toString());
    return rank !== null ? rank + 1 : 0;
  }

  async getLastTimestamps(queueType: QueueType, limit = 10) {
    const historyKey = `queue:history:${queueType}`;
    const timestamps = await this.redis.zrange(historyKey, -limit, -1);
    return timestamps.map((t) => Number(t));
  }

  async setPatientStatus(patientId: number, status: QueueStatus) {
    const redis = this.getRedisClient();
    await redis.hset(`patient:${patientId}:queueData`, { status });
  }

  async registerPatientCalled(queueType: string, patientId: number) {
    const historyKey = `queue:history:${queueType}`;
    const timestamp = Date.now();
    await this.redis.zadd(
      historyKey,
      timestamp.toString(),
      patientId.toString()
    );
  }

  async patientExistsInQueue(patientId: number): Promise<boolean> {
    const meta = await this.getPatientMeta(patientId);
    return meta && Object.keys(meta).length > 0 && !!meta.type;
  }
}
