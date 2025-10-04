import * as dotenv from "dotenv";
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
  "RESET_PASS_TOKEN_SECRET",
  "RESET_EMAIL_TOKEN_SECRET",
  "SMTP_HOST",
  "SMTP_USER",
  "SMTP_PASS",
  "SMTP_SECURE",
  "SMTP_PORT",
  "SMTP_CHARSET",
  "EMAIL_FROM",
  "FRONTEND_URL",
  "RESET_TOKEN_EXPIRES_MIN",
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
    throw new Error("Variáveis de ambiente ausentes: " + missing.join(", "));
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
    resetPassSecret: ENV.RESET_PASS_TOKEN_SECRET,
    resetEmailSecret: ENV.RESET_EMAIL_TOKEN_SECRET,
  },
  smtp: {
    host: ENV.SMTP_HOST,
    user: ENV.SMTP_USER,
    pass: ENV.SMTP_PASS,
    secure: ENV.SMTP_SECURE === "true",
    port: Number(ENV.SMTP_PORT),
    charset: ENV.SMTP_CHARSET,
    from: ENV.EMAIL_FROM,
  },
  frontendUrl: ENV.FRONTEND_URL,
  resetTokenExpiresMin: Number(ENV.RESET_TOKEN_EXPIRES_MIN),
};
