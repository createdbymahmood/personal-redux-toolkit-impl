import { createListenerMiddleware, addListener } from "@reduxjs/toolkit";
import type {
  TypedStartListening,
  TypedAddListener,
  ListenerEffectAPI,
} from "@reduxjs/toolkit";

import { AppDispatch, RootState } from "./store";

export const listenerMiddleware = createListenerMiddleware();

export type AppStartListening = TypedStartListening<RootState, AppDispatch>;
export const startAppListening =
  listenerMiddleware.startListening as AppStartListening;

export const addAppListener = addListener as TypedAddListener<
  RootState,
  AppDispatch
>;

export type AppListenerEffectApi = ListenerEffectAPI<RootState, AppDispatch>;
