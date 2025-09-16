import http from "http";
import logger from "./config/Logger";
import { ApiEnviroment } from "./enums/Api/ApiEnviroment";
import app from "./routes";
import { generateASCII } from "./utils/NameGenerator";
import { config } from "dotenv";
import packageJson from "../package.json";
import { connectDB, disconnectDB } from "./database/Connection";
import User from "./database/models/User";

config();

const API_NAME: string = packageJson.name;
const APP_VERSION: string = packageJson.version;
const API_VERSION: string = "v" + (process.env.API_VERSION || "1");
const ENVIRONMENT: string =
  process.env.ENVIRONMENT === "dev" ? ApiEnviroment.DEV : ApiEnviroment.PROD;
const PORT: number = Number(process.env.API_PORT) || 8088;

let server: http.Server | null = null;

/**
 * Finaliza aplicação de forma segura
 */
const stopServer = async (isError = false) => {
  try {
    logger.warn("Parando a aplicação...");

    if (server) {
      logger.warn("Fechando servidor HTTP...");
      server.close();
    }

    logger.warn("Fechando conexão com banco de dados...");
    await disconnectDB();

    logger.warn("Aplicação encerrada!");
    process.exit(isError ? 1 : 0);
  } catch (err) {
    logger.error("Erro ao parar aplicação:", err);
    process.exit(1);
  }
};

function getHorizontalSize(asciiArt: string): number {
  return Math.max(...asciiArt.split("\n").map((line) => line.length));
}

/**
 * Inicializa servidor:
 * - Gera ASCII
 * - Conecta no banco
 * - Exibe infos
 * - Sobe o servidor Express
 */
const startServer = async () => {
  try {
    const asciiArt = await generateASCII(API_NAME);

    logger.info("Conectando com o banco de dados...");
    await connectDB();

    const horizontalSize = getHorizontalSize(asciiArt) + 1;

    console.log(asciiArt);
    console.log("=".repeat(horizontalSize));
    console.log(`Versão do app: ${APP_VERSION}`);
    console.log(`Versão API: ${API_VERSION}`);
    console.log(`Ambiente: ${ENVIRONMENT}`);
    console.log("=".repeat(horizontalSize));

    server = app.listen(PORT, () => {
      logger.info(`Aplicação iniciada na porta ${PORT}`);
      if (ENVIRONMENT === ApiEnviroment.DEV) {
        logger.info(`API rodando em: http://localhost:${PORT}/`);
      }
    });
    process.on("SIGINT", () => stopServer(false));
    process.on("SIGTERM", () => stopServer(false));
  } catch (err) {
    logger.error(`Erro ao iniciar aplicação: ${err}`);
    await stopServer(true);
  }
};

startServer();
