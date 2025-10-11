import { Router } from "express";
import { PatientController } from "../controllers/PatientController";
import { AuthMiddleware } from "../middlewares/AuthMiddleware";
import { ValidateRequest } from "../middlewares/ValidateRequest";
import { PatientDto } from "../dtos/patient/PatientDto";
import JsonRequiredMiddleware from "../middlewares/JsonRequired";

const router = Router();

router.post("/", AuthMiddleware, JsonRequiredMiddleware, ValidateRequest(PatientDto, ["create"]), PatientController.createPatient);

// Rotas do próprio paciente
router.get("/me", AuthMiddleware, PatientController.getMyProfile);
router.put("/me", AuthMiddleware, JsonRequiredMiddleware, ValidateRequest(PatientDto, ["update"]), PatientController.updateMyProfile);

// Rotas do administrador
router.get("/:id", AuthMiddleware, PatientController.getPatient);
router.put("/:id", AuthMiddleware, JsonRequiredMiddleware, ValidateRequest(PatientDto, ["update"]), PatientController.updatePatient);

export default router;