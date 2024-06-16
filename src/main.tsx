import { createRoot } from "react-dom/client";

import "./assets/fonts/iran-yekan/stylesheet.css";
import "./global.css";
import { worker } from "./mocks/browser.ts";
import { App } from "./app";

async function render() {
  await worker.start();
  const rootElement = document.getElementById("root") as HTMLElement;
  if (rootElement.innerHTML) return;
  const root = createRoot(rootElement);
  root.render(<App />);
}

render();
