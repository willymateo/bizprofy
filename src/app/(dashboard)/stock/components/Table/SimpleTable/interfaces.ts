import { Stock } from "@/services/stock/interfaces";

export interface HeaderColumns {
  id: HeaderColumnTypes;
  className?: string;
  label: string;
}

export enum HeaderColumnTypes {
  transactionDate = "transactionDate",
  productId = "productId",
  productCode = "productCode",
  productName = "productName",
  unitCost = "unitCost",
  unitPrice = "unitPrice",
  quantity = "quantity",
  totalCost = "totalCost",
  totalPrice = "totalPrice",
}

export interface FooterData {
  totalQuantity: number;
  totalPriceSum: number;
  totalCostSum: number;
}

export interface TableData {
  footerData: FooterData;
  bodyData: Stock[];
  count: number;
}

export enum Order {
  desc = "desc",
  asc = "asc",
}
