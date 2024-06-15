import { RouterContextOptions, createRouter } from "@tanstack/react-router";

// Import the generated route tree
import React, { Suspense } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { routeTree } from "./routeTree.gen";

import { RouterProvider } from "@tanstack/react-router";
import { Spin } from "antd";
import { useRefetchSessionQuery } from "./app/services/auth";
import {
  AppDispatch,
  persistor,
  store,
  useAppDispatch,
  useTypedSelector,
} from "./app/store";
import "./assets/fonts/iran-yekan/stylesheet.css";
import {
  DefaultErrorComponent,
  ThemeConfigProvider,
} from "./components/common";
import "./global.css";

export type RouteContext = {
  dispatch: AppDispatch;
  isAuth: boolean;
  lang: string;
};

// Create a new router instance
export const router = createRouter({
  routeTree,
  defaultPendingComponent: Spin,

  context: {
    dispatch: undefined!,
    isAuth: undefined!,
    lang: undefined!,
  },

  defaultErrorComponent: DefaultErrorComponent,
  defaultPreloadStaleTime: 0,
});

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

function InnerApp() {
  const { isAuthenticated, isInitialized } = useTypedSelector(s => s.auth);
  const dispatch = useAppDispatch();
  const isAuth = isAuthenticated && isInitialized;
  useRefetchSessionQuery();

  if (!isInitialized) return <Spin />;

  return (
    <RouterProvider
      router={router}
      defaultPreload="intent"
      context={{ isAuth, dispatch, lang: "en" }}
    />
  );
}

export const App = () => {
  return (
    <React.StrictMode>
      <Suspense fallback={<Spin />}>
        <Provider store={store}>
          <PersistGate loading={<Spin />} persistor={persistor}>
            <ThemeConfigProvider>
              <InnerApp />
            </ThemeConfigProvider>
          </PersistGate>
        </Provider>
      </Suspense>
    </React.StrictMode>
  );
};
