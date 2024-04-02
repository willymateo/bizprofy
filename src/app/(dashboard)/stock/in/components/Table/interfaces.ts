import { StockIn } from "@/services/stockIn/interfaces";

export interface HeaderColumns {
  id: HeaderColumnTypes;
  className?: string;
  label: string;
}

export enum HeaderColumnTypes {
  transactionDate,
  warehouseCode,
  warehouseName,
  productCode,
  productName,
  providerName,
  providerEmail,
  unitCost,
  quantity,
  totalCost,
}

export interface FooterData {
  totalQuantity: number;
  totalCostSum: number;
}

export interface TableData {
  footerData: FooterData;
  bodyData: StockIn[];
  count: number;
}

export enum Order {
  desc = "desc",
  asc = "asc",
}
