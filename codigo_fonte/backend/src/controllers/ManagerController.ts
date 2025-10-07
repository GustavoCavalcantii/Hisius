import { NextFunction, Request, Response } from "express";
import { ManagerService } from "../service/ManagerService";
import { UserDTO } from "../dtos/user/UserDto";
import { plainToInstance } from "class-transformer";
import { SuccessResponse } from "../utils/responses/SuccessResponse";

const managerService = new ManagerService();

export class ManagerController {
  static async register(req: Request, res: Response, next: NextFunction) {
    try {
      const dto = plainToInstance(UserDTO, req.body);
      const user = await managerService.create(dto);

      return res
        .status(201)
        .json(SuccessResponse(user, "Usuário criado com sucesso!", 201));
    } catch (err: any) {
      next(err);
    }
  }
}
