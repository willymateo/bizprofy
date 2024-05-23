"use client";

import { useTranslations } from "next-intl";
import ApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import Card from "@mui/material/Card";
import dayjs from "dayjs";

import { ProductCategoriesStockStatusData } from "@/services/products/categories/types";
import { DATE_FORMAT } from "../constants";

type Props = {
  data: ProductCategoriesStockStatusData[];
  startDate: string;
  endDate: string;
};

const SalesByProductCategory = ({ data, startDate, endDate }: Props) => {
  const t = useTranslations();

  const options: ApexOptions = {
    title: {
      text: t("Sales by product category"),
      style: {
        fontSize: "18px",
      },
    },
    legend: {
      horizontalAlign: "center",
      position: "bottom",
    },
    labels: data.map(item => item?.productCategory?.name ?? t("No category")),
    subtitle: {
      text: `${t("From")} ${dayjs(startDate).format(DATE_FORMAT)} ${t("to")} ${dayjs(endDate).format(DATE_FORMAT)}`,
      style: {
        fontSize: "14px",
      },
    },
    dataLabels: {
      enabled: false,
    },
  };

  const series = data.map(({ totalQuantity = 0 }) => totalQuantity);

  return (
    <Card>
      <ApexChart type="pie" options={options} series={series} height={300} />
    </Card>
  );
};

export { SalesByProductCategory };
