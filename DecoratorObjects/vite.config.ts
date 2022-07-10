import { defineConfig, UserConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    minify: "terser",
    terserOptions: {
      compress: {
        keep_classnames: true,
      },
      mangle: {
        keep_classnames: true,
      },
    },
  },
} as UserConfig);
