import { Model, DataTypes, Sequelize } from "sequelize";
import User from "./User";
import Patient from "./Patient";
import { ManchesterClassification } from "../../enums/Queue/ManchesterClassification";
import { Destination } from "../../enums/Attendance/Destination";
import { AttendanceStatus } from "../../enums/Attendance/AttendanceStatus";
import { IAttendance } from "../../interfaces/attendance/IAttendance";

export class Attendance extends Model {
  declare id: number;
  declare userId: number;
  declare patientId: number;

  declare entryDate: Date;
  declare attendanceDate: Date;
  declare dischargeDate: Date | null;

  declare priority: ManchesterClassification;
  declare mainComplaint: string;
  declare currentIllnessHistory: string | null;
  declare allergies: string | null;
  declare currentMedications: string | null;

  declare mainDiagnosis: string | null;
  declare secondaryDiagnoses: string | null;
  declare proceduresPerformed: string | null;

  declare destination: Destination;
  declare referralTo: string | null;
  declare dischargeNotes: string | null;

  declare status: AttendanceStatus;
  declare createdAt: Date;
  declare updatedAt: Date;

  sanitize(): IAttendance {
    return {
      id: this.id,
      userId: this.userId,
      patientId: this.patientId,

      entryDate: this.entryDate,
      attendanceDate: this.attendanceDate,
      dischargeDate: this.dischargeDate,

      priority: this.priority,
      mainComplaint: this.mainComplaint,
      currentIllnessHistory: this.currentIllnessHistory,
      allergies: this.allergies,
      currentMedications: this.currentMedications,

      mainDiagnosis: this.mainDiagnosis,
      secondaryDiagnoses: this.secondaryDiagnoses,
      proceduresPerformed: this.proceduresPerformed,

      destination: this.destination,
      referralTo: this.referralTo,
      dischargeNotes: this.dischargeNotes,

      status: this.status,
    };
  }

  static initialize(sequelize: Sequelize): void {
    Attendance.init(
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
        patientId: {
          type: DataTypes.INTEGER.UNSIGNED,
          allowNull: false,
          field: "paciente_id",
        },

        entryDate: {
          type: DataTypes.DATE,
          allowNull: false,
          field: "data_entrada",
        },
        attendanceDate: {
          type: DataTypes.DATE,
          allowNull: false,
          field: "data_atendimento",
        },
        dischargeDate: {
          type: DataTypes.DATE,
          allowNull: true,
          field: "data_alta",
        },

        priority: {
          type: DataTypes.ENUM(...Object.values(ManchesterClassification)),
          allowNull: false,
          field: "prioridade",
        },
        mainComplaint: {
          type: DataTypes.STRING(500),
          allowNull: false,
          field: "queixa_principal",
        },
        currentIllnessHistory: {
          type: DataTypes.TEXT,
          allowNull: true,
          field: "historico_doenca_atual",
        },
        allergies: {
          type: DataTypes.TEXT,
          allowNull: true,
          field: "alergias",
        },
        currentMedications: {
          type: DataTypes.TEXT,
          allowNull: true,
          field: "medicamentos_uso",
        },

        mainDiagnosis: {
          type: DataTypes.STRING(500),
          allowNull: true,
          field: "diagnostico_principal",
        },
        secondaryDiagnoses: {
          type: DataTypes.TEXT,
          allowNull: true,
          field: "diagnosticos_secundarios",
        },
        proceduresPerformed: {
          type: DataTypes.TEXT,
          allowNull: true,
          field: "procedimentos_realizados",
        },

        destination: {
          type: DataTypes.ENUM(...Object.values(Destination)),
          allowNull: false,
          defaultValue: Destination.DISCHARGE,
          field: "destino",
        },
        referralTo: {
          type: DataTypes.STRING(300),
          allowNull: true,
          field: "encaminhamento_para",
        },
        dischargeNotes: {
          type: DataTypes.TEXT,
          allowNull: true,
          field: "observacoes_alta",
        },

        status: {
          type: DataTypes.ENUM(...Object.values(AttendanceStatus)),
          allowNull: false,
          defaultValue: AttendanceStatus.COMPLETED,
          field: "status",
        },
      },
      {
        sequelize,
        tableName: "Atendimento",
        timestamps: true,
        createdAt: "data_criacao",
        updatedAt: "data_atualizacao",
      }
    );
  }

  static associate?(): void {
    Attendance.belongsTo(User, {
      foreignKey: "userId",
      as: "user",
    });

    Attendance.belongsTo(Patient, {
      foreignKey: "patientId",
      as: "patient",
    });

    User.hasMany(Attendance, {
      foreignKey: "userId",
      as: "psAttendances",
    });

    Patient.hasMany(Attendance, {
      foreignKey: "patientId",
      as: "psAttendances",
    });
  }
}

export default Attendance;
