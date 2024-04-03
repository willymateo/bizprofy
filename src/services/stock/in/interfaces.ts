import { Warehouse } from "../../warehouses/interfaces";
import { AuditFields, Order } from "../../interfaces";
import { Product } from "../../products/interfaces";

export interface GetStockInPayload {
  transactionDateGreaterThanOrEqualTo?: string;
  transactionDateLessThanOrEqualTo?: string;
  quantityGreaterThanOrEqualTo?: number;
  quantityLessThanOrEqualTo?: number;
  orderByField?: string;
  productIds?: string[];
  offset?: number;
  limit?: number;
  order?: Order;
}

export interface GetStockInResponse {
  rows: StockIn[];
  count: number;
}

export interface CreateStockInPayload {
  transactionDate?: string;
  warehouseId: string;
  productId: string;
  quantity: number;
  unitCost: number;
}

export interface StockIn extends AuditFields {
  transactionDate: string;
  warehouse: Warehouse;
  quantity: number;
  unitCost: number;
  product: Product;
  id: string;
}