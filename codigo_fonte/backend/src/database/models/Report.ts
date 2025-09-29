import { Model, DataTypes, Sequelize } from "sequelize";
import Attendance from "./Attendance";
import { IModel } from "../../interfaces/IModel";

export class Report extends Model implements IModel {
  declare id: number;
  declare attendanceId: number;
  declare averageTime: string;

  declare data_criacao: Date;

  initialize(sequelize: Sequelize): void {
    Report.init(
      {
        id: {
          type: DataTypes.INTEGER.UNSIGNED,
          autoIncrement: true,
          primaryKey: true,
        },
        attendanceId: {
          type: DataTypes.INTEGER.UNSIGNED,
          allowNull: false,
          field: "atendimento_id",
        },
        averageTime: {
          type: DataTypes.TEXT,
          allowNull: false,
          field: "tempo_medio",
        },
      },
      {
        sequelize,
        tableName: "Relatorio",
        timestamps: true,
        createdAt: "data_criacao",
        updatedAt: false,
      }
    );
  }
  associate(): void {
    Attendance.hasMany(Report, { foreignKey: "atendimento_id", as: "reports" });
    Report.belongsTo(Attendance, {
      foreignKey: "atendimento_id",
      as: "attendance",
    });
  }
}

export default Report;
