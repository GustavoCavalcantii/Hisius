import { RefreshToken } from "../database/models/Token";

export class TokenRepository {
  async saveRefreshToken(userId: number, token: string) {
    return RefreshToken.create({ userId, token });
  }

  async findRefreshToken(userId: number, token: string) {
    return RefreshToken.findOne({ where: { userId, token } });
  }

  async findRefreshTokenByUser(userId: number) {
    return RefreshToken.findOne({ where: { userId } });
  }

  async saveOrUpdateRefreshToken(userId: number, newToken: string) {
    const existing = await this.findRefreshTokenByUser(userId);
    if (existing) {
      existing.token = newToken;
      await existing.save();
      return;
    }

    await this.saveRefreshToken(userId, newToken);
  }

  async deleteRefreshToken(userId: number, token: string) {
    return RefreshToken.destroy({ where: { usuario_id: userId, token } });
  }
}
