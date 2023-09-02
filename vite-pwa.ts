import type { VitePWAOptions } from "vite-plugin-pwa";

export const vitePWAConfig: Partial<VitePWAOptions> = {
    mode: "production",
    base: "/",
    includeAssets: ["favicon.svg"],
    manifest: {
        name: "Senior Frontend Engineer Challenge",
        short_name: "Challenge",
        theme_color: "#ffffff",
        icons: [
            {
                src: "favicon.ico", // <== don't add slash, for testing
                sizes: "192x192",
            },
            {
                src: "/favicon.ico", // <== don't remove slash, for testing
                sizes: "512x512",
            },
            {
                src: "favicon.ico", // <== don't add slash, for testing
                sizes: "512x512",

                purpose: "any maskable",
            },
        ],
    },
    devOptions: {
        enabled: false,
        /* when using generateSW the PWA plugin will switch to classic */
        type: "module",
        navigateFallback: "index.html",
    },
};

vitePWAConfig.srcDir = "src";
vitePWAConfig.filename = "prompt-sw.ts";
vitePWAConfig.strategies = "injectManifest";
