import { ICreateUserInput } from "../interfaces/user/ICreateUser";
import { UserService } from "./UserService";

export class EmployeeService {
  private userService = new UserService();

  async createUser(userInput: ICreateUserInput) {
    return await this.userService.createUser({ ...userInput, role: 2 });
  }
}
