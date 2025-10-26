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
} from "./styles";
import DonutChart from "./DonutChart";
import { useEffect, useState } from "react";
import { Admin } from "@hisius/services";
import { useNotification } from "../../../../components/notification/context";
import type { ReportInfo } from "@hisius/interfaces";
import { formatTime } from "../../../../utils";
import Toggle from "../../../employee/components/toggle";

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

  const weekDays = ["DOM", "SEG", "TER", "QUA", "QUI", "SEX", "SAB"] as const;

  const mappedPeakDemand = weekDays.map(
    (day) => reportData?.peakDemand[day] ?? 0
  );

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

      } catch (error) {
        addNotification("Erro ao buscar informações", "error");
      }
    };

    fetchReportData();
    setIsMounted(true);
  }, [isMonthly]);

  const handleToggleChange = async (checked: boolean) => {
    setIsMonthly(checked);
  };

  return (
    <>
      <Sidebar />
      <Container className="containerSide">
        <QueueHeader queueTitle="Relatórios" queueSubtitle="Semana | Mês" />

        <Toggle
          labels={{ on: "Semanal", off: "Mensal" }}
          onToggle={handleToggleChange}
        />
        <HourContainer>
          <GraphHourContainer>
            <GraphTitle>Tempo médio de espera (atendimento):</GraphTitle>
            <GraphContainer>
              <DonutChart
                labels={
                  reportData?.avgTimeTreatmentInSec.map((item) =>
                    formatTime(item.averageWaitTime)
                  ) || []
                }
                data={
                  reportData?.avgTimeTreatmentInSec.map((item) => item.count) ||
                  []
                }
                color={color.primary}
                height="100%"
              />
            </GraphContainer>
          </GraphHourContainer>

          <GraphHourContainer>
            <GraphTitle>Tempo médio de espera (triagem):</GraphTitle>
            <GraphContainer>
              <DonutChart
                labels={
                  reportData?.avgTimeTriageInSec.map((item) =>
                    formatTime(item.averageWaitTime)
                  ) || []
                }
                data={
                  reportData?.avgTimeTriageInSec.map((item) => item.count) || []
                }
                color={color.primary}
                width="300px"
                height="100%"
              />
            </GraphContainer>
          </GraphHourContainer>
        </HourContainer>

        <PeakContainer>
          <GraphTitle>Pico de demanda:</GraphTitle>
          <SimpleBarChart
            labels={weekDays.slice()}
            data={mappedPeakDemand}
            colors={colors()}
            height={300}
          />
        </PeakContainer>
      </Container>
    </>
  );
}
