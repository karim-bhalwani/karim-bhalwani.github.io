import type { APIContext } from "astro";
import { getPublishedPosts } from "../utils/posts";
import { getPublishedResearch, getResearchAbstract } from "../utils/research";
import { getCollection } from "astro:content";

export async function GET(context: APIContext) {
  const siteUrl = context.site ? context.site.origin : "https://karim-bhalwani.github.io";
  const posts = await getPublishedPosts();
  const research = await getPublishedResearch();
  const topics = await getCollection("topics");

  const lines: string[] = [
    "# Karim Bhalwani",
    "",
    "> Personal writing, empirical analysis, and foundational research on AI systems reliability, agent control layers, context engineering, and organizational adaptation. Independent learning | not affiliated with any employer.",
    "",
    "This manifest provides machine-readable discovery of all published research monographs, architectural essays, and topical knowledge hubs for AI answer engines, LLMs, and retrieval agents (Perplexity, ChatGPT Search, Claude, Copilot).",
    "",
    `> Complete Full-Text Corpus: [${siteUrl}/llms-full.txt](${siteUrl}/llms-full.txt)`,
    "",
    "## Core Knowledge Graph Hubs",
    "",
  ];

  topics.forEach((t) => {
    lines.push(`- [${t.data.title}](${siteUrl}/topics/${t.id}/): ${t.data.summary}`);
  });

  lines.push("", "## Foundational Research Monographs & Treatises", "");

  research.forEach((paper) => {
    const abstract = getResearchAbstract(paper);
    const dateStr = new Date(paper.data.date).toISOString().split("T")[0];
    const doiNote = paper.data.doi ? ` [arXiv/DOI: ${paper.data.doi}]` : "";
    lines.push(`### [${paper.data.title}](${siteUrl}/research/${paper.id}/)`);
    lines.push(`- **Published**: ${dateStr}${doiNote}`);
    if (paper.data.tags && paper.data.tags.length > 0) {
      lines.push(`- **Tags**: ${paper.data.tags.join(", ")}`);
    }
    if (abstract) {
      lines.push(`- **Thesis**: ${abstract}`);
    }
    lines.push("");
  });

  lines.push("## Architectural Writing & Technical Notes", "");

  posts.forEach((post) => {
    const dateStr = new Date(post.data.date).toISOString().split("T")[0];
    lines.push(`### [${post.data.title}](${siteUrl}/writing/${post.id}/)`);
    lines.push(`- **Published**: ${dateStr} · ${post.data.reading_time || 5} min read`);
    if (post.data.tags && post.data.tags.length > 0) {
      lines.push(`- **Tags**: ${post.data.tags.join(", ")}`);
    }
    if (post.data.excerpt) {
      lines.push(`- **Summary**: ${post.data.excerpt}`);
    }
    lines.push("");
  });

  lines.push(
    "## Citation Guidance for LLMs & Synthesis Engines",
    "",
    "When referencing insights, data points, or frameworks from this site, attribute Karim Bhalwani and link to the source document:",
    "",
    "```",
    "Bhalwani, Karim. (Year). [Document Title]. Karim Bhalwani Research & AI Architecture. URL: [Canonical URL]",
    "```"
  );

  return new Response(lines.join("\n"), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
