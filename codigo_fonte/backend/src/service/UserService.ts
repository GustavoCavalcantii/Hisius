import bcrypt from "bcrypt";
import { ICreateUserInput } from "../interfaces/user/ICreateUser.js";
import { UserRepository } from "../repositories/UserRepository";

const SALT_ROUNDS = 10;

export class UserService {
  private userRepo = new UserRepository();

  private sanitizeUser(user: any) {
    if (!user) return null;

    const { data_criacao, data_atualizacao, ...rest } = user.toJSON();
    return rest;
  }

  async createUser(userInput: ICreateUserInput) {
    const hashedPassword = await bcrypt.hash(userInput.password, SALT_ROUNDS);
    const user = await this.userRepo.create({
      ...userInput,
      password: hashedPassword,
    });

    return this.sanitizeUser(user);
  }

  async getUserByEmail(email: string) {
    const user = await this.userRepo.findByEmail(email);
    return this.sanitizeUser(user);
  }
}
