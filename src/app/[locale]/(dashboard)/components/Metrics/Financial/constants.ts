import { ApexOptions } from "apexcharts";

const GENERAL_OPTIONS: ApexOptions = {
  tooltip: {
    y: {
      formatter: (value: number) => `$${value.toFixed(2)}`,
    },
    x: {
      format: "dd MMM yyyy",
    },
  },
  chart: {
    group: "financial-charts",
    sparkline: {
      enabled: true,
    },
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    curve: "straight",
  },
  xaxis: {
    type: "datetime",
  },
  yaxis: {
    min: 0,
  },
};

const PROFIT_COLORS = {
  POSITIVE: "#6bce70",
  NEGATIVE: "#ff4560",
  ZERO: "",
};

export { GENERAL_OPTIONS, PROFIT_COLORS };
