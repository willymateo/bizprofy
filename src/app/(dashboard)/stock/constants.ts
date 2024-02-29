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

export { STOCK_TYPE_IDS, STOCK_TYPES_BY_ID };
