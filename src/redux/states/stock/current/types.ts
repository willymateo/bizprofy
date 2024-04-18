import { GetCurrentStockPayload } from "@/services/stock/current/interfaces";

export type CurrentStock = {
  filters: Filters;
};

export type Filters = Record<string, Filter>;

export type Filter = Omit<GetCurrentStockPayload, "warehouseIds">;
