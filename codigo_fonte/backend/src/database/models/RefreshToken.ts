import { Model, DataTypes, Sequelize } from "sequelize";
import User from "./User";

export class RefreshToken extends Model {
  declare id: number;
  declare userId: number;
  declare token: string;

  declare data_criacao: Date;
  declare data_atualizacao: Date;

  static initialize(sequelize: Sequelize): void {
    RefreshToken.init(
      {
        id: {
          type: DataTypes.INTEGER.UNSIGNED,
          autoIncrement: true,
          primaryKey: true,
        },
        userId: {
          type: DataTypes.INTEGER.UNSIGNED,
          allowNull: false,
          field: "usuario_id",
        },
        token: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      },
      {
        sequelize,
        tableName: "refresh_tokens",
        timestamps: true,
        createdAt: "data_criacao",
        updatedAt: "data_atualizacao",
      }
    );
  }
  static associate(): void {
    User.hasMany(RefreshToken, { foreignKey: "userId", as: "refreshTokens" });
    RefreshToken.belongsTo(User, { foreignKey: "userId", as: "user" });
  }
}
