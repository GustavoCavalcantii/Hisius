import { UserService } from "../service/UserService";
import { TokenUtils } from "../utils/TokenUtils";
import { ICreateUserInput } from "../interfaces/user/ICreateUser";
import { ManagerRepository } from "../repositories/ManagerRepository";
import Manager from "../database/models/Manager";

export class ManagerService {
  private userService = new UserService();
  private managerRepo = new ManagerRepository();
  private tokenUtils = new TokenUtils();

  genNumericCode(): string {
    const codigo = Math.floor(Math.random() * 1000000);
    return codigo.toString().padStart(6, "0");
  }

  private sanatizeManager(user: Manager | null) {
    if (!user) return null;

    const { data_criacao, data_atualizacao, userId, deleted, ...rest } =
      user.toJSON();
    return rest;
  }

  async create(userInfo: ICreateUserInput) {
    const user = await this.userService.createUser({ ...userInfo, role: 0 });

    const manager = await this.managerRepo.create({
      userId: user.id,
      hospitalCode: this.genNumericCode(),
    });

    const sanatizedManager = this.sanatizeManager(manager);

    return { ...sanatizedManager, ...user };
  }
}
