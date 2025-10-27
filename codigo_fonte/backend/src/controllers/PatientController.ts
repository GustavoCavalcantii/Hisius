import { plainToInstance } from "class-transformer";
import { PatientDto } from "../dtos/patient/PatientDto";
import { PatientService } from "../service/PatientService";
import { NextFunction, Request, Response } from "express";
import { SuccessResponse } from "../utils/responses/SuccessResponse";
import { BadRequestError } from "../utils/errors/BadRequestError";

const patientService = new PatientService();

export class PatientController {
  static async getMyProfile(req: Request, res: Response, next: NextFunction) {
    try {
      const loggedInUser = req.user;
      if (!loggedInUser) throw new BadRequestError("Usuário não autenticado.");

      const patientProfile = await patientService.getPatientByUserId(
        loggedInUser.id
      );
      return res.json(
        SuccessResponse(patientProfile, "Perfil do paciente encontrado", 200)
      );
    } catch (err) {
      next(err);
    }
  }

  static async updateMyProfile(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const loggedInUser = req.user;
      if (!loggedInUser) throw new BadRequestError("Usuário não autenticado.");

      const dto = plainToInstance(PatientDto, req.body);
      await patientService.updatePatientByUserId(loggedInUser.id, dto);
      return res.json(
        SuccessResponse(null, "Perfil atualizado com sucesso!", 200)
      );
    } catch (err) {
      next(err);
    }
  }

  static async createPatient(req: Request, res: Response, next: NextFunction) {
    try {
      const loggedInUser = req.user;
      if (!loggedInUser) throw new BadRequestError("Usuário não autenticado.");

      const dto = plainToInstance(PatientDto, req.body);
      const patient = await patientService.createPatient(dto, loggedInUser.id);
      return res
        .status(201)
        .json(
          SuccessResponse(patient, "Paciente registrado com sucesso!", 201)
        );
    } catch (err) {
      next(err);
    }
  }

  static async getPatient(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const patient = await patientService.getPatientById(Number(id));
      return res.json(
        SuccessResponse(patient, "Paciente encontrado pelo administrador", 200)
      );
    } catch (err) {
      next(err);
    }
  }

  static async updatePatient(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const dto = plainToInstance(PatientDto, req.body);
      await patientService.updatePatient(Number(id), dto);
      return res.json(
        SuccessResponse(null, "Registro atualizado pelo administrador!", 200)
      );
    } catch (err) {
      next(err);
    }
  }
}
