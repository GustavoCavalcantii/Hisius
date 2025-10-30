export interface ILogCreate {
  userId: number;
  action: string;
  module: string;
  originIp?: string | null;
  userAgent?: string | null;
}
