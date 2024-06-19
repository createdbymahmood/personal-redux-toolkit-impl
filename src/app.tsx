import { createRouter } from "@tanstack/react-router";

// Import the generated route tree
import React, { Suspense } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { routeTree } from "./routeTree.gen";

import { RouterProvider } from "@tanstack/react-router";
import { Skeleton, Spin, theme } from "antd";
import { I18nextProvider, useTranslation } from "react-i18next";
import { auth } from "./app/services/auth";
import {
  AppDispatch,
  persistor,
  store,
  useAppDispatch,
  useTypedSelector,
} from "./app/store";
import "./assets/fonts/iran-yekan/stylesheet.css";
import {
  DefaultError,
  DefaultNotFound,
  ThemeConfigProvider,
} from "./components/common";
import { authSelectors } from "./features/auth";
import "./global.css";
import i18n from "./lib/i18next/i18next-config";

export type RouteContext = {
  dispatch: AppDispatch;
  isAuth: boolean;
  lang: string;
};

// Create a new router instance
export const router = createRouter({
  routeTree,
  defaultPendingComponent: () => (
    <Skeleton
      avatar
      paragraph={{ rows: 4 }}
      style={{ padding: theme.useToken().token.paddingLG }}
    />
  ),

  context: {
    dispatch: undefined!,
    isAuth: undefined!,
    lang: undefined!,
  },

  defaultErrorComponent: DefaultError,
  defaultPreloadStaleTime: 0,
  defaultNotFoundComponent: DefaultNotFound,
});

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

function InnerApp() {
  const isAuthenticated = useTypedSelector(authSelectors.getIsAuthenticated);
  const isInitialized = useTypedSelector(authSelectors.getIsInitialized);
  const dispatch = useAppDispatch();
  const isAuth = isAuthenticated && isInitialized;
  const refetchSession = auth.useRefetchSessionQuery();
  const [t, { language }] = useTranslation();
  if (!isInitialized || refetchSession.isLoading) return null;

  return (
    <RouterProvider
      key={String(isAuth)}
      router={router}
      context={{ isAuth, dispatch, lang: language }}
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
              <I18nextProvider i18n={i18n}>
                <InnerApp />
              </I18nextProvider>
            </ThemeConfigProvider>
          </PersistGate>
        </Provider>
      </Suspense>
    </React.StrictMode>
  );
};
