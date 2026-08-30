import rss from "@astrojs/rss";
import { getPublishedPosts } from "../utils/posts";
import type { APIContext } from "astro";

export async function GET(context: APIContext) {
  const sorted = await getPublishedPosts();

  return rss({
    title: "Karim Bhalwani — Writing",
    description: "Personal blog posts on AI systems engineering, agent harness architecture, and systems design.",
    site: context.site || "https://karim-bhalwani.github.io",
    items: sorted.map((post) => ({
      title: post.data.title,
      pubDate: new Date(post.data.date),
      description: post.data.excerpt || "",
      link: `/writing/${post.id}/`,
    })),
    customData: `<language>en-us</language>`,
  });
}
