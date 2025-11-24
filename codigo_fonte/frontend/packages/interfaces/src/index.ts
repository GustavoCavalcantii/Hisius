import { ManchesterTriage } from "packages/enums/src";

export interface PatientCalledData {
  message: string;
  room: string;
}

export interface SocketEvents {
  "paciente-chamado": (data: PatientCalledData) => void;
  connect: () => void;
  disconnect: () => void;
  connect_error: (error: Error) => void;
  [key: string]: (...args: any[]) => void;
}

export interface UseSocketReturn {
  isConnected: boolean;
  lastNotification: PatientCalledData | null;
  emitEvent: <T>(event: string, data: T) => void;
}
export interface IPatient {
  id?: number;
  gender: "MASCULINO" | "FEMININO";
  name: string;
  cpf: string;
  birthDate: string;
  cnsNumber: string;
  email: string;
  phone: string;
  motherName: string;
  dateHourAttendance?: string;
  age?: number;
  attendanceId?: number;
  classification?: ManchesterTriage;
  position?: number;
}

export interface IQueuedInfo {
  id: number;
  classification: ManchesterTriage;
  estimatedWaitMinutes: number;
  roomCalled: string;
  queueType: string;
}

export interface ApiResponse {
  success: boolean;
  message: string;
  statusCode: number;
  data?: any;
  errors?: ApiError[];
}

export interface UserResponse {
  users: User[];
  pagination: Pagination;
}

export interface ApiError {
  field: string;
  message: string;
}

export interface AvgTime {
  averageWaitTime: number;
  count: number;
}

export interface PeakDemand {
  DOM?: number;
  SEG?: number;
  TER?: number;
  QUA?: number;
  QUI?: number;
  SEX?: number;
  SAB?: number;
}

export interface LogData {
  id: number;
  userId: number;
  action: string;
  module: string;
  originIp: string;
  userAgent: string;
  createdAt: string;
}

export interface IEmployee {
  name: string;
}
export interface ReportInfo {
  avgTimeTreatmentInSec: AvgTime[];
  avgTimeTriageInSec: AvgTime[];
  peakDemand: PeakDemand;
}

export interface User {
  id: number;
  name: string;
  email: string;
  role: number;
}

export interface Pagination {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  hasNext: boolean;
  hasPrev: boolean;
  nextPage: number | null;
  prevPage: number | null;
}
