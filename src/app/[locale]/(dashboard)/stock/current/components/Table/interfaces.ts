export interface HeaderColumns {
  id: HeaderColumnTypes;
  className?: string;
  label: string;
}

export enum HeaderColumnTypes {
  purchasesNumber,
  currentStock,
  productCode,
  productName,
  salesNumber,
  totalPrice,
  totalCost,
  unitPrice,
  unitCost,
}

export enum Order {
  desc = "desc",
  asc = "asc",
}
