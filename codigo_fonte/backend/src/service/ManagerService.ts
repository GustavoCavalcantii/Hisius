import { UserService } from "../service/UserService";
import { TokenUtils } from "../utils/TokenUtils";
import { ICreateUserInput } from "../interfaces/user/ICreateUser";
import { ManagerRepository } from "../repositories/ManagerRepository";
import Manager from "../database/models/Manager";
import { BadRequestError } from "../utils/errors/BadResquestError";

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

  async generateAddEmployeToken(userId: number) {
    const hospitalCode = await this.getHospitalCode(userId);
    const token = await this.tokenUtils.generateEmployeeToken(hospitalCode);

    return token;
  }

  async getHospitalCode(userId: number): Promise<string> {
    const manager = await this.managerRepo.findByUserId(userId);
    if (!manager) throw new BadRequestError("Administrador não encontrado");

    return manager.hospitalCode;
  }
}
