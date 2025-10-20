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

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const data = [25, 50, 75, 100, 100, 100, 100];

  return (
    <>
      <Sidebar />
      <Container className="containerSide">
        <QueueHeader queueTitle="Relatórios" queueSubtitle="Semana | Mês" />

        <HourContainer>
          <GraphHourContainer>
            <GraphTitle>Tempo médio de espera (atendimento):</GraphTitle>
            <GraphContainer>
              <DonutChart
                labels={["Item 1", "Item 2", "Item 3"]}
                data={[30, 40, 30]}
                color={color.primary}
                width="100%"
              />
            </GraphContainer>
          </GraphHourContainer>

          <GraphHourContainer>
            <GraphTitle>Tempo médio de espera (triagem):</GraphTitle>
            <GraphContainer>
              <DonutChart
                labels={["Item 1", "Item 2", "Item 3"]}
                data={[30, 40, 30]}
                color={color.primary}
                width="100%"
              />
            </GraphContainer>
          </GraphHourContainer>
        </HourContainer>

        <PeakContainer>
          <GraphTitle>Pico de demanda:</GraphTitle>
          <SimpleBarChart
            labels={["DOM", "SEG", "TER", "QUA", "QUI", "SEX", "SAB"]}
            data={isMounted ? data : []}
            colors={colors()}
            height={300}
          />
        </PeakContainer>
      </Container>
    </>
  );
}
