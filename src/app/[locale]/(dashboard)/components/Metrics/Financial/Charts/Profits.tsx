"use client";

import { useTranslations } from "next-intl";
import { ApexOptions } from "apexcharts";
import ApexChart from "react-apexcharts";
import Card from "@mui/material/Card";

import { GENERAL_OPTIONS, PROFIT_COLORS } from "../constants";
import { StockStatusData } from "@/services/stock/types";

type Props = {
  data: StockStatusData;
};

const Profits = ({ data }: Props) => {
  let totalProfitInThePeriod = 0;
  let color = PROFIT_COLORS.ZERO;
  const t = useTranslations();

  Object.values(data).forEach(({ profit = 0 }) => {
    totalProfitInThePeriod += profit;
  });

  if (totalProfitInThePeriod > 0) {
    color = PROFIT_COLORS.POSITIVE;
  } else if (totalProfitInThePeriod < 0) {
    color = PROFIT_COLORS.NEGATIVE;
  }

  const options: ApexOptions = {
    ...GENERAL_OPTIONS,
    chart: {
      ...GENERAL_OPTIONS.chart,
      id: "profit-chart",
    },
    title: {
      text: `$${totalProfitInThePeriod?.toFixed(2)}`,
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
