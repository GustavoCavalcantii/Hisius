import bcrypt from "bcrypt";
import { UserService } from "../service/UserService";
import { TokenRepository } from "../repositories/TokenRepository.js";
import { BadRequestError } from "../utils/errors/BadResquestError";
import { ForbiddenError } from "../utils/errors/ForbiddenError";
import { ITokenPayload } from "../interfaces/ITokenPayload";
import { TokenUtils } from "../utils/TokenUtils";
import { EmailUtils } from "../utils/EmailUtils";

export class AuthService {
  private userService = new UserService();
  private tokenRepo = new TokenRepository();
  private tokenUtils = new TokenUtils();
  private emailUtils = new EmailUtils();

  async requestResetToken(email: string) {
    const user = await this.userService.getUserByEmail(email);

    const resetPassToken = this.tokenUtils.generateResetPassToken(user.id);

    this.emailUtils.sendResetEmail(user.email, user.name, resetPassToken);
  }

  private async validateRefreshToken(token: string): Promise<ITokenPayload> {
    try {
      const payload = this.tokenUtils.validateRefreshToken(token);
      if (typeof payload.id !== "number") {
        throw new ForbiddenError("Token inválido");
      }

      const exists = await this.tokenRepo.findRefreshToken(payload.id, token);
      if (!exists) throw new ForbiddenError("Token inválido");

      return payload;
    } catch {
      throw new ForbiddenError("Refresh token inválido ou expirado");
    }
  }

  async logout(token: string) {
    const { id: userId } = await this.validateRefreshToken(token);
    const deleted = await this.tokenRepo.deleteRefreshToken(userId, token);

    if (!deleted) throw new ForbiddenError("Token inválido");
    return true;
  }

  async refreshToken(oldToken: string) {
    const { id: userId, role } = await this.validateRefreshToken(oldToken);

    const accessToken = this.tokenUtils.generateAccessToken(userId, role);

    const refreshToken = this.tokenUtils.generateRefreshToken(userId, role);

    await this.tokenRepo.saveOrUpdateRefreshToken(userId, refreshToken);

    return { accessToken, refreshToken };
  }

  async login(email: string, password: string) {
    const user = await this.userService.getUserByEmail(email);
    if (!user)
      throw new BadRequestError("Email ou senha inválido", [
        { field: "email", message: "Email inválido" },
        { field: "password", message: "Senha inválido" },
      ]);

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid)
      throw new BadRequestError("Email ou senha inválido", [
        { field: "email", message: "Email inválido" },
        { field: "password", message: "Senha inválido" },
      ]);

    const accessToken = this.tokenUtils.generateAccessToken(user.id, user.role);

    const refreshToken = this.tokenUtils.generateRefreshToken(
      user.id,
      user.role
    );

    await this.tokenRepo.saveOrUpdateRefreshToken(user.id, refreshToken);

    const { password: _, ...safeUser } = user;
    return { user: safeUser, accessToken, refreshToken };
  }
}
