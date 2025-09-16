import { Sequelize } from "sequelize";
import Logger from "../config/Logger";
import config from "./config/database";

const sequelize = new Sequelize(config);

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    Logger.info("Conexão com MySQL via Sequelize realizada com sucesso!");
  } catch (error) {
    Logger.error("Erro ao conectar ao MySQL:", error);
    throw error;
  }
};

const disconnectDB = async () => {
  try {
    await sequelize.close();
    Logger.warn("Conexão com MySQL encerrada!");
  } catch (error) {
    Logger.error("Erro ao fechar a conexão:", error);
  }
};

export { connectDB, disconnectDB, sequelize };
