import { plainToInstance } from "class-transformer";
import { UserDTO } from "../dtos/user/UserDto";
import { UserService } from "../service/UserService";
import { NextFunction, Request, Response } from "express";
import { SuccessResponse } from "../utils/responses/SuccessResponse";
import User from "../database/models/User";
import { BadRequestError } from "../utils/errors/BadRequestError";
import { UserParamsDto } from "../dtos/user/UserParamsDto";

const userService = new UserService();

export class UserController {
  static async register(req: Request, res: Response, next: NextFunction) {
    try {
      const dto = plainToInstance(UserDTO, req.body);
      const {role, ...rest} = dto;
      const user = await userService.createUser(rest);

      return res
        .status(201)
        .json(SuccessResponse(user, "Usuário criado com sucesso!", 201));
    } catch (err: any) {
      next(err);
    }
  }

  static async updateRole(req: Request, res: Response, next: NextFunction) {
    try {
      const paramDto = plainToInstance(UserParamsDto, req.params);
      const dto = plainToInstance(UserDTO, req.body);

      await userService.updateRole(dto.role, paramDto.userId);
      res
        .status(200)
        .json(SuccessResponse(null, "Nível de acesso atualizado", 200));
    } catch (err) {
      next(err);
    }
  }

  static async deleteUser(req: Request, res: Response, next: NextFunction) {
    try {
      const loggedInUser = req.user;
      if (!loggedInUser) throw new BadRequestError("Acesso negado");

      await userService.deleteUser(loggedInUser as User);
      res.status(200).json(SuccessResponse(null, "Usuário deletado", 200));
    } catch (err) {
      next(err);
    }
  }
}
