import { AuditFields, Order } from "../interfaces";
import { Provider } from "../providers/interfaces";

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

export interface GetProductsResponse {
  rows: Product[];
  count: number;
}

export interface CreateProductPayload {
  productCategoryId: string | null;
  providerId: string | null;
  description: string;
  unitPrice: number;
  unitCost: number;
  code: string;
  name: string;
}

export type EditProductPayload = Partial<CreateProductPayload>;

export type Product = AuditFields & {
  productCategory: ProductCategory | null;
  provider: Provider | null;
  description: string;
  companyId: string;
  unitPrice: number;
  unitCost: number;
  photoUrl: string;
  code: string;
  name: string;
  id: string;
};

export type SimpleProduct = Omit<Product, "productCategory" | "provider"> & {
  productCategoryId: string | null;
  providerId: string | null;
};

export interface GetProductCategoriesPayload {
  orderByField?: string;
  offset?: number;
  limit?: number;
  order?: Order;
  q?: string;
}

export interface GetProductCategoriesResponse {
  rows: ProductCategory[];
  count: number;
}

export interface CreateProductCategoryPayload {
  name: string;
}

export type EditProductCategoryPayload = Partial<CreateProductCategoryPayload>;

export interface ProductCategory extends AuditFields {
  companyId: string;
  name: string;
  id: string;
}
