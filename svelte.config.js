import { mdsvex } from "mdsvex";

import adapter from "@sveltejs/adapter-vercel";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";

/** @type {import("@sveltejs/kit").Config} */
const config = {
  preprocess: [
    vitePreprocess(),
    mdsvex({
      extension: ".md"
    })
  ],

  kit: {
    adapter: adapter(),
    prerender: {
      origin: "https://fofajardo.is-a.dev",
      handleUnseenRoutes: "ignore"
    }
  },

  extensions: [".svelte", ".svx", ".md"]
};

export default config;
