import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { includes } from "lodash-es";

const getManualChunks = (id: string) => {
    if (!includes(id, "node_modules")) return;
    return id.toString().split("node_modules/")[1].split("/")[0].toString();
};

export default defineConfig({
    plugins: [react()],
    build: {
        rollupOptions: {
            output: {
                manualChunks: getManualChunks,
            },
        },
    },
});
