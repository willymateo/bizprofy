import { AuditFields, Order } from "../interfaces";
import { Product } from "../products/interfaces";

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

export interface Stock extends AuditFields {
  transactionDate: string;
  stockType: StockType;
  quantity: number;
  product: Product;
  id: string;
}

export enum CreatableStockTypes {
  stockIn = "stock_in",
  stockOut = "stock_out",
}

export enum ExtraStockTypes {
  openingStock = "opening_stock",
  currentStock = "current_stock",
}

export type StockTypes = CreatableStockTypes | ExtraStockTypes;

export interface StockType extends AuditFields {
  type: StockTypes;
  id: number;
}
