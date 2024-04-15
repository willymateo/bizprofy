import { GetStockInPayload } from "@/services/stock/in/interfaces";

export type StockIn = {
  filters: Filters;
};

export type Filters = Record<string, Filter>;

export type Filter = Omit<GetStockInPayload, "warehouseIds">;
