export interface HeaderColumns {
  id: HeaderColumnTypes;
  className?: string;
  label: string;
}

export enum HeaderColumnTypes {
  transactionDate,
  providerEmail,
  customerEmail,
  providerName,
  customerName,
  productCode,
  productName,
  totalPrice,
  unitPrice,
  quantity,
}

export enum Order {
  desc = "desc",
  asc = "asc",
}
