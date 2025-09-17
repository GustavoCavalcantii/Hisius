import { DataTypes } from "sequelize";
import { sequelize } from "../Connection";
import User from "./User";

const Log = sequelize.define(
  "Registro",
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

User.hasMany(Log, { foreignKey: "usuario_id", as: "atendimento" });
Log.belongsTo(User, { foreignKey: "usuario_id", as: "usuario" });

export default Log;
