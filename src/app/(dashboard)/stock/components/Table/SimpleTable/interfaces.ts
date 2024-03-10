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
