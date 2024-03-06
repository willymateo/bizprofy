import { Order } from "../interfaces";

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
  description: string;
  unitPrice: number;
  unitCost: number;
  code: string;
  name: string;
}
