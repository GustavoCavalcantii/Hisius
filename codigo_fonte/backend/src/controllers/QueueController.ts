import { NextFunction, Request, Response } from "express";
import { SuccessResponse } from "../utils/responses/SuccessResponse";
import { BadRequestError } from "../utils/errors/BadResquestError";
import { QueueService } from "../service/QueueService";
import { QueueType } from "../enums/Queue/QueueType";

const queueService = new QueueService();

export class QueueController {
  static async queueJoin(req: Request, res: Response, next: NextFunction) {
    try {
      const loggedInUser = req.user;
      if (!loggedInUser) throw new BadRequestError("Acesso negado");

      await queueService.enqueuedPatient(loggedInUser.id, QueueType.TRIAGE);

      return res
        .status(200)
        .json(SuccessResponse(null, "Entrou na fila com sucesso", 200));
    } catch (err: any) {
      next(err);
    }
  }
}
