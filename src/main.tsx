import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app";
import { persistor, store } from "./app/store.ts";
import { Provider } from "react-redux";
import { worker } from "./mocks/browser.ts";
import { PersistGate } from "redux-persist/integration/react";
import { Toaster } from "sonner";

import "./global.css";
import "./assets/fonts/iran-yekan/stylesheet.css";
import { SliderComopnentToken } from "./components/ui/slider.tsx";
import { ConfigProvider } from "antd";

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
            <App />
            <Toaster />
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
