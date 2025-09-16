  import { DataTypes, Model } from "sequelize";
  import { sequelize } from "../Connection";
  import { Gender } from "../../enums/User/Gender";
  import { IUser } from "../../interfaces/user/IUser";

  class User extends Model<IUser> implements IUser {
    declare id: number;
    declare nome: string;
    declare email: string;
    declare senha: string;
    declare cpf: string | null;
    declare telefone: string | null;
    declare sexo: Gender | null;
    declare data_nascimento: Date | null;
    declare nivel_acesso: number;
  }

  User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      nome: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING(150),
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      senha: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
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
      nivel_acesso: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "Usuario",
      timestamps: true,
      createdAt: "data_criacao",
      updatedAt: "data_atualizacao",
    }
  );
  export default User;
