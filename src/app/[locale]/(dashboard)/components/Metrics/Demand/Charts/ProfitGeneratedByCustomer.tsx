"use client";

import { useTranslations } from "next-intl";
import ApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import Card from "@mui/material/Card";
import dayjs from "dayjs";

import { DATE_FORMAT } from "../constants";

const ProfitGeneratedByCustomer = () => {
  const t = useTranslations();

  const startDate = dayjs().subtract(30, "days").format(DATE_FORMAT);
  const endDate = dayjs().format(DATE_FORMAT);

  const data = {
    "Odalys Isabel Muñoz Limones": {
      profit: 700,
      sales: 600,
    },
    "Marta López": {
      profit: 90,
      sales: 80,
    },
    "Javier García": {
      profit: 350,
      sales: 200,
    },
    "Cristina Salazar": {
      profit: 290,
      sales: 150,
    },
    "Raquel Muñoz Limones": {
      profit: 100,
      sales: 50,
    },
  };

  const options: ApexOptions = {
    title: {
      text: t("Profit generated by customer"),
      style: {
        fontSize: "24px",
      },
    },
    xaxis: {
      categories: Object.keys(data),
    },
    fill: {
      type: ["solid", "gradient"],
      gradient: {
        stops: [0, 100, 100, 100],
        inverseColors: false,
        opacityFrom: 0.85,
        type: "vertical",
        opacityTo: 0.55,
        shade: "light",
      },
      opacity: [0.85, 0.25],
    },
    subtitle: {
      text: `${t("From")} ${startDate} ${t("to")} ${endDate}`,
      style: {
        fontSize: "14px",
      },
    },
    plotOptions: {
      bar: {
        columnWidth: "5%",
        borderRadius: 2,
      },
    },
    stroke: {
      curve: "smooth",
      width: [0, 2],
    },
    yaxis: {
      min: 0,
    },
  };

  const series = [
    {
      name: t("Profit"),
      type: "column",
      data: Object.values(data).map(({ profit = 0 }) => profit),
    },
    {
      name: t("Sales"),
      type: "area",
      data: Object.values(data).map(({ sales = 0 }) => sales),
    },
  ];

  return (
    <Card className="col-start-1 col-end-3">
      <ApexChart type="line" options={options} series={series} height={300} />
    </Card>
  );
};

export { ProfitGeneratedByCustomer };
