import { DataTypes } from "sequelize";
import { sequelize } from "../Connection";
import User from "./User";

const Attendance = sequelize.define(
  "Atendimento",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    usuario_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    descricao: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    tableName: "Atendimento",
    timestamps: true,
    createdAt: "data_criacao",
    updatedAt: false,
  }
);

User.hasMany(Attendance, { foreignKey: "usuario_id", as: "atendimento" });
Attendance.belongsTo(User, { foreignKey: "usuario_id", as: "usuario" });

export default Attendance;
