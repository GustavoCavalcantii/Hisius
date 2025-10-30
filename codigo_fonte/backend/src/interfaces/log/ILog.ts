export interface ILog {
  id: number;
  userId: number;
  action: string;
  module: string;
  originIp: string | null;
  userAgent: string | null;
  createdAt: Date;
}
