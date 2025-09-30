import bcrypt from "bcrypt";
import { ICreateUserInput } from "../interfaces/user/ICreateUser.js";
import { UserRepository } from "../repositories/UserRepository";
import User from "../database/models/User.js";
import { BadRequestError } from "../utils/errors/BadResquestError.js";
import { TokenUtils } from "../utils/TokenUtils.js";
import { EmailUtils } from "../utils/EmailUtils.js";

const SALT_ROUNDS = 10;

export class UserService {
  private userRepo = new UserRepository();
  private tokenUtils = new TokenUtils();
  private emailUtils = new EmailUtils();

  async deleteUser(user: User) {
    return await this.userRepo.delete(user.id);
  }
  async getUserById(id: number) {
    const user = await this.userRepo.findById(id);

    if (!user) throw new BadRequestError("Usuário não encontrado");

    const { password, ...rest } = this.sanitizeUser(user);

    return rest;
  }

  async requestResetToken(email: string) {
    const user = await this.getUserByEmail(email);

    const resetPassToken = this.tokenUtils.generateResetPassToken(user.id);

    this.emailUtils.sendResetEmail(user.email, user.name, resetPassToken);
  }

  async recoverPassword(password: string, token: string) {
    const resetToken = this.tokenUtils.validateResetPassToken(token);
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
