import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";

interface ApexChartProps {
  title: string; // Titolo del grafico
  expensesData: number[]; // Valori delle uscite
  revenueData: number[]; // Valori delle entrate
}

const ApexChart: React.FC<ApexChartProps> = ({
  title,
  expensesData,
  revenueData,
}) => {
  const [state, setState] = useState({
    series: [
      {
        name: "Expenses",
        data: expensesData,
      },
      {
        name: "Revenue",
        data: revenueData,
      },
    ],
    options: {
      chart: {
        height: 350,
        type: "line" as const,
        zoom: {
          enabled: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth" as const,
      },
      title: {
        text: title,
        align: "center" as const,
      },
      grid: {
        row: {
          colors: ["#f3f3f3", "transparent"],
          opacity: 0.5,
        },
      },
      xaxis: {
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
  });
  useEffect(() => {
    setState((prevState) => ({
      ...prevState,
      series: [
        {
          name: "Expenses",
          data: expensesData,
        },
        {
          name: "Revenue",
          data: revenueData,
        },
      ],
    }));
  }, [expensesData, revenueData]);

  return (
    <div>
      <ReactApexChart
        options={state.options}
        series={state.series}
        type="line"
        height={350}
      />
    </div>
  );
};

export default ApexChart;
