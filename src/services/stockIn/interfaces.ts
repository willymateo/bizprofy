import { Warehouse } from "../warehouses/interfaces";
import { Provider } from "../providers/interfaces";
import { AuditFields, Order } from "../interfaces";
import { Product } from "../products/interfaces";

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
  providerId?: string;
  productId: string;
  quantity: number;
  unitCost: number;
}

export interface StockIn extends AuditFields {
  provider: Provider | null;
  transactionDate: string;
  warehouse: Warehouse;
  quantity: number;
  unitCost: number;
  product: Product;
  id: string;
}
