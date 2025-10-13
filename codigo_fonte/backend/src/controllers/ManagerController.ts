import { NextFunction, Request, Response } from "express";
import { ManagerService } from "../service/ManagerService";
import { UserDTO } from "../dtos/user/UserDto";
import { plainToInstance } from "class-transformer";
import { SuccessResponse } from "../utils/responses/SuccessResponse";
import { BadRequestError } from "../utils/errors/BadRequestError";

const managerService = new ManagerService();

export class ManagerController {
  static async register(req: Request, res: Response, next: NextFunction) {
    try {
      const dto = plainToInstance(UserDTO, req.body);
      const { role, ...rest } = dto;
      const user = await managerService.create(rest);

      return res
        .status(201)
        .json(SuccessResponse(user, "Usuário criado com sucesso!", 201));
    } catch (err: any) {
      next(err);
    }
  }

  static async generateAddEmployeToken(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const loggedInUser = req.user;
      if (!loggedInUser) throw new BadRequestError("Acesso negado");

      const token: string = await managerService.generateAddEmployeToken(
        loggedInUser.id
      );

      return res
        .status(201)
        .json(
          SuccessResponse(
            { token: token },
            "Informações capturadas com sucesso!",
            201
          )
        );
    } catch (err: any) {
      next(err);
    }
  }

  static async getHospitalCode(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const loggedInUser = req.user;
      if (!loggedInUser) throw new BadRequestError("Acesso negado");

      const hospitalCode: string = await managerService.getHospitalCode(
        loggedInUser.id
      );

      return res
        .status(201)
        .json(
          SuccessResponse(
            { hospitalCode: hospitalCode },
            "Informações capturadas com sucesso!",
            201
          )
        );
    } catch (err: any) {
      next(err);
    }
  }
}
