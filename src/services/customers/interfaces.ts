import { AuditFields, Order } from "../interfaces";

export interface CreateCustomerPayload {
  phoneNumber: string;
  firstNames: string;
  lastNames: string;
  address: string;
  idCard: string;
  email: string;
}

export type EditCustomerPayload = Partial<CreateCustomerPayload>;

export type CustomerActivationPayload = {
  activate?: boolean;
  force?: boolean;
};

export interface GetCustomersPayload {
  orderByField?: string;
  offset?: number;
  limit?: number;
  order?: Order;
  q?: string;
}

export interface GetCustomersResponse {
  rows: Customer[];
  count: number;
}

export type GetCustomersStockStatusPayload = {
  orderByField?: "stock_out_total_quantity" | "total_price_sum";
  transactionDateGreaterThanOrEqualTo?: string;
  transactionDateLessThanOrEqualTo?: string;
  offset?: number;
  limit?: number;
  order?: Order;
};

export type GetCustomersStockStatusResponse = {
  data: CustomersStockStatusData[];
};

export type CustomersStockStatusData = {
  totalQuantity: number;
  totalPriceSum: number;
  customer: Customer;
};

export interface Customer extends AuditFields {
  email: string | null;
  phoneNumber: string;
  firstNames: string;
  lastNames: string;
  companyId: string;
  address: string;
  idCard: string;
  id: string;
}
