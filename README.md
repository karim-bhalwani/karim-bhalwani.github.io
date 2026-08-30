# karim-bhalwani.github.io

Personal blog and writing space. Articles and notes on AI systems reliability, agent control layers, context engineering, and multi-agent coordination.

**Live site:** <https://karim-bhalwani.github.io>

> Personal blog. Views and opinions are entirely my own and do not represent my employer or any affiliated organization.

---

## Stack

- **Framework:** [Astro 5](https://astro.build) (static site generation)
- **Hosting:** GitHub Pages, deployed via GitHub Actions
- **Content:** Markdown files in `src/content/posts/`
- **Styling:** Vanilla CSS with OKLCH design tokens, dark/light mode

---

## Local Development

**Prerequisites:** Node.js 20+

```bash
# Install dependencies
npm install

# Start dev server
npm run dev
# Open: http://localhost:4321

# Build for production
npm run build
```

---

## Adding Content

### New post

Create a file in `src/content/posts/` with the naming format `YYYY-MM-DD-post-slug.md`:

```yaml
---
title: "Your Post Title"
date: 2026-09-01
reading_time: 8
tags: [Agent Harness, Production Systems]
topics: [agent-harness]
excerpt: "One sentence summary shown in post cards and SEO."
---

Post content here in Markdown.
```

**Topics** (use one or more to connect the post to the knowledge graph):
- `agent-harness`
- `ai-verification`
- `token-economics`
- `multi-agent-orchestration`
- `data-systems`

### New topic

Create a file in `src/content/topics/topic-slug.md`. Topic pages are generated automatically and appear in the knowledge graph.

---

## Deployment

Pushes to `main` automatically build and deploy via GitHub Actions.

To deploy manually: **Actions tab** → **Deploy to GitHub Pages** → **Run workflow**.

---

## Structure

```
src/
  content/
    posts/       ← Blog posts (.md)
    topics/      ← Knowledge graph topic hubs (.md)
    projects/    ← Featured projects (.md)
  pages/         ← Astro page routes
  components/    ← UI components (Header, Footer, Graph, etc.)
  styles/        ← Design tokens, typography, utilities
  layouts/       ← BaseLayout wrapper

public/          ← Static assets (images, .nojekyll)
.github/
  workflows/
    deploy.yml   ← GitHub Actions build + deploy
```
