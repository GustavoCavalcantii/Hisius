import { DataTypes, Model, Sequelize } from "sequelize";
import User from "./User";
import { IManager } from "../../interfaces/manager/IManager";

export class Manager extends Model {
  declare id: number;
  declare userId: number;
  declare hospitalCode: string;

  declare data_criacao: Date;
  declare data_atualizacao: Date;

  sanitize(): IManager {
    return {
      id: this.id,
      userId: this.userId,
      hospitalCode: this.hospitalCode,
    };
  }

  static initialize(sequelize: Sequelize): void {
    Manager.init(
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
        hospitalCode: {
          type: DataTypes.INTEGER.UNSIGNED,
          allowNull: false,
          field: "codigo_hospital",
        },
      },
      {
        sequelize,
        tableName: "gerente",
        timestamps: true,
        createdAt: "data_criacao",
        updatedAt: "data_atualizacao",
      }
    );
  }
  static associate(): void {
    Manager.belongsTo(User, { foreignKey: "usuario_id", as: "user" });
    User.hasOne(Manager, { foreignKey: "usuario_id", as: "manager" });
  }
}

export default Manager;
