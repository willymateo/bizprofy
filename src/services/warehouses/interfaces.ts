import { AuditFields, Order } from "../interfaces";

export interface CreateWarehousePayload {
  name: string;
  code: string;
}

export type EditWarehousePayload = Partial<CreateWarehousePayload>;

export type WarehouseActivationPayload = {
  activate?: boolean;
  force?: boolean;
};

export interface GetWarehousesPayload {
  orderByField?: string;
  offset?: number;
  limit?: number;
  order?: Order;
  q?: string;
}

export interface GetWarehousesResponse {
  rows: Warehouse[];
  count: number;
}

export interface Warehouse extends AuditFields {
  code: string | null;
  companyId: string;
  name: string;
  id: string;
}
