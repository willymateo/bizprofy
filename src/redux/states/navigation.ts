import { createSlice } from "@reduxjs/toolkit";

import { Navigation } from "../interfaces";

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

const {
  actions: { openDrawer, closeDrawer, resetDrawer },
  reducer: NavigationReducer,
} = NavigationSlice;

export { openDrawer, closeDrawer, resetDrawer, NavigationReducer };
