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

export type GetProductsStockStatusPayload = {
  orderByField?: "stock_out_total_quantity" | "total_price_sum";
  transactionDateGreaterThanOrEqualTo?: string;
  transactionDateLessThanOrEqualTo?: string;
  offset?: number;
  limit?: number;
  order?: Order;
};

export type GetProductsStockStatusResponse = {
  data: ProductsStockStatusData[];
};

export type ProductsStockStatusData = {
  totalQuantity: number;
  totalPriceSum: number;
  product: Product;
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

export type ProductActivationPayload = {
  activate?: boolean;
  force?: boolean;
};

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
