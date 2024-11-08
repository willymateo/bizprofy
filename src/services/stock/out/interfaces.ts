import { Warehouse } from "../../warehouses/interfaces";
import { Customer } from "../../customers/interfaces";
import { AuditFields, Order } from "../../interfaces";
import { Product } from "@/services/products/types";

export interface GetStockOutPayload {
  transactionDateGreaterThanOrEqualTo?: string;
  transactionDateLessThanOrEqualTo?: string;
  warehouseIds?: string[];
  orderByField?: string;
  productIds?: string[];
  offset?: number;
  limit?: number;
  order?: Order;
}

export interface GetStockOutResponse {
  summarizedData: SummarizedStockOutData;
  rows: StockOut[];
  count: number;
}

export interface CreateStockOutPayload {
  currentStockAtMoment?: number;
  transactionDate?: string;
  warehouseId: string;
  customerId?: string;
  productId: string;
  unitPrice: number;
  quantity: number;
}

export interface StockOut extends AuditFields {
  currentStockAtMoment: number;
  customer: Customer | null;
  transactionDate: string;
  warehouse: Warehouse;
  unitPrice: number;
  quantity: number;
  product: Product;
  id: string;
}

export interface SummarizedStockOutData {
  totalQuantity: number;
  totalPriceSum: number;
}
