import { plainToInstance } from "class-transformer";
import { UserDTO } from "../dtos/user/UserDto";
import { NextFunction, Request, Response } from "express";
import { SuccessResponse } from "../utils/responses/SuccessResponse";
import { EmployeeService } from "../service/EmployeeService";
import { EmployeeDto } from "../dtos/employee/EmployeeDto";
import { IUserQueryParams } from "../interfaces/user/IUserQueryParams";

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

  static async getEmployees(req: Request, res: Response, next: NextFunction) {
    try {
      const queryParams = plainToInstance(EmployeeDto, req.query);
      const page = queryParams.page ? Number(queryParams.page) : 1;
      const limit = queryParams.limit ? Number(queryParams.limit) : 10;
      const name = queryParams.nameFilter;

      const result = await employeeService.getEmployeesPaginated({
        page,
        limit,
        name,
      } as IUserQueryParams);

      return res
        .status(200)
        .json(
          SuccessResponse(result, "Funcionário capturados com sucesso", 200)
        );
    } catch (err: any) {
      next(err);
    }
  }
}
