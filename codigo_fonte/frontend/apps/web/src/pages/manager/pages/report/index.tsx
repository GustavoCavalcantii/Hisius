import { color } from "@hisius/ui/theme/colors";
import { QueueHeader } from "../../../../components/navbar";
import { Sidebar } from "../../components/sidebar";
import SimpleBarChart from "./SimplesBarChart";
import {
  Container,
  GraphContainer,
  GraphHourContainer,
  GraphTitle,
  HourContainer,
  PeakContainer,
  EmptyStateContainer,
  EmptyStateText,
} from "./styles";
import DonutChart from "./DonutChart";
import { useEffect, useState } from "react";
import { Admin } from "@hisius/services";
import { useNotification } from "../../../../components/notification/context";
import type { ReportInfo } from "@hisius/interfaces";
import { formatTime } from "../../../../utils";
import Toggle from "../../../employee/components/toggle";
import { usePageTitle } from "../../../../hooks/PageTitle";

export function Report() {
  const colors = (): string[] => {
    const days = [
      "domingo",
      "segunda",
      "terça",
      "quarta",
      "quinta",
      "sexta",
      "sábado",
    ];
    const today = new Date().getDay();

    return days.map((_, index) =>
      index === today ? color.primary : color.text
    );
  };

  const formatDate = (date: Date) => {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const adminService = new Admin();
  const { addNotification } = useNotification();
  const [isMounted, setIsMounted] = useState(false);
  const [isMonthly, setIsMonthly] = useState(false);
  const [reportData, setReportData] = useState<ReportInfo>();
  const [hasData, setHasData] = useState(false);

  usePageTitle("Relatórios - Hisius");

  const weekDays = ["DOM", "SEG", "TER", "QUA", "QUI", "SEX", "SAB"] as const;

  const mappedPeakDemand = weekDays.map(
    (day) => reportData?.peakDemand[day] ?? 0
  );

  const checkDataAvailability = (data: ReportInfo | undefined): boolean => {
    if (!data) return false;

    const hasAvgTimeTreatment =
      data.avgTimeTreatmentInSec &&
      data.avgTimeTreatmentInSec.length > 0 &&
      data.avgTimeTreatmentInSec.some((item) => item.count > 0);

    const hasAvgTimeTriage =
      data.avgTimeTriageInSec &&
      data.avgTimeTriageInSec.length > 0 &&
      data.avgTimeTriageInSec.some((item) => item.count > 0);

    const hasPeakDemand =
      data.peakDemand &&
      Object.values(data.peakDemand).some((value) => value > 0);

    return hasAvgTimeTreatment || hasAvgTimeTriage || hasPeakDemand;
  };

  useEffect(() => {
    const fetchReportData = async () => {
      try {
        const today = new Date();
        let startDate: string;
        let endDate: string;

        if (isMonthly) {
          const startOfMonth = new Date(
            today.getFullYear(),
            today.getMonth(),
            1
          );
          const endOfMonth = new Date(
            today.getFullYear(),
            today.getMonth() + 1,
            0
          );
          startDate = formatDate(startOfMonth);
          endDate = formatDate(endOfMonth);
        } else {
          const dayOfWeek = today.getDay();
          const startOfWeek = new Date(today);
          startOfWeek.setDate(today.getDate() - dayOfWeek);
          const endOfWeek = new Date(startOfWeek);
          endOfWeek.setDate(startOfWeek.getDate() + 6);
          startDate = formatDate(startOfWeek);
          endDate = formatDate(endOfWeek);
        }

        const hospitalInfo = await adminService.getReport(startDate, endDate);
        setReportData(hospitalInfo);
        setHasData(checkDataAvailability(hospitalInfo));
      } catch (error) {
        addNotification("Erro ao buscar informações", "error");
        setHasData(false);
      }
    };

    fetchReportData();
    setIsMounted(true);
  }, [isMonthly]);

  const handleToggleChange = async (checked: boolean) => {
    setIsMonthly(checked);
  };

  const EmptyState = () => (
    <EmptyStateContainer>
      <EmptyStateText>Dados insuficientes</EmptyStateText>
    </EmptyStateContainer>
  );

  return (
    <>
      <Sidebar />
      <Container className="containerSide">
        <QueueHeader queueTitle="Relatórios" queueSubtitle="Semana | Mês" />

        <Toggle
          labels={{ on: "Semanal", off: "Mensal" }}
          onToggle={handleToggleChange}
        />

        {!hasData ? (
          <EmptyState />
        ) : (
          <>
            <HourContainer>
              <GraphHourContainer>
                <GraphTitle>Tempo médio de espera (atendimento):</GraphTitle>
                <GraphContainer>
                  {reportData?.avgTimeTreatmentInSec &&
                  reportData.avgTimeTreatmentInSec.length > 0 &&
                  reportData.avgTimeTreatmentInSec.some(
                    (item) => item.count > 0
                  ) ? (
                    <DonutChart
                      labels={
                        reportData.avgTimeTreatmentInSec.map((item) =>
                          formatTime(item.averageWaitTime)
                        ) || []
                      }
                      data={
                        reportData.avgTimeTreatmentInSec.map(
                          (item) => item.count
                        ) || []
                      }
                      color={color.primary}
                      height="100%"
                    />
                  ) : (
                    <EmptyState />
                  )}
                </GraphContainer>
              </GraphHourContainer>

              <GraphHourContainer>
                <GraphTitle>Tempo médio de espera (triagem):</GraphTitle>
                <GraphContainer>
                  {reportData?.avgTimeTriageInSec &&
                  reportData.avgTimeTriageInSec.length > 0 &&
                  reportData.avgTimeTriageInSec.some(
                    (item) => item.count > 0
                  ) ? (
                    <DonutChart
                      labels={
                        reportData.avgTimeTriageInSec.map((item) =>
                          formatTime(item.averageWaitTime)
                        ) || []
                      }
                      data={
                        reportData.avgTimeTriageInSec.map(
                          (item) => item.count
                        ) || []
                      }
                      color={color.primary}
                      width="300px"
                      height="100%"
                    />
                  ) : (
                    <EmptyState />
                  )}
                </GraphContainer>
              </GraphHourContainer>
            </HourContainer>

            <PeakContainer>
              <GraphTitle>Pico de demanda:</GraphTitle>
              {reportData?.peakDemand &&
              Object.values(reportData.peakDemand).some(
                (value) => value > 0
              ) ? (
                <SimpleBarChart
                  labels={weekDays.slice()}
                  data={mappedPeakDemand}
                  colors={colors()}
                  height={300}
                />
              ) : (
                <EmptyState />
              )}
            </PeakContainer>
          </>
        )}
      </Container>
    </>
  );
}
