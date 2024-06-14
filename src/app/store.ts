import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from "../features/auth/authSlice";
import { api } from "./services/api";

const authPersistConfig = {
  key: "auth",
  storage,
  blacklist: ["isAuthenticated", "isInitialized"],
};

const rootReducer = combineReducers({
  [api.reducerPath]: api.reducer,
  auth: persistReducer(authPersistConfig, authReducer),
});

export const createStore = () =>
  configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware({
        immutableCheck: false,
        serializableCheck: false,
      }).concat(api.middleware),
  });

export const store = createStore();

export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();

export type RootState = ReturnType<typeof store.getState>;
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
