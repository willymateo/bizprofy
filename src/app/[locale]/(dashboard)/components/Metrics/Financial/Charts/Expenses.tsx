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

const Expenses = ({ data }: Props) => {
  let totalCostSumInThePeriod = 0;
  const t = useTranslations();

  Object.values(data).forEach(({ totalCostSum = 0 }) => {
    totalCostSumInThePeriod += totalCostSum;
  });

  const options: ApexOptions = {
    ...GENERAL_OPTIONS,
    chart: {
      ...GENERAL_OPTIONS.chart,
      id: "expenses-chart",
    },
    colors: ["#DCE6EC"],
    title: {
      text: `$${totalCostSumInThePeriod}`,
      offsetX: 30,
      style: {
        fontSize: "24px",
      },
    },
    subtitle: {
      text: t("Expenses"),
      offsetX: 30,
      style: {
        fontSize: "14px",
      },
    },
    labels: Object.keys(data),
  };

  const series = [
    {
      name: t("Expenses"),
      data: Object.values(data).map(({ totalCostSum = 0 }) => totalCostSum),
    },
  ];

  return (
    <Card className="flex-1">
      <ApexChart type="area" options={options} series={series} height={215} />
    </Card>
  );
};

export { Expenses };
