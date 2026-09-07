import rss from "@astrojs/rss";
import { getPublishedPosts } from "../utils/posts";
import type { APIContext } from "astro";

export async function GET(context: APIContext) {
  const sorted = await getPublishedPosts();
  const siteUrl = context.site || "https://karim-bhalwani.github.io";

  return rss({
    title: "Karim Bhalwani — Writing",
    description: "Personal blog posts on AI systems engineering, agent harness architecture, and systems design.",
    site: siteUrl,
    items: sorted.map((post) => ({
      title: post.data.title,
      pubDate: new Date(post.data.date),
      description: post.data.excerpt || "",
      link: `/writing/${post.id}/`,
      // Per-item author
      customData: [
        `<author>karim@bhalwani.dev (Karim Bhalwani)</author>`,
        // Emit a <category> tag for each tag on the post
        ...(post.data.tags || []).map(
          (tag: string) => `<category>${tag.replace(/&/g, "&amp;")}</category>`
        ),
        // Enclosure pointing at the hero image for richer feed reader previews
        `<enclosure url="${siteUrl}/assets/${post.id}/hero-main.png" type="image/png" length="0" />`,
      ].join("\n"),
    })),
    customData: `<language>en-us</language>`,
  });
}
