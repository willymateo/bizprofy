export interface HeaderColumns {
  id: HeaderColumnTypes;
  className?: string;
  label: string;
}

export enum HeaderColumnTypes {
  productCode,
  productName,
  unitCost,
  unitPrice,
  purchasesNumber,
  salesNumber,
  totalCost,
  totalPrice,
}

export enum Order {
  desc = "desc",
  asc = "asc",
}
