import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserService } from "../service/UserService";
import { TokenRepository } from "../repositories/TokenRepository.js";
import { BadRequestError } from "../utils/Errors/BadResquestError";
import { ForbiddenError } from "../utils/Errors/ForbiddenError";
import { ITokenPayload } from "../interfaces/ITokenPayload";

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET!;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET!;
const ACCESS_TOKEN_EXP = "15m";
const REFRESH_TOKEN_EXP = "7d";

export class AuthService {
  private userService = new UserService();
  private tokenRepo = new TokenRepository();

  private generateAccessToken(userId: number, role: number) {
    return jwt.sign({ id: userId, role }, ACCESS_TOKEN_SECRET, {
      expiresIn: ACCESS_TOKEN_EXP,
    });
  }

  private generateRefreshToken(userId: number, role: number) {
    return jwt.sign({ id: userId, role }, REFRESH_TOKEN_SECRET, {
      expiresIn: REFRESH_TOKEN_EXP,
    });
  }

  private async validateRefreshToken(token: string): Promise<ITokenPayload> {
    try {
      const payload = jwt.verify(token, REFRESH_TOKEN_SECRET) as ITokenPayload;

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

    const accessToken = this.generateAccessToken(userId, role);
    const refreshToken = this.generateRefreshToken(userId, role);

    await this.tokenRepo.saveOrUpdateRefreshToken(userId, refreshToken);

    return { accessToken, refreshToken };
  }

  async login(email: string, password: string) {
    const user = await this.userService.getUserByEmail(email);
    if (!user) throw new BadRequestError("Email ou senha inválido");

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) throw new BadRequestError("Email ou senha inválido");

    const accessToken = this.generateAccessToken(user.id, user.role);
    const refreshToken = this.generateRefreshToken(user.id, user.role);

    await this.tokenRepo.saveOrUpdateRefreshToken(user.id, refreshToken);

    const { password: _, ...safeUser } = user;
    return { user: safeUser, accessToken, refreshToken };
  }
}
