"use client";

import { useTranslations } from "next-intl";
import { ApexOptions } from "apexcharts";
import ApexChart from "react-apexcharts";
import Card from "@mui/material/Card";

import { GENERAL_OPTIONS } from "../constants";

const Profits = () => {
  const t = useTranslations();

  const data = {
    "2021-01-01": {
      sales: 100,
      expenses: 50,
      profit: 89,
    },
    "2021-01-02": {
      sales: 200,
      expenses: 100,
      profit: 900,
    },
    "2021-01-03": {
      sales: 300,
      expenses: 150,
      profit: 877,
    },
    "2021-01-04": {
      sales: 150,
      expenses: 75,
      profit: 443,
    },
    "2021-01-05": {
      sales: 95,
      expenses: 47,
      profit: 34,
    },
    "2021-01-06": {
      sales: 200,
      expenses: 100,
      profit: 843,
    },
    "2021-01-07": {
      sales: 700,
      expenses: 350,
      profit: 350,
    },
    "2021-01-08": {
      sales: 300,
      expenses: 150,
      profit: 150,
    },
    "2021-01-09": {
      sales: 150,
      expenses: 75,
      profit: 75,
    },
    "2021-01-10": {
      sales: 95,
      expenses: 47,
      profit: 48,
    },
    "2021-01-11": {
      sales: 200,
      expenses: 100,
      profit: 893,
    },
    "2021-01-12": {
      sales: 700,
      expenses: 350,
      profit: 555,
    },
    "2021-01-13": {
      sales: 300,
      expenses: 150,
      profit: 111,
    },
    "2021-01-14": {
      sales: 150,
      expenses: 75,
      profit: 75,
    },
    "2021-01-15": {
      sales: 95,
      expenses: 47,
      profit: 777,
    },
    "2021-01-16": {
      sales: 200,
      expenses: 100,
      profit: 333,
    },
    "2021-01-17": {
      sales: 700,
      expenses: 350,
      profit: 350,
    },
    "2021-01-18": {
      sales: 300,
      expenses: 150,
      profit: 150,
    },
    "2021-01-19": {
      sales: 150,
      expenses: 75,
      profit: 75,
    },
    "2021-01-20": {
      sales: 95,
      expenses: 47,
      profit: 48,
    },
    "2021-01-21": {
      sales: 200,
      expenses: 100,
      profit: 100,
    },
    "2021-01-22": {
      sales: 700,
      expenses: 350,
      profit: 350,
    },
    "2021-01-23": {
      sales: 300,
      expenses: 150,
      profit: 150,
    },
    "2021-01-24": {
      sales: 150,
      expenses: 75,
      profit: 75,
    },
    "2021-01-25": {
      sales: 95,
      expenses: 47,
      profit: 48,
    },
    "2021-01-26": {
      sales: 200,
      expenses: 100,
      profit: 100,
    },
    "2021-01-27": {
      sales: 700,
      expenses: 350,
      profit: 48,
    },
    "2021-01-28": {
      sales: 300,
      expenses: 150,
      profit: 150,
    },
    "2021-01-29": {
      sales: 150,
      expenses: 75,
      profit: 48,
    },
    "2021-01-30": {
      sales: 95,
      expenses: 47,
      profit: 48,
    },
    "2021-01-31": {
      sales: 200,
      expenses: 100,
      profit: 100,
    },
  };

  const options: ApexOptions = {
    ...GENERAL_OPTIONS,
    chart: {
      ...GENERAL_OPTIONS.chart,
      id: "profit-chart",
    },
    title: {
      text: "$300,652",
      offsetX: 30,
      style: {
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
      data: Object.values(data).map(item => item.profit),
    },
  ];

  return (
    <Card className="flex-1">
      <ApexChart type="area" options={options} series={series} />
    </Card>
  );
};

export { Profits };
