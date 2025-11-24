import express from "express";
import cors from "cors";
import morgan from "morgan";

import MaintenanceMiddleware from "./middlewares/Maintenance";
import "express-async-errors";
import cookieParser from "cookie-parser";

import { ErrorMiddleware } from "./middlewares/Error";
import { NotFoundMiddleware } from "./middlewares/NotFound";
import UserRoute from "./routes/UserRoute";
import ManagerRoute from "./routes/ManangerRoute";
import EnvRoute from "./routes/EnviromentRoute";
import AuthRoute from "./routes/AuthRoute";
import QueueRoute from "./routes/QueueRoute";
import PatientRoute from "./routes/PatientRoute";
import ReportRoute from "./routes/ReportRoute";
import EmployeeRoute from "./routes/EmployeeRoute";
import AttendanceRoute from "./routes/AttendanceRoute";
import LogRoute from "./routes/LogRoute";

import { setupSwagger } from "../swagger";

const app = express();

//ROTAS PARA PERMITIDAS
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "http://localhost:8088",
  "http://localhost:8081",
];

/*
  MIDDLEWARES
*/
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use(cookieParser());
app.set("trust proxy", true);
app.use(express.json());

app.use(morgan("dev"));
app.use(MaintenanceMiddleware);

/*
  ROTAS
*/
app.use(EnvRoute);
app.use("/queue", QueueRoute);
app.use("/reports", ReportRoute);
app.use("/auth", AuthRoute);
app.use("/users", UserRoute);
app.use("/admins", ManagerRoute);
app.use("/patients", PatientRoute);
app.use("/attendances", AttendanceRoute);
app.use("/employees", EmployeeRoute);
app.use("/logs", LogRoute);
setupSwagger(app);

/*
  ERROS E 404
*/
app.use(ErrorMiddleware);
app.use(NotFoundMiddleware); // Sempre o último

export default app;
