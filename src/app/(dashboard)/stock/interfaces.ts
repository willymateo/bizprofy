import { AuditFields } from "@/services/interfaces";
import { Product } from "../products/interfaces";

export interface Stock extends AuditFields {
  stockDate: string;
  quantity: number;
  product: Product;
  id: string;
}

export interface StockType extends AuditFields {
  type: StockTypes;
  id: number;
}

export enum StockTypes {
  openingStock = "opening_stock",
  currentStock = "current_stock",
  stockOut = "stock_out",
  stockIn = "stock_in",
}
