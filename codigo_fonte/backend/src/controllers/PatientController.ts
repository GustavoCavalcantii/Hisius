import { plainToInstance } from "class-transformer";
import { PatientDto } from "../dtos/patient/PatientDto";
import { PatientService } from "../service/PatientService";
import { NextFunction, Request, Response } from "express";
import { SuccessResponse } from "../utils/Responses/SuccessResponse";
import { BadRequestError } from "../utils/errors/BadRequestError";

const patientService = new PatientService();

export class PatientController {
  static async getPatient(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const patient = await patientService.getPatientById(Number(id));
      return res.json(SuccessResponse(patient, "Paciente encontrado", 200));
    } catch (err) {
      next(err);
    }
  }

    static async createPatient(req: Request, res: Response, next: NextFunction) {
    try {
     
      const loggedInUser = req.user;
      if (!loggedInUser) {
        throw new BadRequestError("Usuário não autenticado.");
      }
      
      const dto = plainToInstance(PatientDto, req.body);

      const patient = await patientService.createPatient(dto, loggedInUser.id);
      
      return res.status(201).json(SuccessResponse(patient, "Paciente registrado com sucesso!", 201));
    } catch (err) {
      next(err);
    }
  }
  static async updatePatient(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const dto = plainToInstance(PatientDto, req.body);
      const patient = await patientService.updatePatient(Number(id), dto);
      return res.json(SuccessResponse(null, "Registro atualizado com sucesso!", 200));
    } catch (err) {
      next(err);
    }
  }
   static async deletePatient(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      await patientService.deletePatient(Number(id));
      return res.status(200).json(SuccessResponse(null, "Paciente deletado com sucesso!", 200));
    } catch (err) {
      next(err);
    }
  }
}
