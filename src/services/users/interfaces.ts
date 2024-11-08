import { AuditFields, Order, Permissions } from "../interfaces";

export interface CreateUserPayload {
  firstNames: string;
  lastNames: string;
  username: string;
  password: string;
  email: string;
}

export type EditUserPayload = Partial<CreateUserPayload>;

export type UserActivationPayload = {
  activate?: boolean;
  force?: boolean;
};

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
  permissions: Permissions;
  emailIsVerified: boolean;
  passwordHash: string;
  firstNames: string;
  lastNames: string;
  companyId: string;
  username: string;
  photoUrl: string;
  email: string;
  id: string;
}
