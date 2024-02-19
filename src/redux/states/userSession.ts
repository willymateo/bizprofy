import { UserSession } from "@/shared/interfaces/redux/userSession";
import { createSlice } from "@reduxjs/toolkit";

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

const { setUserSession, resetUserSession } = UserSessionSlice.actions;
const UserSessionReducer = UserSessionSlice.reducer;

export { UserSessionReducer, setUserSession, resetUserSession };
