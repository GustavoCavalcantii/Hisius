import { Request, Response } from "express";
import { ApiEnviroment } from "../enums/Api/ApiEnviroment";
import { config } from "dotenv";
import packageJson from "../../package.json";
import { ApiStatusResponse } from "../utils/Responses/ApiStatusResponse";
import { SuccessResponse } from "../utils/Responses/SuccessResponse";

config();

const API_NAME: string = packageJson.name;
const API_VERSION: string = "v" + (process.env.API_VERSION || "1");
const ENVIRONMENT: string = process.env.ENVIRONMENT || "dev";

const environment: ApiEnviroment =
  ENVIRONMENT === "prod" ? ApiEnviroment.PROD : ApiEnviroment.DEV;

class StatusController {
  static getStatus(req: Request, res: Response) {
    
    // Monta payload de status
    const response: ApiStatusResponse = {
      appName: API_NAME,
      latestVersion: API_VERSION,
      environment: environment,
    };

    // Retorna resposta de sucesso padronizada
    res.status(200).json(
      SuccessResponse(response, "API está online")
    );
  }
}

export default StatusController;
