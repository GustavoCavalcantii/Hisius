export interface ILogFilter {
  page?: number;
  limit: number;
  offset?: number;
  userId?: number;
  action?: string;
  module?: string;
}
