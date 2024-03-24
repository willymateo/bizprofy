import { AuditFields, Order } from "../interfaces";

export interface CreateWarehousePayload {
  name: string;
  code: string;
}

export interface GetWarehousesPayload {
  orderByField?: string;
  offset?: number;
  limit?: number;
  order?: Order;
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
