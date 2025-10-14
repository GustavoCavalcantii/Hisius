import Redis from "ioredis";
import { CONFIG } from "./Env";
import Logger from "./Logger";

let redis: Redis | null = null;

export const connectRedis = async (): Promise<Redis> => {
  redis = new Redis(CONFIG.redis.url, {
    retryStrategy(times) {
      if (times > 10) {
        Logger.error(
          "Não foi possível conectar ao Redis após várias tentativas"
        );
        return null;
      }
      return Math.min(times * 100, 3000);
    },
  });

  redis.on("connect", () => Logger.info("Redis (ioredis) conectado"));
  redis.on("error", (err) => Logger.error("Redis error:", err));
  redis.on("reconnecting", () => Logger.info("Redis reconectando..."));

  try {
    await redis.ping();
  } catch (err) {
    Logger.error("Falha ao pingar o Redis:", err);
    throw err;
  }

  return redis;
};

export const getRedis = (): Redis => {
  if (!redis) {
    throw new Error("Redis não conectado. Chame connectRedis() primeiro.");
  }
  return redis;
};
