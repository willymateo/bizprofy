import { createSlice } from "@reduxjs/toolkit";

import { getInitialStateFromLocalStorage } from "@/redux/utils";
import { storeName } from "./constants";
import { CurrentStock } from "./types";

const emptyState: CurrentStock = {
  filters: {},
};

const CurrentStockSlice = createSlice({
  name: storeName,
  initialState: getInitialStateFromLocalStorage({
    parseObject: true,
    key: storeName,
    emptyState,
  }) as CurrentStock,
  reducers: {
    setFiltersByWarehoseId: (state, { payload: { warehouseId, filters = {} } }) => {
      const newState = {
        ...state,
        filters: {
          ...state?.filters,
          [warehouseId]: {
            ...state.filters?.[warehouseId],
            ...filters,
          },
        },
      };

      localStorage.setItem(storeName, JSON.stringify(newState));

      return newState;
    },
    resetFiltersByWarehouseId: (state, { payload: { warehouseId } }) => {
      const newState = {
        ...state,
        filters: {
          ...state?.filters,
          [warehouseId]: {},
        },
      };

      localStorage.setItem(storeName, JSON.stringify(newState));

      return newState;
    },
    resetAllFilters: state => {
      const newState = { ...state, filters: {} };

      localStorage.setItem(storeName, JSON.stringify(newState));

      return newState;
    },
  },
});

export const {
  actions: { setFiltersByWarehoseId, resetFiltersByWarehouseId, resetAllFilters },
  reducer: CurrentStockReducer,
} = CurrentStockSlice;
