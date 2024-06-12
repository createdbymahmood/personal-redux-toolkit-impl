import react from "@vitejs/plugin-react";
import { includes, some, startsWith } from "lodash-es";
import { defineConfig } from "vite";
import viteCompression from "vite-plugin-compression";
import { TanStackRouterVite } from "@tanstack/router-vite-plugin";

const vendors = ["react", "react-dom"];

const getManualChunks = (id: string) => {
  if (!id.includes("node_modules")) return;
  // const isVendor = some(vendors, vendor => includes(id, vendor));
  // if (isVendor) return "vendors";
  return id.toString().split("node_modules/")[1].split("/")[0].toString();
};

const viteConfig = defineConfig({
  plugins: [react(), viteCompression(), TanStackRouterVite()],
  server: {
    port: 9900,
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: getManualChunks,
      },
    },
  },
});

export default viteConfig;
