import { GetStockOutPayload } from "@/services/stock/out/interfaces";

export type StockOut = {
  filters: Filters;
};

export type Filters = Record<string, Filter>;

export type Filter = Omit<GetStockOutPayload, "warehouseIds">;
