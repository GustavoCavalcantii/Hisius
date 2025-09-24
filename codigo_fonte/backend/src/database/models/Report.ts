import { Model, DataTypes } from "sequelize";
import { sequelize } from "../Connection";
import Attendance from "./Attendance";

export class Report extends Model {
  declare id: number;
  declare attendanceId: number;
  declare averageTime: string;

  declare data_criacao: Date;
}

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

Attendance.hasMany(Report, { foreignKey: "atendimento_id", as: "reports" });
Report.belongsTo(Attendance, {
  foreignKey: "atendimento_id",
  as: "attendance",
});

export default Report;
