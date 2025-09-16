import "dotenv/config";
import type { Options } from "sequelize";

const { MYSQL_USER, MYSQL_PASSWORD, MYSQL_DATABASE, MYSQL_HOST } = process.env;

const config: Options = {
  username: MYSQL_USER,
  password: MYSQL_PASSWORD,
  database: MYSQL_DATABASE,
  host: MYSQL_HOST,
  dialect: "mysql",
};

export default config;
