"use client";

import ApexChart from "react-apexcharts";
import Card from "@mui/material/Card";

import { GENERAL_OPTIONS } from "./constants";

const Financial = () => {
  const sales = {
    "2021-01-01": 100,
    "2021-01-02": 50,
    "2021-01-03": 300,
    "2021-01-04": 150,
    "2021-01-05": 95,
  };

  const salesOptions = {
    ...GENERAL_OPTIONS,
    chart: {
      ...GENERAL_OPTIONS.chart,
      id: "sales-chart",
    },
    colors: ["#DCE6EC"],
    title: {
      text: "$424,652",
      offsetX: 30,
      style: {
        fontSize: "24px",
      },
    },
    subtitle: {
      text: "Sales",
      offsetX: 30,
      style: {
        fontSize: "14px",
      },
    },
    labels: Object.keys(sales),
  };

  const salesSeries = [
    {
      name: "Sales",
      data: Object.values(sales),
    },
  ];

  const expensesOptions = {
    ...GENERAL_OPTIONS,
    chart: {
      ...GENERAL_OPTIONS.chart,
      id: "expenses-chart",
    },
    colors: ["#DCE6EC"],
    title: {
      text: "$551,652",
      offsetX: 30,
      style: {
        fontSize: "24px",
      },
    },
    subtitle: {
      text: "Expenses",
      offsetX: 30,
      style: {
        fontSize: "14px",
      },
    },
    labels: Object.keys(sales),
  };

  const expensesSeries = [
    {
      name: "Expenses",
      data: Object.values(sales),
    },
  ];

  const profitOptions = {
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
      text: "Profits",
      offsetX: 30,
      style: {
        fontSize: "14px",
      },
    },
    labels: Object.keys(sales),
  };

  const profitSeries = [
    {
      name: "Profits",
      data: Object.values(sales),
    },
  ];

  return (
    <div className="flex flex-row flex-wrap gap-5 items-center">
      <Card className="flex-1">
        <ApexChart type="area" options={salesOptions} series={salesSeries} />
      </Card>
      <Card className="flex-1">
        <ApexChart type="area" options={expensesOptions} series={expensesSeries} />
      </Card>
      <Card className="flex-1">
        <ApexChart type="area" options={profitOptions} series={profitSeries} />
      </Card>
    </div>
  );
};

export { Financial };
