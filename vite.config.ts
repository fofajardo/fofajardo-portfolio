import { defineConfig } from "vite";

import { enhancedImages } from "@sveltejs/enhanced-img";
import { sveltekit } from "@sveltejs/kit/vite";
import { svelteSitemap } from "svelte-sitemap/vite";

export default defineConfig({
  plugins: [
    enhancedImages(),
    sveltekit(),
    svelteSitemap({
      domain: "https://fofajardo.is-a.dev",
      outDir: ".vercel/output/static"
    })
  ]
});
