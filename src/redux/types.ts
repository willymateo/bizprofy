import { CurrentStock } from "./states/stock/current/types";
import { Navigation } from "./states/navigation/types";
import { StockOut } from "./states/stock/out/types";
import { Language } from "./states/language/types";
import { StockIn } from "./states/stock/in/types";

export type Store = {
  currentStock: CurrentStock;
  navigation: Navigation;
  language: Language;
  stockOut: StockOut;
  stockIn: StockIn;
};
