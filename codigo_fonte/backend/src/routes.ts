import express from "express";
import cors from "cors";
import morgan from "morgan";

import MaintenanceMiddleware from "./middlewares/Maintenance";
import "express-async-errors";
import cookieParser from "cookie-parser";

import { ErrorMiddleware } from "./middlewares/Error";
import { NotFoundMiddleware } from "./middlewares/NotFound";
import UserRoute from "./routes/UserRoute";
import AuthRoute from "./routes/AuthRoute";
import { setupSwagger } from "../swagger";

const app = express();

//ROTAS PARA PERMITIDAS
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "http://localhost:8088",
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

app.use(AuthRoute);
app.use(UserRoute);
setupSwagger(app);

/*
  ERROS E 404
*/
app.use(ErrorMiddleware);
app.use(NotFoundMiddleware); // Sempre o último

export default app;
