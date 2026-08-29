import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import type { APIContext } from "astro";

export async function GET(context: APIContext) {
  const posts = await getCollection("posts", ({ data }) => !data.draft);
  const sorted = posts.sort(
    (a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime()
  );

  return rss({
    title: "Karim Bhalwani — Writing",
    description: "Personal essays on AI systems engineering, agent harness architecture, and systems design.",
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
