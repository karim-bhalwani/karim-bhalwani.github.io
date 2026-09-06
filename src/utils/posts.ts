import { getCollection, type CollectionEntry } from "astro:content";

/**
 * Determines whether a post should be included in the build.
 * In development (import.meta.env.DEV), allows previewing future-dated posts.
 * In production (import.meta.env.PROD), filters out drafts and future-dated posts.
 *
 * Comparison uses calendar date only (not time-of-day) so that a post dated
 * e.g. "2026-09-20 09:00:00 -0400" is included by the 12:17 UTC daily cron
 * on Sep 20 regardless of the UTC offset in the frontmatter.
 */
export function isPostPublished(post: CollectionEntry<"posts">): boolean {
  if (post.data.draft) return false;
  if (import.meta.env.PROD) {
    const postDate = new Date(post.data.date);
    const now = new Date();
    // Compare calendar dates only — strip time component from both sides
    // so a post whose frontmatter hour exceeds the cron time in UTC still
    // publishes on the correct day rather than slipping to the next run.
    const postDay = new Date(
      postDate.getUTCFullYear(),
      postDate.getUTCMonth(),
      postDate.getUTCDate()
    );
    const today = new Date(
      now.getUTCFullYear(),
      now.getUTCMonth(),
      now.getUTCDate()
    );
    if (postDay > today) {
      return false;
    }
  }
  return true;
}

/**
 * Retrieves all published posts sorted in reverse chronological order (newest first).
 */
export async function getPublishedPosts(): Promise<CollectionEntry<"posts">[]> {
  const posts = await getCollection("posts", isPostPublished);
  return posts.sort(
    (a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime()
  );
}
