import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

import { includes } from "lodash-es";
import { vitePWAConfig } from "./vite-pwa";
import { VitePWA } from "vite-plugin-pwa";

const getManualChunks = (id: string) => {
    if (!includes(id, "node_modules")) return;
    return id.toString().split("node_modules/")[1].split("/")[0].toString();
};

export default defineConfig({
    plugins: [react(), VitePWA(vitePWAConfig)],
    build: {
        rollupOptions: {
            output: {
                manualChunks: getManualChunks,
            },
        },
    },
});
