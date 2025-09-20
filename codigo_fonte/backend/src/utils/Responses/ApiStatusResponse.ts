import { ApiEnviroment } from "../../enums/Api/ApiEnviroment";

export interface ApiStatusResponse {
  appName: string;
  version: string;
  environment: ApiEnviroment;
}