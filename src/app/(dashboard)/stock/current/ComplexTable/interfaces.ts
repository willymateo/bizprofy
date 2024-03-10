import { Product } from "@/app/(dashboard)/products/interfaces";

export interface HeaderColumns {
  id: HeaderColumnTypes;
  className?: string;
  label: string;
}

export enum HeaderColumnTypes {
  productId = "productId",
  productCode = "productCode",
  productName = "productName",
  unitCost = "unitCost",
  unitPrice = "unitPrice",
  purchasesNumber = "purchasesNumber",
  salesNumber = "salesNumber",
  totalCost = "totalCost",
  totalPrice = "totalPrice",
}

export interface TableData {
  purchasesNumber: number;
  salesNumber: number;
  totalPrice: number;
  totalCost: number;
  product: Product;
}
