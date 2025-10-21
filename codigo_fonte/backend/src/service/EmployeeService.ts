import { UserRole } from "../enums/User/UserRole";
import { ICreateUserInput } from "../interfaces/user/ICreateUser";
import { IUserQueryParams } from "../interfaces/user/IUserQueryParams";
import { UserService } from "./UserService";

export class EmployeeService {
  private userService = new UserService();

  async createUser(userInput: ICreateUserInput) {
    return await this.userService.createUser({ ...userInput, role: 2 });
  }

  async getEmployeesPaginated(queryParams: IUserQueryParams) {

    return await this.userService.getUsersPaginated({
      ...queryParams,
      role: UserRole.EMPLOYEE,
    });
  }
}
