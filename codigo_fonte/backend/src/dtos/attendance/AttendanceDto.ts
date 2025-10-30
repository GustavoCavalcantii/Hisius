import { Type } from "class-transformer";
import {
  IsDate,
  IsEnum,
  IsOptional,
  IsString,
} from "class-validator";
import { Destination } from "../../enums/Attendance/Destination";
import { AttendanceStatus } from "../../enums/Attendance/AttendanceStatus";

export class AttendanceDto {
  /**
   * Data de alta
   */
  @IsOptional({ groups: ["update"] })
  @Type(() => Date)
  @IsDate({
    message: "A Data de alta deve ser uma data válida",
    groups: ["update"],
  })
  dischargeDate?: Date | null;

  /**
   * Queixa principal
   */
  @IsOptional({ groups: ["update"] })
  @IsString({
    message: "A Queixa principal deve ser um texto",
    groups: ["update"],
  })
  mainComplaint: string;

  /**
   * Histórico da doença atual
   */
  @IsOptional({ groups: ["update"] })
  @IsString({
    message: "O Histórico da doença atual deve ser um texto",
    groups: ["update"],
  })
  currentIllnessHistory?: string | null;

  /**
   * Alergias
   */
  @IsOptional({ groups: ["update"] })
  @IsString({
    message: "As Alergias devem ser um texto",
    groups: ["update"],
  })
  allergies?: string | null;

  /**
   * Medicamentos atuais
   */
  @IsOptional({ groups: ["update"] })
  @IsString({
    message: "Os Medicamentos atuais devem ser um texto",
    groups: ["update"],
  })
  currentMedications?: string | null;

  /**
   * Diagnóstico principal
   */
  @IsOptional({ groups: ["update"] })
  @IsString({
    message: "O Diagnóstico principal deve ser um texto",
    groups: ["update"],
  })
  mainDiagnosis?: string | null;

  /**
   * Diagnósticos secundários
   */
  @IsOptional({ groups: ["update"] })
  @IsString({
    message: "Os Diagnósticos secundários devem ser um texto",
    groups: ["update"],
  })
  secondaryDiagnoses?: string | null;

  /**
   * Procedimentos realizados
   */
  @IsOptional({ groups: ["update"] })
  @IsString({
    message: "Os Procedimentos realizados devem ser um texto",
    groups: ["update"],
  })
  proceduresPerformed?: string | null;

  /**
   * Destino
   */
  @IsOptional({ groups: ["update"] })
  @IsEnum(Destination, {
    message: "O Destino deve ser um destino válido",
    groups: ["update"],
  })
  destination: Destination;

  /**
   * Encaminhamento para
   */
  @IsOptional({ groups: ["update"] })
  @IsString({
    message: "O Encaminhamento para deve ser um texto",
    groups: ["update"],
  })
  referralTo?: string | null;

  /**
   * Notas de alta
   */
  @IsOptional({ groups: ["update"] })
  @IsString({
    message: "As Notas de alta devem ser um texto",
    groups: ["update"],
  })
  dischargeNotes?: string | null;

  /**
   * Status do atendimento
   */
  @IsOptional({ groups: ["update"] })
  @IsEnum(AttendanceStatus, {
    message: "O status deve ser um status de atendimento válido",
    groups: ["update"],
  })
  status: AttendanceStatus;
}
