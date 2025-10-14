import { Model, DataTypes, Sequelize } from "sequelize";

export class EstatisticaFila extends Model {
  declare id: number;
  declare data: Date;
  declare fila: 'triagem' | 'atendimento';
  declare tempo_medio_espera_minutos: number;
  declare pico_demanda: number | null;
  declare total_atendidos: number;

  static initialize(sequelize: Sequelize): void {
    EstatisticaFila.init({
      id: { type: DataTypes.INTEGER.UNSIGNED,
         autoIncrement: true, 
         primaryKey: true },

      data: { type: DataTypes.DATEONLY,
         allowNull: false },

      fila: { type: DataTypes.ENUM('triagem', 'atendimento'), 
        allowNull: false },

      tempo_medio_espera_minutos: { type: DataTypes.INTEGER, 
        allowNull: false },

      pico_demanda: { type: DataTypes.INTEGER,
         allowNull: true },

      total_atendidos: { type: DataTypes.INTEGER, 
        allowNull: false },

    }, { sequelize, tableName: 'estatisticas_fila',
       createdAt: 'criado_em', 
       updatedAt: false });
  }

  
}

export default EstatisticaFila;