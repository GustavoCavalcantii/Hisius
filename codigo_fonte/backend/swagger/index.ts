import { Express } from "express";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import packageJson from "../package.json";
import path from "path";
import fs from "fs";
import YAML from "yaml";
import Logger from "../src/config/Logger";

const PORT: number = Number(process.env.API_PORT) || 8088;

function readYAMLDir(dir: string): Record<string, any> {
  return fs.readdirSync(dir, { withFileTypes: true }).reduce((acc, entry) => {
    const fullPath = path.join(dir, entry.name);

    const nested = entry.isDirectory() && readYAMLDir(fullPath);
    const parsed =
      entry.isFile() &&
      /\.(yaml|yml)$/.test(entry.name) &&
      YAML.parse(fs.readFileSync(fullPath, "utf8"));

    return { ...acc, ...(nested || {}), ...(parsed || {}) };
  }, {} as Record<string, any>);
}

const schemasDir = path.join(__dirname, "./schemas");
const schemas = readYAMLDir(schemasDir);

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title:
        packageJson.name.charAt(0).toUpperCase() + packageJson.name.slice(1),
      version: packageJson.version,
      description: "Documentação da API",
    },
    components: {
      schemas,
    },
  },
  apis: [path.join(__dirname, "./paths/**/*.yaml")],
};

const swaggerSpec = swaggerJsdoc(options);

/**
 * Inicializa o Swagger no Express
 * @param app Instância do Express
 * @param route Rota onde o Swagger UI será servido (default: /docs)
 */
export const setupSwagger = (app: Express) => {
  if (process.env.ENVIRONMENT === "dev") {
    app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    Logger.info(`Swagger disponível em: http://localhost:${PORT}/docs`);
  }
};
