import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { router } from "./app";
import { persistor, store } from "./app/store.ts";
import { worker } from "./mocks/browser.ts";

import { RouterProvider } from "@tanstack/react-router";
import { ConfigProvider } from "antd";
import "./assets/fonts/iran-yekan/stylesheet.css";
import { SliderComopnentToken } from "./components/ui/slider.tsx";
import "./global.css";

const G = () => {
  return (
    <React.StrictMode>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ConfigProvider
            componentSize="middle"
            theme={{
              token: {
                fontFamily: "IRANYekan, font-serif",
              },
              components: {
                Layout: {
                  siderBg: "#fff",
                },
                Slider: SliderComopnentToken,
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
worker
  .start({ quiet: true })
  .then(() => {
    const rootEl = document.getElementById("root") as HTMLElement;

    return ReactDOM.createRoot(rootEl).render(
      <ConfigProvider>
        <G />
      </ConfigProvider>
    );
  })
  .catch(console.error);
