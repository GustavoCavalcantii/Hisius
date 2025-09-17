import { DataTypes, Model } from "sequelize";
import { Gender } from "../../enums/User/Gender";
import { sequelize } from "../Connection";
import User from "./User";
import { IPatient } from "../../interfaces/patient/IPatient";

class Patient extends Model<IPatient> implements IPatient {
  declare id: number;
  declare usuario_id: number;
  declare cpf: string;
  declare sexo: Gender;
  declare telefone: string;
  declare data_nascimento: Date;
}

Patient.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    usuario_id: { type: DataTypes.INTEGER, allowNull: false },
    cpf: {
      type: DataTypes.STRING(14), // formato: 000.000.000-00
      allowNull: true,
      unique: true,
    },
    telefone: {
      type: DataTypes.STRING(20), // formato: (00) 00000-0000
      allowNull: true,
    },
    sexo: {
      type: DataTypes.ENUM(...Object.values(Gender)),
      allowNull: true,
    },
    data_nascimento: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: "Paciente",
    timestamps: true,
    createdAt: "data_criacao",
    updatedAt: "data_atualizacao",
  }
);

Patient.belongsTo(User, { foreignKey: "usuario_id" });
User.hasOne(Patient, { foreignKey: "usuario_id" });

export default Patient;
