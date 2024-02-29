export interface ErrorResponse {
  error: {
    message?: string;
    name?: string;
  };
}

export enum Order {
  desc = "DESC",
  asc = "ASC",
}

export interface AuditFields {
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface LoginPayload {
  emailOrUsername: string;
  password: string;
}

export interface CreateUserPayload {
  companyName: string;
  firstNames: string;
  lastNames: string;
  username: string;
  password: string;
  email: string;
}

export interface CreateProductPayload {
  description: string;
  unitPrice: number;
  code: string;
  name: string;
}

export interface GetStockPayload {
  quantityGreaterThanOrEqualTo?: number;
  quantityLessThanOrEqualTo?: number;
  stockTypeIds?: number[];
  productIds?: string[];
  stockDate?: string;
  offset?: number;
  limit?: number;
  order?: Order;
}

export interface SessionPayload extends AuditFields {
  firstNames: string;
  lastNames: string;
  username: string;
  photoUrl: string;
  company: Company;
  email: string;
  token: string;
  id: string;
}

export interface Company extends AuditFields {
  name: string;
  id: string;
}
