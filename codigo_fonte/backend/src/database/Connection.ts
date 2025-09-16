import { Sequelize } from "sequelize";
import Logger from "../config/Logger";
import config from "./config/database";

const sequelize = new Sequelize(config);

const connectDB = async () => {
  await sequelize
    .authenticate()
    .then(() => Logger.info("Conexão OK"))
    .catch((err) => Logger.error("Erro de conexão:", err));
};

const disconnectDB = async () => {
  await sequelize
    .close()
    .then(() => Logger.info("Conexão encerrada"))
    .catch((err) => Logger.error("Erro ao fechar a conexão:", err));
};

export { connectDB, disconnectDB, sequelize };
