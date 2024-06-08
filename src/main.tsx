import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { persistor, store } from "./app/store.ts";
import { Provider } from "react-redux";
import { worker } from "./mocks/browser.ts";
import { PersistGate } from "redux-persist/integration/react";
import { Toaster } from "sonner";
import { ConfigProvider } from "antd";
import "./global.css";
import "./assets/fonts/iran-yekan/stylesheet.css";
import fa_IR from "antd/lib/locale/fa_IR";

worker
  .start({ quiet: true })
  .then(() => {
    const rootEl = document.getElementById("root") as HTMLElement;

    return ReactDOM.createRoot(rootEl).render(
      <React.StrictMode>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <ConfigProvider
              locale={fa_IR}
              direction="rtl"
              prefixCls="app"
              theme={{
                token: {
                  fontFamily: "IRANYekan, Vazirmatn, sans-serif",
                  // Seed Token
                  colorPrimary: "#00000",
                  colorPrimaryBg: "#f1f1f1",
                  // borderRadius: 5,
                  // Alias Token
                },
                components: {
                  Layout: {
                    siderBg: "#fff",
                  },
                  Menu: {
                    collapsedWidth: 80,
                  },
                  Spin: {},
                  Dropdown: {
                    // paddingBlock: 120,
                  },
                  Cascader: {
                    // controlItemWidth: 180,
                  },
                  Slider: {},
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
  })
  .catch(console.error);
