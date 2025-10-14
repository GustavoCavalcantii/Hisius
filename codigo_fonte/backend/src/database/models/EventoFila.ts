import { DataTypes, Model, Sequelize } from "sequelize";
import { Patient } from "./Patient";

export class EventoFila extends Model {
  declare id: number;
  declare paciente_id: number;
  declare fila: 'triagem' | 'atendimento';
  declare entrou_em: Date;
  declare iniciou_em: Date | null;

  static initialize(sequelize: Sequelize): void {
    EventoFila.init({
      id: { type: DataTypes.INTEGER.UNSIGNED,
         autoIncrement: true, 
         primaryKey: true },

      paciente_id: { type: DataTypes.INTEGER.UNSIGNED, 
        allowNull: false },

      fila: { type: DataTypes.ENUM('triagem', 'atendimento'),
         allowNull: false },

      entrou_em: { type: DataTypes.DATE,
         allowNull: false },

      iniciou_em: { type: DataTypes.DATE,
         allowNull: true },

    }, { sequelize, tableName: 'eventos_fila', 
        timestamps: false });
  }

  static associate(): void {
    EventoFila.belongsTo(Patient, { foreignKey: 'paciente_id', as: 'paciente' });
    Patient.hasMany(EventoFila, { foreignKey: 'paciente_id', as: 'eventos' });
  }
}

export default EventoFila;