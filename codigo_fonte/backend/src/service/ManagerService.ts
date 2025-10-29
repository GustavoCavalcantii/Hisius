import { UserService } from "../service/UserService";
import { TokenUtils } from "../utils/TokenUtils";
import { ICreateUserInput } from "../interfaces/user/ICreateUser";
import { ManagerRepository } from "../repositories/ManagerRepository";
import Manager from "../database/models/Manager";
import { BadRequestError } from "../utils/errors/BadRequestError";
import { IUserQueryParams } from "../interfaces/user/IUserQueryParams";
import { UserRole } from "../enums/User/UserRole";
import { getSequelize } from "../database/Connection";
import { Transactional } from "../utils/Transaction";

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

  @Transactional()
  async create(userInfo: ICreateUserInput) {
    const user = await this.userService.createUser({ ...userInfo, role: 0 });

    if (!user) throw new Error("Erro ao criar usuário");

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

  async getAdminsPaginated(queryParams: IUserQueryParams) {
    return await this.userService.getUsersPaginated({
      ...queryParams,
      role: UserRole.ADMIN,
    });
  }
}
