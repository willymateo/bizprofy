"use client";

import { useTranslations } from "next-intl";
import { ApexOptions } from "apexcharts";
import ApexChart from "react-apexcharts";
import Card from "@mui/material/Card";

import { StockStatusData } from "@/services/stock/types";
import { GENERAL_OPTIONS } from "../constants";

type Props = {
  data: StockStatusData;
};

const Profits = ({ data }: Props) => {
  let totalProfitInThePeriod = 0;
  const t = useTranslations();

  Object.values(data).forEach(({ profit = 0 }) => {
    totalProfitInThePeriod += profit;
  });

  const color = totalProfitInThePeriod > 0 ? "#6bce70" : "#ff4560";

  const options: ApexOptions = {
    ...GENERAL_OPTIONS,
    chart: {
      ...GENERAL_OPTIONS.chart,
      id: "profit-chart",
    },
    title: {
      text: `$${totalProfitInThePeriod}`,
      offsetX: 30,
      style: {
        color,
        fontSize: "24px",
      },
    },
    subtitle: {
      text: t("Profits"),
      offsetX: 30,
      style: {
        fontSize: "14px",
      },
    },
    labels: Object.keys(data),
  };

  const series = [
    {
      name: t("Profits"),
      data: Object.values(data).map(({ profit = 0 }) => profit),
    },
  ];

  return (
    <Card className="flex-1">
      <ApexChart type="area" options={options} series={series} height={215} />
    </Card>
  );
};

export { Profits };
