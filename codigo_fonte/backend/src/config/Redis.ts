import { createClient, RedisClientType } from "redis";
import { CONFIG } from "./Env";
import Logger from "./Logger";

let redis: RedisClientType;

export const connectRedis = async () => {
  redis = createClient({
    url: CONFIG.redis.url,
    socket: {
      reconnectStrategy: (retries) => {
        if (retries > 10)
          return new Error("Não foi possível conectar ao Redis");
        return Math.min(retries * 100, 3000);
      },
    },
  });

  redis.on("connect", () => Logger.info("Redis conectado"));
  redis.on("error", (err) => Logger.error("Redis error:", err));
  redis.on("reconnecting", () => Logger.info("Redis reconectando..."));

  await redis.connect();
  return redis;
};

export const getRedis = (): RedisClientType => {
  if (!redis)
    throw new Error("Redis não conectado. Chame connectRedis() primeiro.");
  return redis;
};
