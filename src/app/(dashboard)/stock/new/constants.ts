import { CreatableStockTypes } from "../interfaces";

const CREATE_BUTTON_LABEL_BY_STOCK_TYPE = {
  [CreatableStockTypes.stockIn]: "Register purchase",
  [CreatableStockTypes.stockOut]: "Register sale",
};

export { CREATE_BUTTON_LABEL_BY_STOCK_TYPE };
