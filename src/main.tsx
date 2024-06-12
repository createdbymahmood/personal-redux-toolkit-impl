import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { router } from "./app";
import { persistor, store } from "./app/store.ts";

import { RouterProvider } from "@tanstack/react-router";
import "./assets/fonts/iran-yekan/stylesheet.css";
import "./global.css";
import { worker } from "./mocks/browser.ts";

const G = () => {
  return (
    <React.StrictMode>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <RouterProvider router={router} />
        </PersistGate>
      </Provider>
    </React.StrictMode>
  );
};

async function render() {
  await worker.start();
  const rootElement = document.getElementById("root") as HTMLElement;
  if (rootElement.innerHTML) return;
  const root = createRoot(rootElement);
  root.render(<G />);
}

render();
