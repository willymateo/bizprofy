import { CreatableStockTypes, ExtraStockTypes } from "@/services/stock/interfaces";

const STOCK_TYPES_BY_ID = {
  2: CreatableStockTypes.stockIn,
  3: CreatableStockTypes.stockOut,
  4: ExtraStockTypes.currentStock,
};

const STOCK_TYPE_IDS = {
  [CreatableStockTypes.stockIn]: 2,
  [CreatableStockTypes.stockOut]: 3,
  [ExtraStockTypes.currentStock]: 4,
};

const STOCK_ROUTES_BY_TYPE = {
  [CreatableStockTypes.stockIn]: "in",
  [CreatableStockTypes.stockOut]: "out",
  [ExtraStockTypes.currentStock]: "current",
};

export { STOCK_TYPE_IDS, STOCK_TYPES_BY_ID, STOCK_ROUTES_BY_TYPE };
