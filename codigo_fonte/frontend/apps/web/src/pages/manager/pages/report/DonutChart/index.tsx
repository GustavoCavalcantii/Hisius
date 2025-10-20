import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import type { ChartOptions } from "chart.js";
import { color } from "@hisius/ui/theme/colors";
import ChartDataLabels from "chartjs-plugin-datalabels";

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

interface DonutChartProps {
  labels: string[];
  data: number[];
  color?: string;
  height?: number | string;
  width?: number | string;
}

const DonutChart: React.FC<DonutChartProps> = ({
  labels,
  data,
  color: mcolor = "rgba(54, 162, 235, 0.8)",
  height = 300,
  width = 300,
}) => {
  const options: ChartOptions<"doughnut"> = {
    responsive: true,
    maintainAspectRatio: false,
    font: {
      family: "montserrat",
      size: 13,
      weight: 300,
    },
    cutout: "70%",
    layout: {
      padding: {
        right: 40,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true,
        backgroundColor: color.front,
        titleColor: color.text,
        bodyColor: color.text,
        borderColor: color.gray,
        borderWidth: 0.7,
        cornerRadius: 4,
        displayColors: false,
        callbacks: {
          title: () => {
            return ``;
          },
          label: (context) => {
            return `Valor: ${context.parsed}`;
          },
        },
      },
      datalabels: {
        color: color.text,
        formatter: (value: number) => {
          return value;
        },
        anchor: "end",
        align: "end",
        offset: 5,
        display: (context) => {
          const value = context.dataset.data[context.dataIndex];
          return typeof value === "number" && value > 5;
        },
        font: {
          family: "montserrat",
          size: 13,
          weight: 300,
        },
      },
    },
    elements: {
      arc: {
        borderWidth: 2,
        borderColor: "#fff",
      },
    },
  };

  const chartData = {
    labels,
    datasets: [
      {
        data,
        backgroundColor: Array(data.length).fill(mcolor),
        borderWidth: 2,
        borderColor: "#fff",
      },
    ],
  };

  return (
    <div
      style={{
        height: `${height}px`,
        width: `${width}px`,
        position: "relative",
      }}
    >
      <Doughnut data={chartData} options={options} />
    </div>
  );
};

export default DonutChart;
