import { plainToInstance } from "class-transformer";
import { UserDTO } from "../dtos/user/UserDto";
import { NextFunction, Request, Response } from "express";
import { SuccessResponse } from "../utils/responses/SuccessResponse";
import { EmployeeService } from "../service/EmployeeService";

const employeeService = new EmployeeService();

export class EmployeeController {
  static async register(req: Request, res: Response, next: NextFunction) {
    try {
      const dto = plainToInstance(UserDTO, req.body);
      const { role, ...rest } = dto;
      const user = await employeeService.createUser(rest);

      return res
        .status(201)
        .json(SuccessResponse(user, "Usuário criado com sucesso!", 201));
    } catch (err: any) {
      next(err);
    }
  }
}
