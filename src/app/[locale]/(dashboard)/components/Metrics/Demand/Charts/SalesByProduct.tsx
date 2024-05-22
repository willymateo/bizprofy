"use client";

import { useTranslations } from "next-intl";
import ApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import Card from "@mui/material/Card";
import dayjs from "dayjs";

import { DATE_FORMAT } from "../constants";

const SalesByProduct = () => {
  const t = useTranslations();

  const startDate = dayjs().subtract(30, "days").format(DATE_FORMAT);
  const endDate = dayjs().format(DATE_FORMAT);

  const sales = {
    Bikini: 700,
    Swimsuit: 250,
    Sunglasses: 500,
    Sunscreen: 90,
    "Beach Towel": 100,
  };

  const options: ApexOptions = {
    title: {
      text: t("Sales by product"),
      style: {
        fontSize: "24px",
      },
    },
    legend: {
      horizontalAlign: "center",
      position: "bottom",
    },
    labels: Object.keys(sales),
    subtitle: {
      text: `${t("From")} ${startDate} ${t("to")} ${endDate}`,
      style: {
        fontSize: "14px",
      },
    },
    dataLabels: {
      enabled: false,
    },
  };

  const series = Object.values(sales);

  return (
    <Card>
      <ApexChart type="pie" options={options} series={series} height={300} />
    </Card>
  );
};

export { SalesByProduct };
