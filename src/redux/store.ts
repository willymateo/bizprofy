import { EnhancedStore, configureStore } from "@reduxjs/toolkit";

import { UserSessionReducer } from "./states/userSession";
import { NavigationReducer } from "./states/navigation";
import { LanguageReducer } from "./states/language";
import { Store } from "./interfaces";

const reduxStore: EnhancedStore<Store> = configureStore({
  reducer: {
    userSession: UserSessionReducer,
    navigation: NavigationReducer,
    language: LanguageReducer,
  },
});

export { reduxStore };
