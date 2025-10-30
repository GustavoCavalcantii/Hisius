import { DataTypes, Model, Sequelize } from "sequelize";

export class Log extends Model {
  declare id: number;
  declare userId: number;
  declare action: string;
  declare module: string;
  declare originIp: string | null;
  declare userAgent: string | null;

  declare createdAt: Date;

  static initialize(sequelize: Sequelize): void {
    Log.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        userId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          field: "usuario_id",
        },
        action: {
          type: DataTypes.STRING(100),
          allowNull: false,
          field: "acao",
        },
        module: {
          type: DataTypes.STRING(50),
          allowNull: false,
          field: "modulo",
        },
        originIp: {
          type: DataTypes.STRING(45),
          allowNull: true,
          field: "ip_origem",
        },
        userAgent: {
          type: DataTypes.TEXT,
          allowNull: true,
          field: "user_agent",
        },
        createdAt: {
          type: DataTypes.DATE,
          defaultValue: DataTypes.NOW,
          field: "data_criacao",
        },
      },
      {
        sequelize,
        tableName: "registro",
        timestamps: false,
      }
    );
  }
}

export default Log;
