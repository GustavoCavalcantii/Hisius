import { plainToInstance } from "class-transformer";
import { UserDTO } from "../../dtos/user/UserDto";
import { createUser } from "../../service/UserService";
import { NextFunction, Request, Response } from "express";
import { SuccessResponse } from "../../utils/Responses/SuccessResponse";
import { IUser } from "../../interfaces/user/IUser";

export class UserController {
  static async register(req: Request, res: Response, next: NextFunction) {
    try {
      const dto = plainToInstance(UserDTO, req.body);
      const user: IUser = await createUser({
        name: dto.name,
        email: dto.email,
        password: dto.password,
      });
      const response = {
        id: user.id,
        name: user.nome,
        email: user.email,
        role: user.nivel_acesso,
      };

      return res
        .status(201)
        .json(SuccessResponse(response, "Usuário criado com sucesso!", 201));
    } catch (err: any) {
      next(err);
    }
  }
}
