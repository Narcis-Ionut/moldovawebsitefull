// @ts-check
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";

import cloudflare from "@astrojs/cloudflare";

// https://astro.build/config
export default defineConfig({
  site: "https://moldovawebsite.md",
  integrations: [mdx(), sitemap()],
  adapter: cloudflare({
    platformProxy: {
      enabled: true,
    },
    // Optimize images at build time since Cloudflare doesn't support sharp at runtime
    imageService: "compile",
  }),
  trailingSlash: "ignore",
  // Image optimization settings
  image: {
    // Use sharp for high-quality image processing
    service: {
      entrypoint: "astro/assets/services/sharp",
      config: {
        limitInputPixels: false,
      },
    },
  },
  // Build optimization
  build: {
    // Inline small assets
    inlineStylesheets: "auto",
  },
  // Vite optimizations
  vite: {
    build: {
      // Better code splitting
      cssCodeSplit: true,
      // Minification
      minify: "esbuild",
    },
  },
});
