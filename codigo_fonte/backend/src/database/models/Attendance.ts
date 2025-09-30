import { Model, DataTypes, Sequelize } from "sequelize";
import User from "./User";
import { IModel } from "../../interfaces/IModel";

export class Attendance extends Model{
  declare id: number;
  declare userId: number;
  declare description: string;

  declare data_criacao: Date;

  static initialize(sequelize: Sequelize): void {
    Attendance.init(
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
  static associate?(): void {
    Attendance.belongsTo(User, { foreignKey: "usuario_id", as: "user" });
    User.hasMany(Attendance, { foreignKey: "usuario_id", as: "attendances" });
  }
}

export default Attendance;
