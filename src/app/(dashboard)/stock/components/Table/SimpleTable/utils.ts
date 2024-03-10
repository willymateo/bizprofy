import { CreatableStockTypes, Stock } from "../../../interfaces";
import { TableData } from "./interfaces";

const getTableData = ({ rows = [] }: { rows: Stock[] }): TableData => {
  let totalPriceSum = 0;
  let totalQuantity = 0;
  let totalCostSum = 0;

  rows?.forEach(({ product, quantity = 0, stockType }) => {
    totalQuantity += quantity;

    if (stockType?.type === CreatableStockTypes.stockIn) {
      totalCostSum += (quantity ?? 0) * (product.unitCost ?? 0);
    } else if (stockType?.type === CreatableStockTypes.stockOut) {
      totalPriceSum += (quantity ?? 0) * (product.unitPrice ?? 0);
    }
  });

  return {
    bodyRowData: rows,
    footerData: {
      totalQuantity,
      totalPriceSum,
      totalCostSum,
    },
  };
};

export { getTableData };
