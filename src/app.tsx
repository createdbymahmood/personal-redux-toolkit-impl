import { createRouter, useRouter } from "@tanstack/react-router";

// Import the generated route tree
import React, { Suspense } from "react";
import { Provider, useDispatch } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { routeTree } from "./routeTree.gen";

import { RouterProvider } from "@tanstack/react-router";
import { Button, ConfigProvider, Result, Spin, theme } from "antd";
import { useRefetchSessionQuery } from "./app/services/auth";
import { AppDispatch, persistor, store, useTypedSelector } from "./app/store";
import "./assets/fonts/iran-yekan/stylesheet.css";
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
    dispatch: store.dispatch,
    isAuth: true,
    lang: "fa",
  },

  defaultErrorComponent: ({ reset, error }) => {
    const router = useRouter();
    return (
      <Result
        status="500"
        title="500"
        subTitle="Sorry, something went wrong."
        extra={
          <Button
            type="primary"
            onClick={() => {
              reset?.();
              router.invalidate();
            }}
          >
            Retry
          </Button>
        }
      />
    );
  },
});

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

function InnerApp() {
  const { isAuthenticated, isInitialized } = useTypedSelector(s => s.auth);
  const dispatch = useDispatch();
  const isAuth = isAuthenticated && isInitialized;
  useRefetchSessionQuery();

  if (!isInitialized) return <Spin />;

  return (
    <RouterProvider
      key={String(isAuth)}
      router={router}
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
            <ConfigProvider
              theme={{
                algorithm: theme.darkAlgorithm,
                token: {
                  fontFamily: "SF Mono, SF Arabic",
                },
                components: {
                  Menu: {
                    // itemHeight: 30,
                  },
                },
              }}
            >
              <InnerApp />
            </ConfigProvider>
          </PersistGate>
        </Provider>
      </Suspense>
    </React.StrictMode>
  );
};
