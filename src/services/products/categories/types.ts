import { AuditFields, Order } from "@/services/interfaces";

export type GetProductCategoriesPayload = {
  orderByField?: string;
  offset?: number;
  limit?: number;
  order?: Order;
  q?: string;
};

export type GetProductCategoriesResponse = {
  rows: ProductCategory[];
  count: number;
};

export type CreateProductCategoryPayload = {
  name: string;
};

export type EditProductCategoryPayload = Partial<CreateProductCategoryPayload>;

export type ProductCategoryActivationPayload = {
  activate?: boolean;
  force?: boolean;
};

export type ProductCategory = AuditFields & {
  companyId: string;
  name: string;
  id: string;
};
