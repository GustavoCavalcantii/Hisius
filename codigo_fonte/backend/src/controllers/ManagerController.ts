import { NextFunction, Request, Response } from "express";
import { ManagerService } from "../service/ManagerService";
import { UserDTO } from "../dtos/user/UserDto";
import { plainToInstance } from "class-transformer";
import { SuccessResponse } from "../utils/responses/SuccessResponse";
import { BadRequestError } from "../utils/errors/BadRequestError";
import { ManagerDto } from "../dtos/manager/ManagerDto";
import { IUserQueryParams } from "../interfaces/user/IUserQueryParams";

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

  static async getManagers(req: Request, res: Response, next: NextFunction) {
    try {
      const queryParams = plainToInstance(ManagerDto, req.query);
      const page = queryParams.page ? Number(queryParams.page) : 1;
      const limit = queryParams.limit ? Number(queryParams.limit) : 10;
      const name = queryParams.nameFilter;

      const result = await managerService.getAdminsPaginated({
        page,
        limit,
        name,
      } as IUserQueryParams);

      return res
        .status(200)
        .json(
          SuccessResponse(result, "Administradores capturados com sucesso", 200)
        );
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
