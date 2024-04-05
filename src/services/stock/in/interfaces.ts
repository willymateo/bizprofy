import { Warehouse } from "../../warehouses/interfaces";
import { AuditFields, Order } from "../../interfaces";
import { Product } from "../../products/interfaces";

export interface GetStockInPayload {
  transactionDateGreaterThanOrEqualTo?: string;
  transactionDateLessThanOrEqualTo?: string;
  warehouseIds?: string[];
  orderByField?: string;
  productIds?: string[];
  offset?: number;
  limit?: number;
  order?: Order;
}

export interface GetStockInResponse {
  summarizedData: SummarizedStockInData;
  rows: StockIn[];
  count: number;
}

export interface CreateStockInPayload {
  currentStockAtMoment?: number;
  transactionDate?: string;
  warehouseId: string;
  productId: string;
  quantity: number;
  unitCost: number;
}

export interface StockIn extends AuditFields {
  currentStockAtMoment: number;
  transactionDate: string;
  warehouse: Warehouse;
  quantity: number;
  unitCost: number;
  product: Product;
  id: string;
}

export interface SummarizedStockInData {
  totalQuantity: number;
  totalCostSum: number;
}
