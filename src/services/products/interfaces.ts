import { AuditFields, Order } from "../interfaces";

export interface GetProductsPayload {
  unitPriceGreaterThanOrEqualTo?: number;
  unitCostGreaterThanOrEqualTo?: number;
  unitPriceLessThanOrEqualTo?: number;
  unitCostLessThanOrEqualTo?: number;
  offset?: number;
  limit?: number;
  order?: Order;
  q?: string;
}

export interface CreateProductPayload {
  productCategoryId: string;
  description: string;
  providerId: string;
  unitPrice: number;
  unitCost: number;
  code: string;
  name: string;
}

export interface Product extends AuditFields {
  description: string;
  companyId: string;
  unitPrice: number;
  unitCost: number;
  photoUrl: string;
  code: string;
  name: string;
  id: string;
}

export interface GetProductCategoriesPayload {
  orderByField?: string;
  offset?: number;
  limit?: number;
  order?: Order;
}

export interface GetProductCategoriesResponse {
  rows: ProductCategory[];
  count: number;
}

export interface CreateProductCategoryPayload {
  name: string;
}

export interface ProductCategory extends AuditFields {
  companyId: string;
  name: string;
  id: string;
}
