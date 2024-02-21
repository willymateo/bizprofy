import { createSlice } from "@reduxjs/toolkit";
import { UserSession } from "../interfaces";

const emptyState: UserSession = {
  token: null,
  id: null,
  username: "",
  firstNames: "",
  lastNames: "",
  email: "",
  photoUrl: "https://github.com/willymateo.png",
};

const UserSessionSlice = createSlice({
  name: "userSession",
  initialState: emptyState,
  reducers: {
    setUserSession: (state, { payload }) => ({
      ...state,
      ...payload,
    }),
    resetUserSession: () => emptyState,
  },
});

const {
  actions: { setUserSession, resetUserSession },
  reducer: UserSessionReducer,
} = UserSessionSlice;

export { UserSessionReducer, setUserSession, resetUserSession };
