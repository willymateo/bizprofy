import { AuditFields, Order } from "../interfaces";

export interface CreateCustomerPayload {
  phoneNumber: string;
  firstNames: string;
  lastNames: string;
  address: string;
  idCard: string;
  email: string;
}

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
