import { Type } from "class-transformer";
import {
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from "class-validator";
import { Destination } from "../../enums/Attendance/Destination";
import { AttendanceStatus } from "../../enums/Attendance/AttendanceStatus";

export class AttendanceDto {
  /**
   * Data de alta
   */
  @IsOptional({ groups: ["create", "update"] })
  @Type(() => Date)
  @IsDate({
    message: "A Data de alta deve ser uma data válida",
    groups: ["create", "update"],
  })
  dischargeDate?: Date | null;

  /**
   * Queixa principal
   */
  @IsNotEmpty({
    message: "A Queixa principal é obrigatória",
    groups: ["create"],
  })
  @IsString({
    message: "A Queixa principal deve ser um texto",
    groups: ["create", "update"],
  })
  mainComplaint: string;

  /**
   * Histórico da doença atual
   */
  @IsOptional({ groups: ["create", "update"] })
  @IsString({
    message: "O Histórico da doença atual deve ser um texto",
    groups: ["create", "update"],
  })
  currentIllnessHistory?: string | null;

  /**
   * Alergias
   */
  @IsOptional({ groups: ["create", "update"] })
  @IsString({
    message: "As Alergias devem ser um texto",
    groups: ["create", "update"],
  })
  allergies?: string | null;

  /**
   * Medicamentos atuais
   */
  @IsOptional({ groups: ["create", "update"] })
  @IsString({
    message: "Os Medicamentos atuais devem ser um texto",
    groups: ["create", "update"],
  })
  currentMedications?: string | null;

  /**
   * Diagnóstico principal
   */
  @IsOptional({ groups: ["create", "update"] })
  @IsString({
    message: "O Diagnóstico principal deve ser um texto",
    groups: ["create", "update"],
  })
  mainDiagnosis?: string | null;

  /**
   * Diagnósticos secundários
   */
  @IsOptional({ groups: ["create", "update"] })
  @IsString({
    message: "Os Diagnósticos secundários devem ser um texto",
    groups: ["create", "update"],
  })
  secondaryDiagnoses?: string | null;

  /**
   * Procedimentos realizados
   */
  @IsOptional({ groups: ["create", "update"] })
  @IsString({
    message: "Os Procedimentos realizados devem ser um texto",
    groups: ["create", "update"],
  })
  proceduresPerformed?: string | null;

  /**
   * Destino
   */
  @IsEnum(Destination, {
    message: "O Destino deve ser um destino válido",
    groups: ["create", "update"],
  })
  destination: Destination;

  /**
   * Encaminhamento para
   */
  @IsOptional({ groups: ["create", "update"] })
  @IsString({
    message: "O Encaminhamento para deve ser um texto",
    groups: ["create", "update"],
  })
  referralTo?: string | null;

  /**
   * Notas de alta
   */
  @IsOptional({ groups: ["create", "update"] })
  @IsString({
    message: "As Notas de alta devem ser um texto",
    groups: ["create", "update"],
  })
  dischargeNotes?: string | null;

  /**
   * Status do atendimento
   */
  @IsEnum(AttendanceStatus, {
    message: "O status deve ser um status de atendimento válido",
    groups: ["create", "update"],
  })
  status: AttendanceStatus;
}
