import { plainToInstance } from "class-transformer";
import { UserDTO } from "../dtos/user/UserDto";
import { NextFunction, Request, Response } from "express";
import { SuccessResponse } from "../utils/Responses/SuccessResponse";
import { AuthService } from "../service/AuthService";

const authService = new AuthService();

export class AuthController {
  static async login(req: Request, res: Response, next: NextFunction) {
    try {
      const dto = plainToInstance(UserDTO, req.body);
      const response = await authService.login(dto.email, dto.password);
      const { password, ...safeUser } = response.user;
      const { user, ...responseNoUser } = response;

      const payload = { ...safeUser, ...responseNoUser };

      return res
        .status(200)
        .json(SuccessResponse(payload, "Logado com sucesso", 200));
    } catch (err: any) {
      next(err);
    }
  }
}
