import { combineReducers, configureStore } from "@reduxjs/toolkit";

import type { PreloadedState } from "@reduxjs/toolkit";

//Service
// import { homeApi } from "./services/home";
import { loginApi } from "./services/login";
import { companyApi } from "./services/company";
import { companyDataApi } from "./services/companyData";

import homeReducer from "./slices/homeSlice";

const rootReducer = combineReducers({
  home: homeReducer,
  [loginApi.reducerPath]: loginApi.reducer,
  [companyApi.reducerPath]: companyApi.reducer,
  [companyDataApi.reducerPath]: companyDataApi.reducer,
});

export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(
        loginApi.middleware,
        companyApi.middleware,
        companyDataApi.middleware
      ),
    preloadedState,
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
