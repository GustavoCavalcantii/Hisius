import { DataTypes } from "sequelize";
import { sequelize } from "../Connection";
import Attendance from "./Attendance";

const Report = sequelize.define(
  "Relatorio",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    atendimento_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    tempo_medio: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    tableName: "Relatorio",
    timestamps: true,
    createdAt: "data_criacao",
    updatedAt: false,
  }
);

Attendance.hasMany(Report, { foreignKey: "atendimento_id", as: "relatorio" });
Report.belongsTo(Attendance, { foreignKey: "atendimento_id", as: "atendimento" });

export default Report;
