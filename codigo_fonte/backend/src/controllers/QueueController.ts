import { NextFunction, Request, Response } from "express";
import { SuccessResponse } from "../utils/responses/SuccessResponse";
import { BadRequestError } from "../utils/errors/BadRequestError";
import { QueueService } from "../service/QueueService";
import { QueueType } from "../enums/Queue/QueueType";
import { plainToInstance } from "class-transformer";
import { QueueDto } from "../dtos/queue/QueueDto";
import { QueueParamsDto } from "../dtos/queue/QueueParamsDto";
import { NotFoundError } from "../utils/errors/NotFoundError";

const queueService = new QueueService();

export class QueueController {
  static async queueJoin(req: Request, res: Response, next: NextFunction) {
    try {
      const loggedInUser = req.user;
      if (!loggedInUser) throw new BadRequestError("Acesso negado");

      await queueService.enqueuePatient(loggedInUser.id, QueueType.TRIAGE);

      return res
        .status(200)
        .json(SuccessResponse(null, "Entrou na fila com sucesso", 200));
    } catch (err: any) {
      next(err);
    }
  }

  static async getSelfInfo(req: Request, res: Response, next: NextFunction) {
    try {
      const loggedInUser = req.user;
      if (!loggedInUser) throw new BadRequestError("Acesso negado");

      const patient = await queueService.getPatientInfo(loggedInUser.id);

      return res
        .status(200)
        .json(
          SuccessResponse(patient, "Informações capturadas com sucesso", 200)
        );
    } catch (err: any) {
      next(err);
    }
  }

  static async getNextPatient(req: Request, res: Response, next: NextFunction) {
    try {
      const paramDto = plainToInstance(QueueParamsDto, req.params);
      const dto = plainToInstance(QueueDto, req.body);

      const patient = await queueService.getNextPatient(
        paramDto.type,
        dto.room
      );

      if (!patient) throw new NotFoundError("Não há nenhum paciente na fila");

      return res
        .status(200)
        .json(
          SuccessResponse(patient, "Próximo paciente chamado com sucesso", 200)
        );
    } catch (err: any) {
      next(err);
    }
  }

  static async moveToNextQueue(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const paramDto = plainToInstance(QueueParamsDto, req.params);
      const dto = plainToInstance(QueueDto, req.body);

      await queueService.moveToTreatment(
        paramDto.patientId,
        dto.classification
      );

      return res
        .status(200)
        .json(SuccessResponse(null, "Paciente movido com sucesso", 200));
    } catch (err: any) {
      next(err);
    }
  }

  static async queueLeave(req: Request, res: Response, next: NextFunction) {
    try {
      const loggedInUser = req.user;
      if (!loggedInUser) throw new BadRequestError("Acesso negado");

      await queueService.dequeuePatient(loggedInUser.id);

      return res
        .status(200)
        .json(SuccessResponse(null, "Saiu da fila com sucesso", 200));
    } catch (err: any) {
      next(err);
    }
  }

  static async updateQueueClassification(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const paramDto = plainToInstance(QueueParamsDto, req.params);
      const dto = plainToInstance(QueueDto, req.body);

      await queueService.updateClassification(
        paramDto.patientId,
        dto.classification
      );

      return res
        .status(200)
        .json(
          SuccessResponse(
            null,
            "Classificação de risco alterada com sucesso",
            200
          )
        );
    } catch (err: any) {
      next(err);
    }
  }

  static async getPatientsByQueue(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const queryDto = plainToInstance(QueueDto, req.query);
      const paramDto = plainToInstance(QueueParamsDto, req.params);

      const enquedPatients = await queueService.getPatientsByQueue(
        paramDto.type,
        queryDto.page,
        queryDto.limit,
        queryDto.classification,
        queryDto.nameFilter
      );

      return res
        .status(200)
        .json(
          SuccessResponse(
            enquedPatients,
            "Dados da fila captura com sucesso!",
            200
          )
        );
    } catch (err: any) {
      next(err);
    }
  }
}
