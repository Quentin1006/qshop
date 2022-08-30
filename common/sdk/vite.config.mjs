import { defineConfig } from "vite";
import { resolve } from "path";
import dts from "vite-plugin-dts";
import env from "vite-plugin-environment";
import * as pkg from "./package.json";

/** @type {import('vite').UserConfig} */
export default defineConfig({
  plugins: [dts({}), env({ PKG_NAME: pkg.name })],
  build: {
    lib: {
      entry: resolve(__dirname, "src/lib.ts"),
      name: "lib",
      fileName: "lib",
      formats: ["es", "umd"],
    },
  },
});
