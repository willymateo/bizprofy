import { ProductCategory } from "./categories/types";
import { AuditFields, Order } from "../interfaces";
import { Provider } from "../providers/interfaces";

export type GetProductsPayload = {
  unitPriceGreaterThanOrEqualTo?: number;
  unitCostGreaterThanOrEqualTo?: number;
  unitPriceLessThanOrEqualTo?: number;
  unitCostLessThanOrEqualTo?: number;
  offset?: number;
  limit?: number;
  order?: Order;
  q?: string;
};

export type GetProductsResponse = {
  rows: Product[];
  count: number;
};

export type CreateProductPayload = {
  productCategoryId: string | null;
  providerId: string | null;
  description: string;
  unitPrice: number;
  unitCost: number;
  code: string;
  name: string;
};

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
