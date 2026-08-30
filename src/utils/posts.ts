import { getCollection, type CollectionEntry } from "astro:content";

/**
 * Determines whether a post should be included in the build.
 * In development (import.meta.env.DEV), allows previewing future-dated posts.
 * In production (import.meta.env.PROD), filters out drafts and future-dated posts.
 */
export function isPostPublished(post: CollectionEntry<"posts">): boolean {
  if (post.data.draft) return false;
  if (import.meta.env.PROD) {
    const postDate = new Date(post.data.date);
    const now = new Date();
    if (postDate > now) {
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
