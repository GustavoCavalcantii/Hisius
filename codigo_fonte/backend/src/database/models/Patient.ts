import { DataTypes, Model } from "sequelize";
import { Gender } from "../../enums/User/Gender";
import { sequelize } from "../Connection";
import User from "./User";

export class Patient extends Model {
  declare id: number;
  declare userId: number;
  declare cpf: string;
  declare gender: Gender;
  declare phone: string;
  declare birthDate: Date;

  declare data_criacao: Date;
  declare data_atualizacao: Date;
}

Patient.init(
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
    cpf: {
      type: DataTypes.STRING(14), // formato: 000.000.000-00
      allowNull: true,
      unique: true,
    },
    phone: {
      type: DataTypes.STRING(20), // formato: (00) 00000-0000
      allowNull: true,
      field: "telefone",
    },
    gender: {
      type: DataTypes.ENUM(...Object.values(Gender)),
      allowNull: true,
      field: "sexo",
    },
    birthDate: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      field: "data_nascimento",
    },
  },
  {
    sequelize,
    tableName: "paciente",
    timestamps: true,
    createdAt: "data_criacao",
    updatedAt: "data_atualizacao",
  }
);

Patient.belongsTo(User, { foreignKey: "usuario_id", as: "user" });
User.hasOne(Patient, { foreignKey: "usuario_id", as: "patient" });

export default Patient;
