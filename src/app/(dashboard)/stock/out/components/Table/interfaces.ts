import { StockOut } from "@/services/stockOut/interfaces";

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
  unitPrice,
  quantity,
  totalPrice,
}

export interface FooterData {
  totalQuantity: number;
  totalPriceSum: number;
}

export interface TableData {
  footerData: FooterData;
  bodyData: StockOut[];
  count: number;
}

export enum Order {
  desc = "desc",
  asc = "asc",
}
