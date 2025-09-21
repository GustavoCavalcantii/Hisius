import { plainToInstance } from "class-transformer";
import { UserDTO } from "../dtos/user/UserDto";
import { NextFunction, Request, Response } from "express";
import { SuccessResponse } from "../utils/Responses/SuccessResponse";
import { AuthService } from "../service/AuthService";
import { BadRequestError } from "../utils/Errors/BadResquestError";

const authService = new AuthService();

export class AuthController {
  static async login(req: Request, res: Response, next: NextFunction) {
    try {
      const dto = plainToInstance(UserDTO, req.body);
      const response = await authService.login(dto.email, dto.password);
      const { password, ...safeUser } = response.user;

      const payload = { ...safeUser, accessToken: response.accessToken };

      res.cookie("refreshToken", response.refreshToken, {
        httpOnly: true,
        secure: process.env.ENVIRONMENT === "production",
        sameSite: "strict",
        path: "/auth",
        maxAge: 7 * 24 * 60 * 60 * 1000, //7 dias
      });

      return res
        .status(200)
        .json(SuccessResponse(payload, "Logado com sucesso", 200));
    } catch (err: any) {
      next(err);
    }
  }
  
  static async logout(req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.cookies?.refreshToken;
      if (!token) throw new BadRequestError("Token ausente");

      await authService.logout(token);

      res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: process.env.ENVIRONMENT === "production",
        sameSite: "strict",
        path: "/auth",
      });

      return res
        .status(200)
        .json(SuccessResponse(null, "Desconectado com sucesso", 200));
    } catch (e) {
      next(e);
    }
  }

  static async refresh(req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.cookies?.refreshToken;
      if (!token) throw new BadRequestError("Token ausente");

      const { accessToken, refreshToken } = await authService.refreshToken(
        token
      );

      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.ENVIRONMENT === "production",
        sameSite: "strict",
        path: "/auth",
        maxAge: 7 * 24 * 60 * 60 * 1000, //7 dias
      });

      return res
        .status(200)
        .json(SuccessResponse({ accessToken }, "Logado com sucesso", 200));
    } catch (err) {
      next(err);
    }
  }
}
