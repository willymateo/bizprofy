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
  customerName,
  customerEmail,
  unitPrice,
  quantity,
  totalPrice,
}

export enum Order {
  desc = "desc",
  asc = "asc",
}
