import { AuditFields, Order } from "../interfaces";

export interface CreateUserPayload {
  firstNames: string;
  lastNames: string;
  username: string;
  password: string;
  email: string;
}

export interface GetUsersPayload {
  orderByField?: string;
  offset?: number;
  limit?: number;
  order?: Order;
}

export interface GetUsersResponse {
  rows: User[];
  count: number;
}

export interface User extends AuditFields {
  passwordHash: string;
  firstNames: string;
  lastNames: string;
  companyId: string;
  username: string;
  photoUrl: string;
  email: string;
  id: string;
}
