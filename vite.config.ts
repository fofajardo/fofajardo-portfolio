import { defineConfig, loadEnv } from "vite";

import adapterVercel from "@sveltejs/adapter-vercel";
import { enhancedImages } from "@sveltejs/enhanced-img";
import { sveltekit } from "@sveltejs/kit/vite";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";
import { mdsvex } from "mdsvex";
import { svelteSitemap } from "svelte-sitemap/vite";
import Icons from "unplugin-icons/vite";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  return {
    plugins: [
      enhancedImages(),
      sveltekit({
        adapter: adapterVercel(),
        alias: {
          $comp: "src/lib/components",
          $content: "content"
        },
        extensions: [".svelte", ".svx", ".md"],
        preprocess: [
          vitePreprocess(),
          mdsvex({
            extension: ".md"
          })
        ],
        prerender: {
          origin: env.VITE_URL_ORIGIN,
          handleUnseenRoutes: "ignore"
        }
      }),
      Icons({
        compiler: "svelte",
        scale: 1
      }),
      svelteSitemap({
        domain: env.VITE_URL_ORIGIN,
        outDir: env.VITE_SITEMAP_OUT_DIR
      })
    ],
    server: {
      fs: {
        allow: ["content"]
      }
    }
  };
});
