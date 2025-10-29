import { Options, Sequelize } from "sequelize";
import Logger from "../config/Logger";

let sequelize: Sequelize;

export const initDB = async (CONFIG: any): Promise<Sequelize> => {
  const { host, port, user, password, database } = CONFIG.mysql;

  const config: Options = {
    username: user,
    password,
    database,
    host,
    port,
    dialect: "mysql",
    logging: (msg) => Logger.debug(msg),
  };
  sequelize = new Sequelize(config);

  try {
    await sequelize.authenticate();
    Logger.info("Conexão com MySQL via Sequelize realizada com sucesso!");
  } catch (error) {
    Logger.error("Erro ao conectar ao MySQL:", error);
    throw error;
  }

  return sequelize;
};

export const getSequelize = (): Sequelize => {
  if (!sequelize) {
    throw new Error("Sequelize não foi inicializado. Chame initDB primeiro.");
  }
  return sequelize;
};

export const disconnectDB = async () => {
  if (!sequelize) return;
  try {
    await sequelize.close();
    Logger.warn("Conexão com MySQL encerrada!");
  } catch (error) {
    Logger.error("Erro ao fechar a conexão:", error);
  }
};
