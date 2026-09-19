// @ts-check
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://karim-bhalwani.github.io",
  integrations: [mdx(), sitemap()],
  markdown: {
    shikiConfig: {
      theme: "css-variables",
      wrap: true,
    },
  },
  redirects: {
    "/writing/2026-02-22-mit-gave-the-model-a-python-interpreter": "/research/2026-02-22-mit-gave-the-model-a-python-interpreter",
    "/writing/2026-02-07-beyond-million-token-window": "/research/2026-06-28-beyond-million-token-window",
    "/research/2026-02-07-beyond-million-token-window": "/research/2026-06-28-beyond-million-token-window",
  },
});
