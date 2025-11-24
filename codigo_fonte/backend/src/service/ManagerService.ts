import { UserService } from "../service/UserService";
import { TokenUtils } from "../utils/TokenUtils";
import { ICreateUserInput } from "../interfaces/user/ICreateUser";
import { ManagerRepository } from "../repositories/ManagerRepository";
import { BadRequestError } from "../utils/errors/BadRequestError";
import { IUserQueryParams } from "../interfaces/user/IUserQueryParams";
import { UserRole } from "../enums/User/UserRole";
import { Transactional } from "../utils/Transaction";
import { IManager } from "../interfaces/manager/IManager";
import { IUser } from "../interfaces/user/IUser";

export class ManagerService {
  private userService = new UserService();
  private managerRepo = new ManagerRepository();
  private tokenUtils = new TokenUtils();

  genNumericCode(): string {
    const codigo = Math.floor(Math.random() * 1000000);
    return codigo.toString().padStart(6, "0");
  }

  async generateAddEmployeToken(userId: number) {
    const hospitalCode = await this.getHospitalCode(userId);
    const token = await this.tokenUtils.generateEmployeeToken(hospitalCode);

    return token;
  }

  @Transactional()
  async create(userInfo: ICreateUserInput): Promise<IManager & IUser> {
    const user = await this.userService.createUser({
      ...userInfo,
      role: UserRole.ADMIN,
    });

    if (!user) throw new BadRequestError("Erro ao criar usuário");

    let hospitalCode: string;
    let isUnique = false;

    while (!isUnique) {
      hospitalCode = this.genNumericCode();
      const existing = await this.managerRepo.findByHospitalCode(hospitalCode);
      isUnique = !existing;
    }

    const manager = await this.managerRepo.create({
      userId: user.id,
      hospitalCode: hospitalCode!,
    });

    const sanitizedManager = manager.sanitize();
    return { ...sanitizedManager, ...user };
  }

  async getHospitalCode(userId: number): Promise<string> {
    const manager = await this.managerRepo.findByUserId(userId);
    if (!manager) throw new BadRequestError("Administrador não encontrado");

    return manager.hospitalCode;
  }

  async checkIfCodeExists(hospitalCode: string): Promise<boolean> {
    const existing = await this.managerRepo.findByHospitalCode(hospitalCode);
    return !!existing;
  }

  async getAdminsPaginated(queryParams: IUserQueryParams, managerId: number) {
    return await this.userService.getUsersPaginated(
      {
        ...queryParams,
        role: UserRole.ADMIN,
      },
      managerId
    );
  }
}
