import { Stock } from "@/app/(dashboard)/stock/interfaces";
import { Order } from "../interfaces";

export interface GetStockPayload {
  quantityGreaterThanOrEqualTo?: number;
  quantityLessThanOrEqualTo?: number;
  stockTypeIds?: number[];
  productIds?: string[];
  stockDate?: string;
  offset?: number;
  limit?: number;
  order?: Order;
}

export interface GetStockResponse {
  rows: Stock[];
  count: number;
}

export interface CreateStockPayload {
  stockTypeId: number;
  stockDate?: string;
  productId: string;
  quantity: number;
}
