import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  server: {
    proxy: {
      "/api": {
        target: "https://pixelize-eta.vercel.app",
        changeOrigin: true,
      },
    },
  },
  plugins: [react()],
});
