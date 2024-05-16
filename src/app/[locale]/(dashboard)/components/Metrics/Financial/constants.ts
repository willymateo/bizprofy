import { ApexOptions } from "apexcharts";

const GENERAL_OPTIONS: ApexOptions = {
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

export { GENERAL_OPTIONS };
