import { AuditFields, Order } from "../interfaces";

export interface CreateProviderPayload {
  companyName: string;
  phoneNumber: string;
  firstNames: string;
  lastNames: string;
  address: string;
  idCard: string;
  email: string;
}

export type EditProviderPayload = Partial<CreateProviderPayload>;

export type ProviderActivationPayload = {
  activate?: boolean;
  force?: boolean;
};

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
  companyName: string;
  phoneNumber: string;
  firstNames: string;
  lastNames: string;
  companyId: string;
  address: string;
  id: string;
}
