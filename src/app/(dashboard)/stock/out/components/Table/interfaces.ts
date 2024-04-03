import { StockOut } from "@/services/stock/out/interfaces";

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
  prividerIdCard,
  providerName,
  providerEmail,
  customerIdCard,
  customerName,
  customerEmail,
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
