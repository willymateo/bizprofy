import { createSlice } from "@reduxjs/toolkit";

import { LANGUAGES_DATA, LANGUAGE_CODES } from "@/shared/constants";
import { Language } from "./types";

const emptyState: Language = LANGUAGES_DATA[LANGUAGE_CODES.ENGLISH];

const LanguageSlice = createSlice({
  name: "language",
  initialState: emptyState,
  reducers: {
    setLanguage: (state, { payload: languageCode }) => ({
      ...state,
      ...(LANGUAGES_DATA[languageCode] ?? emptyState),
    }),
    resetLanguage: () => emptyState,
  },
});

export const {
  actions: { setLanguage, resetLanguage },
  reducer: LanguageReducer,
} = LanguageSlice;
