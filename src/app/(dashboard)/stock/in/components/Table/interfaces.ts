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

export enum Order {
  desc = "desc",
  asc = "asc",
}
