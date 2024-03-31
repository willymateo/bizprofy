import { AuditFields, Order } from "../interfaces";

export interface CreateProviderPayload {
  phoneNumber: string;
  firstNames: string;
  lastNames: string;
  address: string;
  idCard: string;
  email: string;
}

export interface GetProvidersPayload {
  orderByField?: string;
  offset?: number;
  limit?: number;
  order?: Order;
  q?: string;
}

export interface GetProvidersResponse {
  rows: Provider[];
  count: number;
}

export interface Provider extends AuditFields {
  idCard: string | null;
  email: string | null;
  phoneNumber: string;
  firstNames: string;
  lastNames: string;
  companyId: string;
  address: string;
  id: string;
}
