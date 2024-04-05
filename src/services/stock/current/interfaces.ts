import { Product } from "../../products/interfaces";
import { Order } from "../../interfaces";

export interface GetCurrentStockPayload {
  transactionDateGreaterThanOrEqualTo?: string;
  transactionDateLessThanOrEqualTo?: string;
  warehouseIds?: string[];
  orderByField?: string;
  productIds?: string[];
  offset?: number;
  limit?: number;
  order?: Order;
}

export interface GetCurrentStockResponse {
  summarizedData: SummarizedCurrentStockData;
  rows: CurrentStock[];
  count: number;
}

export interface CurrentStock {
  purchasesNumber: number;
  salesNumber: number;
  totalPrice: number;
  totalCost: number;
  product: Product;
}

export interface SummarizedCurrentStockData {
  totalPurchasesNumber: number;
  totalSalesNumber: number;
  totalPriceSum: number;
  totalCostSum: number;
  profit: number;
}
