import { getRedis } from "../config/Redis";
import { RateLimiterRedis } from "rate-limiter-flexible";
import Redis from "ioredis";

export class BruteForceProtectionRepository {
  private redis: Redis;

  maxAttempts = 5;
  limiterDuration = 30 * 60;

  private getLimiter(): RateLimiterRedis {
    if (!this.redis) {
      this.redis = getRedis();
    }

    return new RateLimiterRedis({
      storeClient: this.redis,
      keyPrefix: "login_fail",
      points: this.maxAttempts,
      duration: this.limiterDuration,
    });
  }

  async registerFailedAttempt(username: string) {
    await this.getLimiter().consume(username.toLowerCase());
  }

  async getAttempts(username: string) {
    return await this.getLimiter().get(username);
  }

  async resetAttempts(username: string) {
    await this.getLimiter().delete(username.toLowerCase());
  }
}
