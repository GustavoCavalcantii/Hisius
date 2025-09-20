import { plainToInstance } from "class-transformer";
import { UserDTO } from "../dtos/user/UserDto";
import { UserService } from "../service/UserService";
import { NextFunction, Request, Response } from "express";
import { SuccessResponse } from "../utils/Responses/SuccessResponse";

const userService = new UserService();

export class UserController {
  static async register(req: Request, res: Response, next: NextFunction) {
    try {
      const dto = plainToInstance(UserDTO, req.body);
      const user = await userService.createUser(dto);

      return res
        .status(201)
        .json(SuccessResponse(user, "Usuário criado com sucesso!", 201));
    } catch (err: any) {
      next(err);
    }
  }
}
