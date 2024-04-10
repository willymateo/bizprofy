import { createSlice } from "@reduxjs/toolkit";

import { getInitialStateFromLocalStorage } from "@/redux/utils";
import { storeName } from "./constants";
import { StockOut } from "./types";

const emptyState: StockOut = {
  filters: {},
};

const StockOutSlice = createSlice({
  name: storeName,
  initialState: getInitialStateFromLocalStorage({
    parseObject: true,
    key: storeName,
    emptyState,
  }) as StockOut,
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
  reducer: StockOutReducer,
} = StockOutSlice;
