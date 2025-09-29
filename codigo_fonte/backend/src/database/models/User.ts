import { DataTypes, Model, Sequelize } from "sequelize";

export class User extends Model {
  declare id: number;
  declare name: string;
  declare email: string;
  declare password: string;
  declare role: number;
  declare deleted: boolean;

  declare data_criacao: Date;
  declare data_atualizacao: Date;

  static initialize(sequelize: Sequelize): void {
    User.init(
      {
        id: {
          type: DataTypes.INTEGER.UNSIGNED,
          autoIncrement: true,
          primaryKey: true,
        },
        name: {
          type: DataTypes.STRING(100),
          allowNull: false,
          field: "nome",
        },
        email: {
          type: DataTypes.STRING(150),
          allowNull: false,
          unique: true,
          validate: {
            isEmail: true,
          },
        },
        deleted: {
          type: DataTypes.BOOLEAN,
          defaultValue: false,
          field: "deletado",
        },
        password: {
          type: DataTypes.STRING(255),
          allowNull: false,
          field: "senha",
        },
        role: {
          type: DataTypes.INTEGER,
          allowNull: false,
          defaultValue: 1,
          field: "nivel_acesso",
        },
      },
      {
        sequelize,
        tableName: "usuario",
        timestamps: true,
        createdAt: "data_criacao",
        updatedAt: "data_atualizacao",
      }
    );
  }
}

export default User;
