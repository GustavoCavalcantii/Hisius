import { Model, DataTypes } from "sequelize";
import { sequelize } from "../Connection";
import User from "./User";

export class Log extends Model {
  declare id: number;
  declare userId: number;
  declare description: string;
  
  declare data_criacao: Date;
}

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

// Associações
User.hasMany(Log, { foreignKey: "usuario_id", as: "logs" });
Log.belongsTo(User, { foreignKey: "usuario_id", as: "user" });

export default Log;
