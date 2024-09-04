import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/audio": {
        target: "https://www.soundhelix.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/audio/, ""),
      },
    },
  },
  plugins: [react()],
});
