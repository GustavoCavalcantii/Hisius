import bcrypt from "bcrypt";
import { ICreateUserInput } from "../interfaces/user/ICreateUser";
import { UserRepository } from "../repositories/UserRepository";
import User from "../database/models/User.js";
import { BadRequestError } from "../utils/errors/BadRequestError";
import { UserRole } from "../enums/User/UserRole";

const SALT_ROUNDS = 10;

export class UserService {
  private userRepo = new UserRepository();

  private sanitizeUser(user: User | null) {
    if (!user) return null;

    const { data_criacao, data_atualizacao, deleted, ...rest } = user.toJSON();
    return rest;
  }

  async deleteUser(user: User) {
    return await this.userRepo.delete(user.id);
  }

  async getUserById(id: number) {
    const user = await this.userRepo.findById(id);
    if (!user) throw new BadRequestError("Usuário não encontrado");

    const { password, ...rest } = this.sanitizeUser(user);

    return rest;
  }

  async createUser(userInput: ICreateUserInput) {
    const hashedPassword = await bcrypt.hash(userInput.password, SALT_ROUNDS);
    const user = await this.userRepo.create({
      ...userInput,
      password: hashedPassword,
    });

    const { password, ...rest } = this.sanitizeUser(user);

    return rest;
  }

  async updateRole(newRole: UserRole, userId: number) {
    const user = await this.userRepo.findById(userId);
    if (!user) throw new BadRequestError("Usuário não encontrado.");

    if (user?.role === newRole)
      throw new BadRequestError("Nível de acesso não pode ser o mesmo");

    const updateUser = await this.userRepo.updateRole(newRole, userId);

    return this.sanitizeUser(updateUser);
  }

  async changeEmail(userId: number, email: string) {
    const user = await this.userRepo.findById(userId);
    if (!user) throw new BadRequestError("Usuário não encontrado.");

    const newUser = await this.userRepo.updateEmail(user.id, email);
    return this.sanitizeUser(newUser);
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
    return this.sanitizeUser(newUser);
  }

  async getUserByEmail(email: string) {
    const user = await this.userRepo.findByEmail(email);
    if (!user) throw new BadRequestError("Usuário não encontrado.");

    return this.sanitizeUser(user);
  }
}
