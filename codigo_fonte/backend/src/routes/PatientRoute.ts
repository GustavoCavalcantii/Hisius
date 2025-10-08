import { Router } from "express";
import { PatientController } from "../controllers/PatientController";
import JsonRequiredMiddleware from "../middlewares/JsonRequired";
import { ValidateRequest } from "../middlewares/ValidateRequest";
import { PatientDto } from "../dtos/patient/PatientDto";
import { AuthMiddleware } from "../middlewares/AuthMiddleware";

const router = Router();


router.get("/:id", AuthMiddleware, PatientController.getPatient);

router.post(
  "/",
  AuthMiddleware,
  JsonRequiredMiddleware,
  ValidateRequest(PatientDto, ["create"]),
  PatientController.createPatient
);


router.put(
  "/:id",
  AuthMiddleware,
  JsonRequiredMiddleware,
  ValidateRequest(PatientDto, ["update"]),
  PatientController.updatePatient
);

// Dentro do arquivo PatientRoute.ts

// ... (depois da rota PUT)

router.delete(
  "/:id",
  AuthMiddleware,
  PatientController.deletePatient
);

export default router;
