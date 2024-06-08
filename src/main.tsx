import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app";
import { persistor, store } from "./app/store.ts";
import { Provider } from "react-redux";
import { worker } from "./mocks/browser.ts";
import { PersistGate } from "redux-persist/integration/react";
import { Toaster } from "sonner";
import { ConfigProvider } from "antd";
import "./global.css";
import "./assets/fonts/iran-yekan/stylesheet.css";
import fa_IR from "antd/lib/locale/fa_IR";
import { SliderComopnentToken } from "./components/ui/slider.tsx";

const G = () => {
  return (
    <React.StrictMode>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ConfigProvider
            locale={fa_IR}
            direction="rtl"
            theme={{
              token: {},
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
