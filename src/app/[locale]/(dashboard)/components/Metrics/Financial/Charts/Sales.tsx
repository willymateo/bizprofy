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

const Sales = ({ data }: Props) => {
  let totalPriceSumInThePeriod = 0;
  const t = useTranslations();

  Object.values(data).forEach(({ totalPriceSum = 0 }) => {
    totalPriceSumInThePeriod += totalPriceSum;
  });

  const options: ApexOptions = {
    ...GENERAL_OPTIONS,
    chart: {
      ...GENERAL_OPTIONS.chart,
      id: "sales-chart",
    },
    colors: ["#DCE6EC"],
    title: {
      text: `$${totalPriceSumInThePeriod}`,
      offsetX: 30,
      style: {
        fontSize: "24px",
      },
    },
    subtitle: {
      text: t("Sales"),
      offsetX: 30,
      style: {
        fontSize: "14px",
      },
    },
    labels: Object.keys(data),
  };

  const series = [
    {
      name: t("Sales"),
      data: Object.values(data).map(({ totalPriceSum = 0 }) => totalPriceSum),
    },
  ];

  return (
    <Card className="flex-1">
      <ApexChart type="area" options={options} series={series} height={215} />
    </Card>
  );
};

export { Sales };
