import { Navigation } from "./states/navigation/types";
import { StockOut } from "./states/stock/out/types";
import { Language } from "./states/language/types";
import { StockIn } from "./states/stock/in/types";

export type Store = {
  navigation: Navigation;
  language: Language;
  stockOut: StockOut;
  stockIn: StockIn;
};
