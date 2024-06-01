import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import auth from "../features/auth/auth-slice";
import { api } from "./services/api";

const authPersistConfig = {
  key: "auth",
  storage,
  blacklist: ["token"],
};

const rootReducer = combineReducers({
  [api.reducerPath]: api.reducer,
  auth: persistReducer(authPersistConfig, auth),
});

const persistedReducer = rootReducer;

export const createStore = () =>
  configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware({ serializableCheck: false }).concat(api.middleware),
  });

export const store = createStore();

export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export type RootState = ReturnType<typeof store.getState>;
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
