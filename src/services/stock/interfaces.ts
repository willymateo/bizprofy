import { Stock } from "@/app/(dashboard)/stock/interfaces";
import { Order } from "../interfaces";

export interface GetStockPayload {
  transactionDateGreaterThanOrEqualTo?: string;
  transactionDateLessThanOrEqualTo?: string;
  quantityGreaterThanOrEqualTo?: number;
  quantityLessThanOrEqualTo?: number;
  stockTypeIds?: number[];
  orderByField?: string;
  productIds?: string[];
  offset?: number;
  limit?: number;
  order?: Order;
}

export interface GetStockResponse {
  rows: Stock[];
  count: number;
}

export interface CreateStockPayload {
  transactionDate?: string;
  stockTypeId: number;
  productId: string;
  quantity: number;
}
