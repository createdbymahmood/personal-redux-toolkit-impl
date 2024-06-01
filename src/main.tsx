import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { persistor, store } from "./app/store.ts";
import { Provider } from "react-redux";
import { worker } from "./mocks/browser.ts";
import { PersistGate } from "redux-persist/integration/react";
import { Toaster } from "sonner";

worker
  .start({ quiet: true })
  .then(() => {
    const rootEl = document.getElementById("root") as HTMLElement;

    return ReactDOM.createRoot(rootEl).render(
      <React.StrictMode>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <App />
            <Toaster />
          </PersistGate>
        </Provider>
      </React.StrictMode>
    );
  })
  .catch(console.error);
