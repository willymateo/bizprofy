import { GetStockOutResponse } from "@/services/stockOut/interfaces";
import { TableData } from "./interfaces";

const getTableData = ({ rows = [], count }: GetStockOutResponse): TableData => {
  let totalQuantity = 0;
  let totalPriceSum = 0;

  rows?.forEach(({ unitPrice, quantity = 0 }) => {
    totalQuantity += quantity;

    totalPriceSum += unitPrice * quantity;
  });

  return {
    footerData: {
      totalQuantity,
      totalPriceSum,
    },
    bodyData: rows,
    count,
  };
};

export { getTableData };
