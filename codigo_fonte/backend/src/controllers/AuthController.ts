import { plainToInstance } from "class-transformer";
import { UserDTO } from "../dtos/user/UserDto";
import { NextFunction, Request, Response } from "express";
import { SuccessResponse } from "../utils/responses/SuccessResponse";
import { AuthService } from "../service/AuthService";
import { BadRequestError } from "../utils/errors/BadRequestError";

const authService = new AuthService();

export class AuthController {
  static async login(req: Request, res: Response, next: NextFunction) {
    try {
      const dto = plainToInstance(UserDTO, req.body);
      const response = await authService.login(dto.email, dto.password);
      const payload = { ...response.user, accessToken: response.accessToken };
      AuthController.createRefreshCookie(res, response.refreshToken);

      return res
        .status(200)
        .json(SuccessResponse(payload, "Logado com sucesso", 200));
    } catch (err) {
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
    } catch (err) {
      next(err);
    }
  }

  static async refresh(req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.cookies?.refreshToken;
      if (!token) throw new BadRequestError("Token ausente");

      const { accessToken, refreshToken } = await authService.refreshToken(
        token
      );

      AuthController.createRefreshCookie(res, refreshToken);

      return res
        .status(200)
        .json(SuccessResponse({ accessToken }, "Token atualizado", 200));
    } catch (err) {
      next(err);
    }
  }

  static async requestEmail(req: Request, res: Response, next: NextFunction) {
    try {
      const loggedInUser = req.user;
      if (!loggedInUser) throw new BadRequestError("Acesso negado");

      const dto = plainToInstance(UserDTO, req.body);
      await authService.requestResetEmailToken(loggedInUser.id, dto.email);

      return res
        .status(200)
        .json(SuccessResponse(null, "Email enviado com sucesso.", 200));
    } catch (err) {
      next(err);
    }
  }

  static async changeEmail(req: Request, res: Response, next: NextFunction) {
    try {
      const loggedInUser = req.user;
      if (!loggedInUser) throw new BadRequestError("Acesso negado");

      await authService.changeEmail(loggedInUser.id, loggedInUser.email!);

      return res
        .status(200)
        .json(SuccessResponse(null, "Email alterado com sucesso", 200));
    } catch (err) {
      next(err);
    }
  }

  static async requestResetPassword(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const dto = plainToInstance(UserDTO, req.body);
      await authService.requestResetPassToken(dto.email);

      return res
        .status(200)
        .json(SuccessResponse(null, "Email enviado com sucesso.", 200));
    } catch (err) {
      next(err);
    }
  }

  static async recoverPassword(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const loggedInUser = req.user;
      if (!loggedInUser) throw new BadRequestError("Acesso negado");

      const dto = plainToInstance(UserDTO, req.body);
      await authService.recoverPassword(loggedInUser.id, dto.password);

      return res
        .status(200)
        .json(SuccessResponse(null, "Senha alterada com sucesso", 200));
    } catch (err) {
      next(err);
    }
  }

  static createRefreshCookie(res: Response, refresh: string) {
    res.cookie("refreshToken", refresh, {
      httpOnly: true,
      secure: process.env.ENVIRONMENT === "production",
      sameSite: "strict",
      path: "/auth",
      maxAge: 7 * 24 * 60 * 60 * 1000, //7 dias
    });
  }
}
