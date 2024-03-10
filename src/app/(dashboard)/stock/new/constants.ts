import { CreatableStockTypes } from "../interfaces";

const CREATE_BUTTON_LABEL_BY_STOCK_TYPE = {
  [CreatableStockTypes.stockIn]: "Register purchase",
  [CreatableStockTypes.stockOut]: "Register sale",
};

const TITLE_BY_STOCK_TYPE = {
  [CreatableStockTypes.stockIn]: "New purchase",
  [CreatableStockTypes.stockOut]: "New sale",
};

export { CREATE_BUTTON_LABEL_BY_STOCK_TYPE, TITLE_BY_STOCK_TYPE };
