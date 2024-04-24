import { EnhancedStore, configureStore } from "@reduxjs/toolkit";

import { CurrentStockReducer } from "./states/stock/current";
import { NavigationReducer } from "./states/navigation";
import { StockOutReducer } from "./states/stock/out";
import { StockInReducer } from "./states/stock/in";
import { Store } from "./types";

const reduxStore: EnhancedStore<Store> = configureStore({
  reducer: {
    currentStock: CurrentStockReducer,
    navigation: NavigationReducer,
    stockOut: StockOutReducer,
    stockIn: StockInReducer,
  },
});

export { reduxStore };
