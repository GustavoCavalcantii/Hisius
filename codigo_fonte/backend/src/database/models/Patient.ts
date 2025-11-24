import { DataTypes, Model, Sequelize } from "sequelize";
import { Gender } from "../../enums/User/Gender";
import User from "./User";
import { IPatient } from "../../interfaces/patient/IPatient";
import { calculateAge } from "../../utils/CalculateUtils";

export class Patient extends Model {
  declare id: number;
  declare userId: number;
  declare cpf: string;
  declare gender: Gender;
  declare phone: string;
  declare birthDate: Date;

  declare cnsNumber: string;
  declare icePhone: string;
  declare motherName: string;
  declare user?: User;

  declare data_criacao: Date;
  declare data_atualizacao: Date;

  sanitize(): IPatient {
    return {
      id: this.id,
      userId: this.userId,
      cpf: this.cpf,
      gender: this.gender,
      phone: this.phone,
      birthDate: this.birthDate,
      cnsNumber: this.cnsNumber,
      icePhone: this.icePhone,
      motherName: this.motherName,
      age: calculateAge(this.birthDate),
    };
  }

  static initialize(sequelize: Sequelize): void {
    Patient.init(
      {
        id: {
          type: DataTypes.INTEGER.UNSIGNED,
          autoIncrement: true,
          primaryKey: true,
        },
        userId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          unique: true,
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
        cnsNumber: {
          type: DataTypes.STRING(20),
          allowNull: true,
          field: "numero_cns",
        },
        icePhone: {
          type: DataTypes.STRING(20),
          allowNull: true,
          field: "telefone_emergencia",
        },
        motherName: {
          type: DataTypes.STRING(100),
          allowNull: true,
          field: "nome_mae",
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
  }
  static associate(): void {
    Patient.belongsTo(User, { foreignKey: "usuario_id", as: "user" });
    User.hasOne(Patient, { foreignKey: "usuario_id", as: "patient" });
  }
}

export default Patient;
