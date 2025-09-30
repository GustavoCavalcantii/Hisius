import jwt, { Secret, SignOptions } from "jsonwebtoken";
import { TokenType } from "../enums/Token/TokenTypes";
import { CONFIG } from "../config/Env";
import { ITokenPayload } from "../interfaces/ITokenPayload";

const ACCESS_SECRET = CONFIG.tokens.accessSecret;
const REFRESH_SECRET = CONFIG.tokens.refreshSecret;
const RESET_PASS_SECRET = CONFIG.tokens.resetPassSecret;

const ACCESS_EXP = "15m";
const REFRESH_EXP = "7d";
const RESET_EXP = "15m";

export class TokenUtils {
  private generateToken(
    payload: {},
    type: TokenType,
    secret: Secret,
    options?: SignOptions
  ): string {
    return jwt.sign({ ...payload, type }, secret, options);
  }

  private generateAuthToken(
    userId: number,
    role: number,
    secret: Secret,
    options?: SignOptions
  ): string {
    return this.generateToken(
      { id: userId, role },
      TokenType.AUTH,
      secret,
      options
    );
  }

  public generateResetPassToken(userId: number): string {
    return this.generateToken(
      { id: userId },
      TokenType.RESET_PASS,
      RESET_PASS_SECRET,
      { expiresIn: RESET_EXP }
    );
  }

  public generateAccessToken(userId: number, role: number): string {
    return this.generateToken(
      { id: userId, role },
      TokenType.AUTH,
      ACCESS_SECRET,
      { expiresIn: ACCESS_EXP }
    );
  }

  public generateRefreshToken(userId: number, role: number): string {
    return this.generateToken(
      { id: userId, role },
      TokenType.AUTH,
      REFRESH_SECRET,
      { expiresIn: REFRESH_EXP }
    );
  }

  public validateRefreshToken(token: string) {
    return jwt.verify(token, REFRESH_SECRET) as ITokenPayload;
  }

  public validateResetPassToken(token: string) {
    return jwt.verify(token, RESET_PASS_SECRET) as ITokenPayload;
  }

  public validateAcessToken(token: string) {
    return jwt.verify(token, ACCESS_SECRET) as ITokenPayload;
  }
}
