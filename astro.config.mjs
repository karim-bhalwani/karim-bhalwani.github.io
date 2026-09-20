// @ts-check
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";

const redirectedPaths = [
  "/writing/2026-02-22-mit-gave-the-model-a-python-interpreter",
  "/writing/2026-02-07-beyond-million-token-window",
  "/research/2026-02-07-beyond-million-token-window",
  "/sitemap.xml",
];

export default defineConfig({
  site: "https://karim-bhalwani.github.io",
  trailingSlash: "always",
  integrations: [
    mdx(),
    sitemap({
      filter: (page) => !redirectedPaths.some((p) => page.includes(p)),
      serialize(item) {
        const dateMatch = item.url.match(/\/(\d{4}-\d{2}-\d{2})/);
        if (dateMatch) {
          item.lastmod = new Date(dateMatch[1]).toISOString();
        } else {
          item.lastmod = new Date().toISOString();
        }
        return item;
      },
    }),
  ],
  markdown: {
    shikiConfig: {
      theme: "css-variables",
      wrap: true,
    },
  },
  redirects: {
    "/writing/2026-02-22-mit-gave-the-model-a-python-interpreter": "/research/2026-02-22-mit-gave-the-model-a-python-interpreter/",
    "/writing/2026-02-07-beyond-million-token-window": "/research/2026-06-28-beyond-million-token-window/",
    "/research/2026-02-07-beyond-million-token-window": "/research/2026-06-28-beyond-million-token-window/",
    "/sitemap.xml": "/sitemap-index.xml",
  },
});
