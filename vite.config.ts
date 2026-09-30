import { defineConfig } from "vite";

import adapterVercel from "@sveltejs/adapter-vercel";
import { enhancedImages } from "@sveltejs/enhanced-img";
import { sveltekit } from "@sveltejs/kit/vite";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";
import { mdsvex } from "mdsvex";
import { svelteSitemap } from "svelte-sitemap/vite";
import Icons from "unplugin-icons/vite";

export default defineConfig({
  plugins: [
    enhancedImages(),
    sveltekit({
      adapter: adapterVercel(),
      extensions: [".svelte", ".svx", ".md"],
      preprocess: [
        vitePreprocess(),
        mdsvex({
          extension: ".md"
        })
      ],
      prerender: {
        origin: "https://fofajardo.com",
        handleUnseenRoutes: "ignore"
      }
    }),
    Icons({
      compiler: "svelte",
      scale: 1
    }),
    svelteSitemap({
      domain: "https://fofajardo.com",
      outDir: ".vercel/output/static"
    })
  ]
});
