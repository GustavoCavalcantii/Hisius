import * as dotenv from "dotenv";
import Logger from "./Logger";
dotenv.config();

const requiredVars = [
  "ENVIRONMENT",
  "API_VERSION",
  "API_PORT",
  "MAINTENANCE",
  "MYSQL_HOST",
  "MYSQL_PORT",
  "MYSQL_USER",
  "MYSQL_PASSWORD",
  "MYSQL_DATABASE",
  "ACCESS_TOKEN_SECRET",
  "REFRESH_TOKEN_SECRET",
] as const;

type RequiredEnv = {
  [K in (typeof requiredVars)[number]]: string;
};

function loadEnv(): RequiredEnv {
  const missing: string[] = [];
  const env: Partial<RequiredEnv> = {};

  for (const key of requiredVars) {
    const value = process.env[key];
    if (value === undefined) {
      missing.push(key);
      continue;
    }
    env[key] = value;
  }

  if (missing.length > 0) {
    throw new Error("Variáveis de ambiente ausentes");
  }

  return env as RequiredEnv;
}

export const ENV = loadEnv();

export const CONFIG = {
  environment: ENV.ENVIRONMENT,
  apiVersion: Number(ENV.API_VERSION),
  apiPort: Number(ENV.API_PORT),
  maintenance: ENV.MAINTENANCE === "true",
  mysql: {
    host: ENV.MYSQL_HOST,
    port: Number(ENV.MYSQL_PORT),
    user: ENV.MYSQL_USER,
    password: ENV.MYSQL_PASSWORD,
    database: ENV.MYSQL_DATABASE,
  },
  tokens: {
    accessSecret: ENV.ACCESS_TOKEN_SECRET,
    refreshSecret: ENV.REFRESH_TOKEN_SECRET,
  },
};
