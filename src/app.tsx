import { createRouter, useRouter } from "@tanstack/react-router";

// Import the generated route tree
import React from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { AppDispatch, store } from "./app/store";
import { persistor } from "./app/store.ts";
import { routeTree } from "./routeTree.gen";

import { RouterProvider } from "@tanstack/react-router";
import { Button, ConfigProvider, Result, Spin } from "antd";
import "./assets/fonts/iran-yekan/stylesheet.css";
import "./global.css";

export type RouteContext = {
  dispatch: AppDispatch;
  isAuth: boolean;
};

// Create a new router instance
export const router = createRouter({
  routeTree,
  context: {
    dispatch: store.dispatch,
    isAuth: false,
  },
  defaultPendingComponent: Spin,
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

export const App = () => {
  return (
    <React.StrictMode>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ConfigProvider
            theme={{
              // algorithm: theme.defaultAlgorithm,
              components: {
                Menu: {
                  // itemHeight: 30,
                },
              },
            }}
          >
            <RouterProvider router={router} />
          </ConfigProvider>
        </PersistGate>
      </Provider>
    </React.StrictMode>
  );
};
