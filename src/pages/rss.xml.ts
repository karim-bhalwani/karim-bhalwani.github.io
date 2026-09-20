import rss from "@astrojs/rss";
import { getPublishedPosts } from "../utils/posts";
import { getPublishedResearch } from "../utils/research";
import type { APIContext } from "astro";

export async function GET(context: APIContext) {
  const sortedPosts = await getPublishedPosts();
  const sortedResearch = await getPublishedResearch();
  const siteUrl = context.site ? context.site.origin : "https://karim-bhalwani.github.io";

  const allItems = [
    ...sortedPosts.map((post) => {
      const postFolder = post.id.replace(/^\d{4}-\d{2}-\d{2}-/, "");
      const heroPath = post.data.hero_image || `/assets/${postFolder}/hero-main.webp`;
      const imageUrl = heroPath.startsWith("http") ? heroPath : `${siteUrl}${heroPath.startsWith("/") ? "" : "/"}${heroPath}`;
      const mimeType = imageUrl.endsWith(".png") ? "image/png" : "image/webp";
      return {
        title: post.data.title,
        pubDate: new Date(post.data.date),
        description: post.data.excerpt || "",
        link: `/writing/${post.id}/`,
        customData: [
          `<author>karim@bhalwani.dev (Karim Bhalwani)</author>`,
          `<category>Writing</category>`,
          ...(post.data.tags || []).map(
            (tag: string) => `<category>${tag.replace(/&/g, "&amp;")}</category>`
          ),
          `<enclosure url="${imageUrl}" type="${mimeType}" length="0" />`,
        ].join("\n"),
      };
    }),
    ...sortedResearch.map((paper) => {
      const heroPath = paper.data.hero_image || `/assets/research/${paper.id}/hero-main.webp`;
      const imageUrl = heroPath.startsWith("http") ? heroPath : `${siteUrl}${heroPath.startsWith("/") ? "" : "/"}${heroPath}`;
      const mimeType = imageUrl.endsWith(".png") ? "image/png" : "image/webp";
      return {
        title: `[Research] ${paper.data.title}`,
        pubDate: new Date(paper.data.date),
        description: paper.data.description || paper.data.excerpt || "",
        link: `/research/${paper.id}/`,
        customData: [
          `<author>karim@bhalwani.dev (Karim Bhalwani)</author>`,
          `<category>Research</category>`,
          ...(paper.data.tags || []).map(
            (tag: string) => `<category>${tag.replace(/&/g, "&amp;")}</category>`
          ),
          `<enclosure url="${imageUrl}" type="${mimeType}" length="0" />`,
        ].join("\n"),
      };
    }),
  ].sort((a, b) => b.pubDate.getTime() - a.pubDate.getTime());

  return rss({
    title: "Karim Bhalwani — Writing & Research",
    description: "Personal writing and research monographs on AI systems engineering, agent harness architecture, and systems design.",
    site: siteUrl,
    items: allItems,
    customData: `<language>en-us</language><atom:link href="${siteUrl}/rss.xml" rel="self" type="application/rss+xml" />`,
    xmlns: {
      atom: "http://www.w3.org/2005/Atom",
    },
  });
}
