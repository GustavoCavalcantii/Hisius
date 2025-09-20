import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserService } from "../service/UserService";
import { TokenRepository } from "../repositories/TokenRepository.js";
import { BadRequestError } from "../utils/Errors/BadResquestError";

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET!;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET!;
const ACCESS_TOKEN_EXP = "15m";
const REFRESH_TOKEN_EXP = "7d";

export class AuthService {
  private userService = new UserService();
  private tokenRepo = new TokenRepository();

  async login(email: string, password: string) {
    const user = await this.userService.getUserByEmail(email);
    if (!user) throw new BadRequestError("Email ou senha inválido");

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) throw new BadRequestError("Email ou senha inválido");

    const accessToken = jwt.sign(
      { userId: user.id, role: user.role },
      ACCESS_TOKEN_SECRET,
      { expiresIn: ACCESS_TOKEN_EXP }
    );
    const refreshToken = jwt.sign({ userId: user.id }, REFRESH_TOKEN_SECRET, {
      expiresIn: REFRESH_TOKEN_EXP,
    });

    await this.tokenRepo.saveRefreshToken(user.id, refreshToken);

    const { senha, ...safeUser } = user;
    return {
      user: safeUser,
      accessToken,
      refreshToken,
    };
  }
}
