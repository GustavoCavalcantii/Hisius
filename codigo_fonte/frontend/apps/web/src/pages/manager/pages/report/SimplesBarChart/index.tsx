import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { Bar } from "react-chartjs-2";
import type { ChartOptions } from "chart.js";
import { color } from "@hisius/ui/theme/colors";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  ChartDataLabels
);

interface ShortBarChartProps {
  labels: string[];
  data: number[];
  colors?: string[];
  height?: number | string;
}

const ShortBarChart: React.FC<ShortBarChartProps> = ({
  labels,
  data,
  colors = [
    "rgba(54, 162, 235, 0.8)",
    "rgba(54, 162, 235, 0.8)",
    "rgba(54, 162, 235, 0.8)",
    "rgba(255, 99, 132, 0.8)",
    "rgba(54, 162, 235, 0.8)",
    "rgba(54, 162, 235, 0.8)",
    "rgba(54, 162, 235, 0.8)",
  ],
  height = 150,
}) => {
  const options: ChartOptions<"bar"> = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 1000,
      easing: "easeOutQuart",
    },
    font: {
      family: "montserrat",
      size: 13,
      weight: 300,
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true,
        backgroundColor: color.background,
        titleColor: color.text,
        bodyColor: color.text,
        borderColor: color.gray,
        borderWidth: 0.7,
        cornerRadius: 4,
        displayColors: false,
        callbacks: {
          title: (context) => {
            return `Dia: ${context[0].label}`;
          },
          label: (context) => {
            return `Valor: ${context.parsed.y}`;
          },
        },
      },
      datalabels: {
        display: false,
      },
    },
    scales: {
      x: {
        beginAtZero: true,
        grid: {
          display: false,
        },
        ticks: {
          color: "#666",
        },
        border: {
          display: true,
          color: `${color.text}`,
          width: 1,
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          display: false,
        },
        border: {
          display: true,
          color: `${color.text}`,
          width: 1,
        },
        ticks: {
          display: true,
          font: {
            size: 13,
          },
        },
      },
    },
    elements: {
      bar: {
        borderRadius: 5,
        borderSkipped: false,
      },
    },
  };

  const chartData = {
    labels,
    datasets: [
      {
        data,
        backgroundColor: colors,
        borderWidth: 0,
        barPercentage: 0.5,
        categoryPercentage: 0.7,
      },
    ],
  };

  return (
    <div style={{ height: `${height}px`, width: "100%" }}>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default ShortBarChart;
