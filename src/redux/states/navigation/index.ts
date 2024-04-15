import { createSlice } from "@reduxjs/toolkit";

import { Navigation } from "./types";

const emptyState: Navigation = {
  isDrawerOpen: false,
};

const NavigationSlice = createSlice({
  name: "navigation",
  initialState: emptyState,
  reducers: {
    openDrawer: state => ({ ...state, isDrawerOpen: true }),
    closeDrawer: state => ({ ...state, isDrawerOpen: false }),
    resetDrawer: () => emptyState,
  },
});

export const {
  actions: { openDrawer, closeDrawer, resetDrawer },
  reducer: NavigationReducer,
} = NavigationSlice;
