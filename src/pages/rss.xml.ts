import rss from "@astrojs/rss";
import { getPublishedPosts } from "../utils/posts";
import { getPublishedResearch } from "../utils/research";
import type { APIContext } from "astro";

export async function GET(context: APIContext) {
  const sortedPosts = await getPublishedPosts();
  const sortedResearch = await getPublishedResearch();
  const siteUrl = context.site || "https://karim-bhalwani.github.io";

  const allItems = [
    ...sortedPosts.map((post) => ({
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
        `<enclosure url="${siteUrl}/assets/${post.id}/hero-main.png" type="image/png" length="0" />`,
      ].join("\n"),
    })),
    ...sortedResearch.map((paper) => ({
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
        `<enclosure url="${siteUrl}/assets/research/${paper.id}/hero-main.png" type="image/png" length="0" />`,
      ].join("\n"),
    })),
  ].sort((a, b) => b.pubDate.getTime() - a.pubDate.getTime());

  return rss({
    title: "Karim Bhalwani — Writing & Research",
    description: "Personal writing and research monographs on AI systems engineering, agent harness architecture, and systems design.",
    site: siteUrl,
    items: allItems,
    customData: `<language>en-us</language>`,
  });
}
