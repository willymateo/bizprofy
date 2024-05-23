import { Order } from "../interfaces";

export type GetStockStatusPayload = {
  transactionDateGreaterThanOrEqualTo?: string;
  transactionDateLessThanOrEqualTo?: string;
  order?: Order;
};

export type GetStockStatusResponse = {
  data: StockStatusData;
};

export type StockStatusData = {
  [transactionDate: string]: StockStatusAtDate;
};

export type StockStatusAtDate = {
  totalStockOutQuantity: number;
  totalStockInQuantity: number;
  totalPriceSum: number;
  totalCostSum: number;
  profit: number;
};
