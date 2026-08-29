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
});
