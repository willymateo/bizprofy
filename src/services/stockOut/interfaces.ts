import { Warehouse } from "../warehouses/interfaces";
import { Customer } from "../customers/interfaces";
import { AuditFields, Order } from "../interfaces";
import { Product } from "../products/interfaces";

export interface GetStockOutPayload {
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

export interface GetStockOutResponse {
  rows: StockOut[];
  count: number;
}

export interface CreateStockOutPayload {
  transactionDate?: string;
  warehouseId: string;
  customerId?: string;
  productId: string;
  unitPrice: number;
  quantity: number;
}

export interface StockOut extends AuditFields {
  customer: Customer | null;
  transactionDate: string;
  warehouse: Warehouse;
  unitPrice: number;
  quantity: number;
  product: Product;
  id: string;
}
