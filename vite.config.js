import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import viteImagemin from 'vite-plugin-imagemin';

export default defineConfig({
  base: "/portfolio/",
  plugins: [
    react(),
    viteImagemin({
      gifsicle: { optimizationLevel: 7 },
      optipng: { optimizationLevel: 7 },
      mozjpeg: { quality: 70 },
      svgo: {},
      webp: { quality: 70 }
    })
  ],
});