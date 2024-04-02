import { GetStockInResponse } from "@/services/stockIn/interfaces";
import { TableData } from "./interfaces";

const getTableData = ({ rows = [], count }: GetStockInResponse): TableData => {
  let totalQuantity = 0;
  let totalCostSum = 0;

  rows?.forEach(({ unitCost, quantity = 0 }) => {
    totalQuantity += quantity;

    totalCostSum += unitCost * quantity;
  });

  return {
    footerData: {
      totalQuantity,
      totalCostSum,
    },
    bodyData: rows,
    count,
  };
};

export { getTableData };
