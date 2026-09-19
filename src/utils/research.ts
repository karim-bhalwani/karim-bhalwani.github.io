import { getCollection, type CollectionEntry } from "astro:content";

/**
 * Determines whether a research item should be included in the build.
 * In development (import.meta.env.DEV), allows previewing future-dated items.
 * In production (import.meta.env.PROD), filters out drafts and future-dated items.
 */
export function isResearchPublished(paper: CollectionEntry<"research">): boolean {
  if (paper.data.draft) return false;
  if (process.env.BUILD_ALL === "true") return true;
  if (import.meta.env.PROD) {
    const paperDate = new Date(paper.data.date);
    const now = new Date();
    const paperDay = new Date(
      paperDate.getUTCFullYear(),
      paperDate.getUTCMonth(),
      paperDate.getUTCDate()
    );
    const today = new Date(
      now.getUTCFullYear(),
      now.getUTCMonth(),
      now.getUTCDate()
    );
    if (paperDay > today) {
      return false;
    }
  }
  return true;
}

/**
 * Retrieves all published research items sorted in reverse chronological order (newest first).
 */
export async function getPublishedResearch(): Promise<CollectionEntry<"research">[]> {
  try {
    const papers = await getCollection("research", isResearchPublished);
    return papers.sort(
      (a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime()
    );
  } catch {
    return [];
  }
}

/**
 * Formats reading time display from frontmatter
 */
export function formatReadingTime(paper: CollectionEntry<"research">): string {
  const d = paper.data;
  if (d["read-time"]) return d["read-time"];
  if (d.read_time) return d.read_time;
  if (d.reading_time) {
    return typeof d.reading_time === "number" ? `${d.reading_time} min read` : d.reading_time;
  }
  return "";
}

/**
 * Returns description or excerpt
 */
export function getResearchAbstract(paper: CollectionEntry<"research">): string {
  return paper.data.description || paper.data.excerpt || "";
}

/**
 * Gets all topic associations for a research paper
 */
export function getResearchTopics(paper: CollectionEntry<"research">): string[] {
  const topics = [...(paper.data.topics || [])];
  const hub = paper.data["topic-hub"] || paper.data.topic_hub;
  if (hub && !topics.includes(hub)) {
    topics.push(hub);
  }
  return topics;
}
