import { Model, DataTypes, Sequelize } from "sequelize";
import User from "./User";
import { IModel } from "../../interfaces/IModel";

export class Log extends Model {
  declare id: number;
  declare userId: number;
  declare description: string;

  declare data_criacao: Date;

  static initialize(sequelize: Sequelize): void {
    Log.init(
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
        description: {
          type: DataTypes.TEXT,
          allowNull: false,
          field: "descricao",
        },
      },
      {
        sequelize,
        tableName: "Atendimento",
        timestamps: true,
        createdAt: "data_criacao",
        updatedAt: false,
      }
    );
  }

  static associate(): void {
    User.hasMany(Log, { foreignKey: "usuario_id", as: "logs" });
    Log.belongsTo(User, { foreignKey: "usuario_id", as: "user" });
  }
}

export default Log;
