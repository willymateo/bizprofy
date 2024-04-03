import { Warehouse } from "../../warehouses/interfaces";
import { AuditFields, Order } from "../../interfaces";
import { Product } from "../../products/interfaces";

export interface GetCurrentStockPayload {
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

export interface GetCurrentStockResponse {
  rows: CurrentStock[];
  count: number;
}

export interface CurrentStock extends AuditFields {
  transactionDate: string;
  warehouse: Warehouse;
  quantity: number;
  unitCost: number;
  product: Product;
  id: string;
}
