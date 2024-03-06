import { StockTypes } from "./interfaces";

const STOCK_TYPES_BY_ID = {
  1: StockTypes.openingStock,
  2: StockTypes.stockIn,
  3: StockTypes.stockOut,
  4: StockTypes.currentStock,
};

const STOCK_TYPE_IDS = {
  [StockTypes.openingStock]: 1,
  [StockTypes.stockIn]: 2,
  [StockTypes.stockOut]: 3,
  [StockTypes.currentStock]: 4,
};

const STOCK_ROUTES_BY_TYPE = {
  [StockTypes.openingStock]: "openning",
  [StockTypes.stockIn]: "in",
  [StockTypes.stockOut]: "out",
  [StockTypes.currentStock]: "current",
};

export { STOCK_TYPE_IDS, STOCK_TYPES_BY_ID, STOCK_ROUTES_BY_TYPE };
