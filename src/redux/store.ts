import { configureStore } from "@reduxjs/toolkit";

import { UserSessionReducer } from "./states/userSession";

const reduxStore = configureStore({
  reducer: {
    userSession: UserSessionReducer,
  },
});

export { reduxStore };
