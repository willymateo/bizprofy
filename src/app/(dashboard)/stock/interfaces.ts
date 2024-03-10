import { AuditFields } from "@/services/interfaces";
import { Product } from "../products/interfaces";

export interface Stock extends AuditFields {
  transactionDate: string;
  stockDate: string;
  quantity: number;
  product: Product;
  id: string;
}

export interface StockType extends AuditFields {
  type: StockTypes;
  id: number;
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
