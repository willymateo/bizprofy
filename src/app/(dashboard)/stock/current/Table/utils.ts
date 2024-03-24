import { CreatableStockTypes, Stock } from "@/services/stock/interfaces";
import { BodyRowData, TableData } from "./interfaces";

const getTableData = ({ rows = [] }: { rows: Stock[] }): TableData => {
  let bodyRowData: Record<string, BodyRowData> = {};
  let totalPurchasesNumber = 0;
  let totalSalesNumber = 0;
  let totalPriceSum = 0;
  let totalCostSum = 0;

  rows?.forEach(({ product, quantity = 0, stockType }) => {
    if (stockType?.type === CreatableStockTypes.stockIn) {
      const newPurchasesNumber = (bodyRowData[product.id]?.purchasesNumber ?? 0) + (quantity ?? 0);
      const newTotalCost =
        (bodyRowData[product.id]?.totalCost ?? 0) + (quantity ?? 0) * (product.unitCost ?? 0);

      bodyRowData = {
        ...(bodyRowData ?? {}),
        [product.id]: {
          ...(bodyRowData[product.id] ?? {}),
          salesNumber: bodyRowData[product.id]?.salesNumber ?? 0,
          totalPrice: bodyRowData[product.id]?.totalPrice ?? 0,
          purchasesNumber: newPurchasesNumber,
          totalCost: newTotalCost,
          product,
        },
      };

      totalCostSum += (quantity ?? 0) * (product.unitCost ?? 0);
      totalPurchasesNumber += quantity ?? 0;
    } else if (stockType?.type === CreatableStockTypes.stockOut) {
      const newTotalPrice =
        (bodyRowData[product.id]?.totalPrice ?? 0) + (quantity ?? 0) * (product.unitPrice ?? 0);
      const newSalesNumber = (bodyRowData[product.id]?.salesNumber ?? 0) + (quantity ?? 0);

      bodyRowData = {
        ...(bodyRowData ?? {}),
        [product.id]: {
          ...(bodyRowData[product.id] ?? {}),
          purchasesNumber: bodyRowData[product.id]?.purchasesNumber ?? 0,
          totalCost: bodyRowData[product.id]?.totalCost ?? 0,
          salesNumber: newSalesNumber,
          totalPrice: newTotalPrice,
          product,
        },
      };

      totalPriceSum += (quantity ?? 0) * (product.unitPrice ?? 0);
      totalSalesNumber += quantity ?? 0;
    }
  });

  return {
    bodyRowData: Object.values(bodyRowData),
    footerData: {
      profit: totalPriceSum - totalCostSum,
      totalPurchasesNumber,
      totalSalesNumber,
      totalPriceSum,
      totalCostSum,
    },
  };
};

const getProfitClassName = ({ profit = 0 }: { profit: number }): string => {
  if (profit === 0) {
    return "";
  }

  if (profit > 0) {
    return "text-green-500";
  }

  return "text-red-500";
};

export { getTableData, getProfitClassName };
