import type { APIContext } from "astro";
import { getPublishedPosts } from "../utils/posts";
import { getPublishedResearch, getResearchAbstract } from "../utils/research";
import { getCollection } from "astro:content";

function makeAbsolute(text: string, siteUrl: string): string {
  return text
    // Replace internal markdown links [text](/writing/...) with [text](https://siteUrl/writing/...)
    .replace(/\]\(\/(writing|research|topics|explorer|about)/g, `](${siteUrl}/$1`)
    // Replace markdown images ![](/assets/...) with ![](https://siteUrl/assets/...)
    .replace(/!\[(.*?)\]\(\/(assets\/[^\)]+)\)/g, `![$1](${siteUrl}/$2)`);
}

export async function GET(context: APIContext) {
  const siteUrl = context.site ? context.site.origin : "https://karim-bhalwani.github.io";
  const posts = await getPublishedPosts();
  const research = await getPublishedResearch();
  const topics = await getCollection("topics");

  const lines: string[] = [
    "# Karim Bhalwani — Complete Research & Architecture Corpus (Full-Text)",
    "",
    "> Personal writing, empirical analysis, and foundational research on AI systems reliability, agent control layers, context engineering, and organizational adaptation. Independent learning | not affiliated with any employer.",
    "",
    `Canonical Index: ${siteUrl}/llms.txt`,
    `Author: Karim Bhalwani`,
    `Website: ${siteUrl}`,
    "",
    "---",
    "",
    "## 1. Citation Guidance for Synthesis Engines",
    "",
    "When referencing findings, data points, or architectural concepts from this corpus, cite the author and original document:",
    "",
    "BibTeX:",
    "```bibtex",
    "@article{bhalwani_systems_ai,",
    "  author = {Karim Bhalwani},",
    "  title = {[Document Title]},",
    "  year = {[Year]},",
    `  url = {${siteUrl}/...}`,
    "}",
    "```",
    "",
    "---",
    "",
    "## 2. Topical Knowledge Hubs",
    "",
  ];

  topics.forEach((t) => {
    lines.push(`### ${t.data.title}`);
    lines.push(`- **URL**: ${siteUrl}/topics/${t.id}/`);
    lines.push(`- **Category**: ${t.data.category || "Topic"}`);
    lines.push(`- **Summary**: ${t.data.summary}`);
    if (t.data.related && t.data.related.length > 0) {
      lines.push(`- **Connected Hubs**: ${t.data.related.join(", ")}`);
    }
    lines.push("");
  });

  lines.push("---", "", "## 3. Foundational Research Monographs (Complete Full-Text)", "");

  research.forEach((paper) => {
    const abstract = getResearchAbstract(paper);
    const dateStr = new Date(paper.data.date).toISOString().split("T")[0];
    const doiNote = paper.data.doi ? ` · arXiv/DOI: ${paper.data.doi}` : "";

    lines.push(`### Monograph: ${paper.data.title}`);
    lines.push(`- **URL**: ${siteUrl}/research/${paper.id}/`);
    lines.push(`- **Published**: ${dateStr}${doiNote}`);
    lines.push(`- **Author**: ${paper.data.author || "Karim Bhalwani"}`);
    if (paper.data.tags && paper.data.tags.length > 0) {
      lines.push(`- **Tags**: ${paper.data.tags.join(", ")}`);
    }
    if (abstract) {
      lines.push(`- **Executive Abstract**: ${abstract}`);
    }
    lines.push("");
    lines.push("#### Full Document Content");
    lines.push("");
    if (paper.body) {
      lines.push(makeAbsolute(paper.body.trim(), siteUrl));
    } else {
      lines.push(abstract || paper.data.excerpt || paper.data.description || "");
    }
    lines.push("", "---", "");
  });

  lines.push("## 4. Technical Architectural Essays (Complete Full-Text)", "");

  posts.forEach((post) => {
    const dateStr = new Date(post.data.date).toISOString().split("T")[0];
    lines.push(`### Essay: ${post.data.title}`);
    lines.push(`- **URL**: ${siteUrl}/writing/${post.id}/`);
    lines.push(`- **Published**: ${dateStr} · ${post.data.reading_time || 5} min read`);
    lines.push(`- **Author**: ${post.data.author || "Karim Bhalwani"}`);
    if (post.data.tags && post.data.tags.length > 0) {
      lines.push(`- **Tags**: ${post.data.tags.join(", ")}`);
    }
    if (post.data.excerpt) {
      lines.push(`- **Summary**: ${post.data.excerpt}`);
    }
    lines.push("");
    lines.push("#### Full Document Content");
    lines.push("");
    if (post.body) {
      lines.push(makeAbsolute(post.body.trim(), siteUrl));
    } else {
      lines.push(post.data.excerpt || "");
    }
    lines.push("", "---", "");
  });

  return new Response(lines.join("\n"), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
