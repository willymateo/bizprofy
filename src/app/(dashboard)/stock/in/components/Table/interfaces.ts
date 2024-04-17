export interface HeaderColumns {
  id: HeaderColumnTypes;
  className?: string;
  label: string;
}

export enum HeaderColumnTypes {
  transactionDate,
  providerEmail,
  providerName,
  productCode,
  productName,
  totalCost,
  unitCost,
  quantity,
}

export enum Order {
  desc = "desc",
  asc = "asc",
}
