import { chartsConfig } from "@/configs";

const completedTasksChart = {
  type: "line",
  height: 220,
  options: {
    ...chartsConfig,
    colors: ["#388e3c"],
    stroke: {
      lineCap: "round",
    },
    markers: {
      size: 5,
    },
    xaxis: {
      ...chartsConfig.xaxis,
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
    },
  },
  series: [
    {
      name: "Total donasi",
      data: [25000, 50, 50, 50, 40, 300, 220, 500, 250, 400, 230, 500],
    },
  ],
};

export const statisticsChartsData = [
  {
    color: "white",
    title: "Total Donasi",
    description: "Hasil Donasi Yang Sudah Diterima",
    chart: completedTasksChart,
  },
];

export default statisticsChartsData;
