import { RefreshToken } from "../database/models/Token";

export class TokenRepository {
  async saveRefreshToken(userId: number, token: string) {
    return RefreshToken.create({ userId, token });
  }

  async findRefreshToken(userId: number, token: string) {
    return RefreshToken.findOne({ where: { userId, token } });
  }

  async updateRefreshToken(userId: number, oldToken: string, newToken: string) {
    const tokenEntry = await this.findRefreshToken(userId, oldToken);
    if (!tokenEntry) throw new Error("Token not found");
    tokenEntry.token = newToken;
    await tokenEntry.save();
    return tokenEntry;
  }

  async deleteRefreshToken(userId: number, token: string) {
    return RefreshToken.destroy({ where: { userId, token } });
  }
}
