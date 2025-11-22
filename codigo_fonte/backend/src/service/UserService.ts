import bcrypt from "bcrypt";
import { ICreateUserInput } from "../interfaces/user/ICreateUser";
import { UserRepository } from "../repositories/UserRepository";
import User from "../database/models/User";
import { BadRequestError } from "../utils/errors/BadRequestError";
import { UserRole } from "../enums/User/UserRole";
import { IUserQueryParams } from "../interfaces/user/IUserQueryParams";
import { IUser } from "../interfaces/user/IUser";
import { IPagination } from "../interfaces/queue/IPagination";

const SALT_ROUNDS = 10;

export class UserService {
  private userRepo = new UserRepository();

  async getUsersPaginated(
    queryParams: IUserQueryParams
  ): Promise<{ users: IUser[] | null; pagination: IPagination }> {
    const { page = 0, limit = 10, name, role } = queryParams;

    const offset = page * limit;

    const result = await this.userRepo.findPaginated({
      offset,
      limit,
      name,
      role,
    });

    const totalPages = Math.ceil(result.total / limit);
    const hasNext = page < totalPages - 1;
    const hasPrev = page > 0;

    const sanitizedUsers = result.users
      .map((user) => user.sanitize())
      .filter((user): user is IUser => user !== null);

    return {
      users: sanitizedUsers,
      pagination: {
        currentPage: page,
        totalPages,
        totalItems: result.total,
        itemsPerPage: limit,
        hasNext,
        hasPrev,
        nextPage: hasNext ? page + 1 : null,
        prevPage: hasPrev ? page - 1 : null,
      },
    };
  }

  async deleteUser(user: User) {
    return await this.userRepo.delete(user.id);
  }

  async getUserById(id: number) {
    const user = await this.userRepo.findById(id);
    if (!user) throw new BadRequestError("Usuário não encontrado");

    return user.sanitize();
  }

  async createUser(userInput: ICreateUserInput, options?: any) {
    const hashedPassword = await bcrypt.hash(userInput.password, SALT_ROUNDS);
    const user = await this.userRepo.create(
      {
        ...userInput,
        password: hashedPassword,
      },
      options
    );

    if (!user) throw new Error("Erro ao criar usuário");
    return user.sanitize();
  }

  async updateRole(newRole: UserRole, userId: number) {
    const user = await this.userRepo.findById(userId);
    if (!user) throw new BadRequestError("Usuário não encontrado.");

    if (user?.role === newRole)
      throw new BadRequestError("Nível de acesso não pode ser o mesmo");

    const updateUser = await this.userRepo.updateRole(newRole, userId);

    return updateUser.sanitize();
  }

  async changeEmail(userId: number, email: string) {
    const user = await this.userRepo.findById(userId);
    if (!user) throw new BadRequestError("Usuário não encontrado.");

    const newUser = await this.userRepo.updateEmail(user.id, email);
    return newUser.sanitize();
  }

  async changePassword(userId: number, password: string) {
    const user = await this.userRepo.findById(userId);
    if (!user) throw new BadRequestError("Usuário não encontrado.");

    const isEqual = await bcrypt.compare(password, user.password);

    if (isEqual) {
      throw new BadRequestError("Nova senha inválida", [
        {
          field: "password",
          message: "A nova senha não pode ser igual à senha antiga",
        },
      ]);
    }

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    const newUser = await this.userRepo.updatePassword(user.id, hashedPassword);
    return newUser.sanitize();
  }

  async getById(userId: number) {
    const user = await this.userRepo.findById(userId);
    if (!user) throw new BadRequestError("Usuário não encontrado.");

    return user.sanitize();
  }

  async getUserByEmail(email: string) {
    const user = await this.userRepo.findByEmail(email);
    if (!user) throw new BadRequestError("Usuário não encontrado.");

    return user;
  }
}
