import { defineCollection } from "astro:content";
import { z } from "astro/zod";
import { glob } from "astro/loaders";

const base = (dir: string) =>
  glob({ pattern: "*.md", base: `./src/content/${dir}` });

// 1. Posts (Blog Posts & Technical Notes)
const posts = defineCollection({
  loader: base("posts"),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    updated: z.coerce.date().optional(),
    reading_time: z.number().optional(),
    categories: z.union([z.string(), z.array(z.string())]).default([]),
    tags: z.array(z.string()).default([]),
    author: z.string().default("Karim Bhalwani"),
    excerpt: z.string().optional(),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
    topics: z.array(z.string()).default([]),
    hero_image: z.string().optional(),
    key_takeaways: z.array(z.string()).default([]),
  }),
});

// 2. Topics (Graph Hubs for Knowledge Graph)
const topics = defineCollection({
  loader: base("topics"),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    weight: z.number().default(1),
    category: z.string().optional(),
    related: z.array(z.string()).default([]),
  }),
});

// 3. Projects & Systems Architecture
const projects = defineCollection({
  loader: base("projects"),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    status: z.enum(["active", "maintained", "archived", "concept"]).default("active"),
    repo: z.string().optional(),
    url: z.string().optional(),
    tech: z.array(z.string()).default([]),
    topics: z.array(z.string()).default([]),
    featured: z.boolean().default(false),
    order: z.number().optional(),
  }),
});

// 4. Research (Foundational Research, Monographs & Whitepapers)
const research = defineCollection({
  loader: base("research"),
  schema: z.object({
    title: z.string(),
    section: z.string().default("Research"),
    date: z.coerce.date(),
    updated: z.coerce.date().optional(),
    "read-time": z.string().optional(),
    read_time: z.string().optional(),
    reading_time: z.union([z.string(), z.number()]).optional(),
    description: z.string().optional(),
    excerpt: z.string().optional(),
    "topic-hub": z.string().optional(),
    topic_hub: z.string().optional(),
    topics: z.array(z.string()).default([]),
    tags: z.array(z.string()).default([]),
    author: z.string().default("Karim Bhalwani"),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
    hero_image: z.string().optional(),
    doi: z.string().optional(),
  }),
});

export const collections = { posts, topics, projects, research };
