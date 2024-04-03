import { Product } from "@/services/products/interfaces";

export interface HeaderColumns {
  id: HeaderColumnTypes;
  className?: string;
  label: string;
}

export enum HeaderColumnTypes {
  productId,
  productCode,
  productName,
  unitCost,
  unitPrice,
  purchasesNumber,
  salesNumber,
  totalCost,
  totalPrice,
}

export interface BodyRowData {
  purchasesNumber: number;
  salesNumber: number;
  totalPrice: number;
  totalCost: number;
  product: Product;
}

export interface FooterData {
  totalPurchasesNumber: number;
  totalSalesNumber: number;
  totalPriceSum: number;
  totalCostSum: number;
  profit: number;
}

export interface TableData {
  bodyRowData: BodyRowData[];
  footerData: FooterData;
}

export enum Order {
  desc = "desc",
  asc = "asc",
}
