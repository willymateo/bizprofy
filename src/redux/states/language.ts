import { createSlice } from "@reduxjs/toolkit";

import { Language } from "../interfaces";
import { LANGUAGES_DATA, LANGUAGE_CODES } from "@/shared/constants";

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

const {
  actions: { setLanguage, resetLanguage },
  reducer: LanguageReducer,
} = LanguageSlice;

export { setLanguage, resetLanguage, LanguageReducer };
