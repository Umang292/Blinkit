import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  publicDir: false,
  build: {
    outDir: "public",
    emptyOutDir: false,
  },
  server: {
    proxy: {
      "/api": "http://localhost:5000",
    },
  },
});
