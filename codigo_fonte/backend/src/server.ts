import "reflect-metadata";
import http from "http";
import logger from "./config/Logger";
import { ApiEnviroment } from "./enums/Api/ApiEnviroment";
import app from "./routes";
import { generateASCII } from "./utils/nameGenerator";
import packageJson from "../package.json";
import { initDB, disconnectDB } from "./database/Connection";
import { initializeModels } from "./database/models/index";
import { initSMTP } from "./config/Smtp";
import { connectRedis } from "./config/Redis";
import { SocketServer } from "./config/SocketServer";

const API_NAME = packageJson.name;
const APP_VERSION = packageJson.version;

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
    logger.info("Capturando variáveis de ambiente...");
    const { CONFIG } = await import("./config/Env");

    const API_VERSION = "v" + CONFIG.apiVersion;
    const ENVIRONMENT =
      CONFIG.environment === "dev" ? ApiEnviroment.DEV : ApiEnviroment.PROD;
    const PORT = CONFIG.apiPort;

    logger.info("Conectando com o banco de dados...");
    const sequelize = await initDB(CONFIG);
    logger.info("Inicializando modelos...");
    await initializeModels(sequelize);
    //logger.info("Conectando com serviço SMTP...");
    //await initSMTP(CONFIG);
    logger.info("Conectando com Redis...");
    await connectRedis();

    const asciiArt = await generateASCII(API_NAME);
    const horizontalSize = getHorizontalSize(asciiArt) + 1;

    console.log(asciiArt);
    console.log("=".repeat(horizontalSize));
    console.log(`Versão do app: ${APP_VERSION}`);
    console.log(`Versão API: ${API_VERSION}`);
    console.log(`Ambiente: ${ENVIRONMENT}`);
    console.log("=".repeat(horizontalSize));

    server = app.listen(PORT, async () => {
      logger.info(`Aplicação iniciada na porta ${PORT}`);
      if (ENVIRONMENT === ApiEnviroment.DEV) {
        logger.info(`API rodando em: http://localhost:${PORT}/`);
      }

      logger.info("Conectando o Websocket...");
      await SocketServer.init(server);
    });

    process.on("SIGINT", () => stopServer(false));
    process.on("SIGTERM", () => stopServer(false));
  } catch (err: any) {
    logger.error("Não foi possível iniciar a aplicação:");
    logger.error(err instanceof Error ? err.message : err);
    logger.error(err instanceof Error ? err.stack : "");
    await stopServer(true);
  }
};

startServer();
