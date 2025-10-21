import { DataTypes, Model, Sequelize } from "sequelize";

export class QueueEvent extends Model {
  declare id: string;
  declare patientId: string;
  declare queue: "triagem" | "atendimento";
  declare enteredAt: Date;
  declare startedAt: Date | null;
  declare finishedAt: Date | null;
  declare queueId: string;
  declare createdAt: Date;
  declare updatedAt: Date;

  static initialize(sequelize: Sequelize): void {
    QueueEvent.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        patientId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          field: "paciente_id",
        },
        queueId: {
          type: DataTypes.STRING,
          allowNull: false,
          field: "fila_id",
        },
        queue: {
          type: DataTypes.ENUM("triagem", "atendimento"),
          allowNull: false,
          field: "fila",
        },
        enteredAt: {
          type: DataTypes.DATE,
          allowNull: false,
          field: "entrou_em",
        },
        startedAt: {
          type: DataTypes.DATE,
          allowNull: true,
          field: "iniciou_em",
        },
      },
      {
        sequelize,
        tableName: "fila_eventos",
        timestamps: false,
      }
    );
  }
}

export default QueueEvent;
