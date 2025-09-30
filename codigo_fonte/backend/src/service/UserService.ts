import bcrypt from "bcrypt";
import { ICreateUserInput } from "../interfaces/user/ICreateUser.js";
import { UserRepository } from "../repositories/UserRepository";
import User from "../database/models/User.js";
import { BadRequestError } from "../utils/errors/BadResquestError.js";

const SALT_ROUNDS = 10;

export class UserService {
  private userRepo = new UserRepository();

  async deleteUser(user: User) {
    return await this.userRepo.delete(user.id);
  }
  async getUserById(id: number) {
    const user = await this.userRepo.findById(id);

    if (!user) throw new BadRequestError("Usuário não encontrado");

    const { password, ...rest } = this.sanitizeUser(user);

    return rest;
  }

  private sanitizeUser(user: User | null) {
    if (!user) return null;

    const { data_criacao, data_atualizacao, deleted, ...rest } = user.toJSON();
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

  async getUserByEmail(email: string) {
    const user = await this.userRepo.findByEmail(email);
    return this.sanitizeUser(user);
  }
}
