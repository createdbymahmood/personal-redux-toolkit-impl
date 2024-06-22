import type { ConfigFile } from "@rtk-query/codegen-openapi";

const config: ConfigFile = {
  schemaFile: "./swagger.json",
  apiFile: "../app/services/base-api.ts",
  apiImport: "baseApi",
  outputFile: "./__generated.ts",
  exportName: "generatedApi",
  hooks: false,
  tag: true,
};

export default config;
