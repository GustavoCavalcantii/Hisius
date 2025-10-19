export interface IReportResponse {
  avgTimeTreatmentInSec: number[];
  avgTimeTriageInSec: { averageWaitTime: number; count: number }[];
  peakDemand: { [key: string]: number };
}
