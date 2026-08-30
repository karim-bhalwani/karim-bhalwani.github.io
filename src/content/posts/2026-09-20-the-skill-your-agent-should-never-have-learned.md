---
layout: post
title: "The Skill Your Agent Should Never Have Learned."
date: 2026-09-20 09:00:00 -0500
reading_time: 7
categories: AI systems engineering
tags: [Agent Harness, Model Routing, AI Governance, Production Systems]
author: Karim Bhalwani
excerpt: "You gave the agent forty tools and two hundred skills because you wanted it to handle anything. It handled less. The failure was not in the model. It was in the menu."
topics: [agent-harness, token-economics]
---

![The Skill Your Agent Should Never Have Learned.](/assets/the-skill-your-agent-should-never-have-learned/hero-main.png)

A restaurant opens with a twelve-page menu. Three hundred dishes. Every cuisine, every dietary need. The owner wanted to make sure nobody walked away unsatisfied.

Nobody walks away unsatisfied. They walk away confused. Orders take longer. The kitchen botches dishes it used to nail. Reviews slip. Not because the food got worse. Because the menu got bigger.

An expert walks in and cuts the menu to forty items. Revenue goes up. Quality goes up. Speed goes up.

The chef already knew how to cook. The menu was the problem.

Hold that image.

---

## Tools vs. Skills

A team ships a coding agent in January. Five tools. File read, file write, terminal, search, browser. The agent is sharp. Almost nothing to choose from, so it almost never chooses wrong.

By summer, the agent has forty tools and two hundred skills.

Before we go further, the distinction matters.

A tool is a raw capability. Read a file. Run a command. Call an API. A skill is something higher. It is a packaged workflow. Step-by-step instructions bundled with scripts, permissions, and reference material. All designed to guide the agent through a specific task.

A tool is the knife. A skill is the recipe.

Skills are what let a user say "deploy to staging" and have the agent handle the twelve steps that involves. They turned general-purpose agents into domain experts. And they are exactly where the scaling problem hits hardest, because recipes look far more alike than knives do.

The team notices the agent ignoring instructions. Making pointless API calls. Picking the wrong skill for the job. Not because it cannot tell the difference, but because the descriptions look too similar.

Nobody removed anything. Nobody changed the model. The agent just stopped being reliable.

**It did not get dumber. The menu got longer.**

---

![Skill Shadowing. Two skills with similar descriptions, one correct, one impostor.](/assets/the-skill-your-agent-should-never-have-learned/skill-shadowing.png)

## Shadowing

Here is the part that surprised the researchers.

A 2026 study scaled a skill library from a small curated set to two hundred. Task pass rates dropped 21 percent.

Not because the context window overflowed. Not because the model's reasoning broke down. The model confidently picked the wrong skill because a similar-looking impostor was sitting right next to the correct one.

They called it skill shadowing. One skill's description looks close enough to another that the model guesses wrong. It is routing on a two-sentence summary. Two sentences cannot tell the difference between "deploy to staging" and "deploy to production" when both say "deploy the application."

The striking part: the researchers tested whether the sheer volume of descriptions degraded reasoning. It did not. Statistically zero. The model was not overwhelmed by a long prompt. It was fooled by a similar one.

**It fails because it has too much to choose from, not too much to read.**

---

## Right Family, Wrong Sibling

In any real organization, skills cluster. Three database skills built by different teams. Two deployment workflows targeting different environments. Multiple review procedures with overlapping scopes.

The retriever finds the right family. It knows you need a database skill. It just surfaces the wrong one. The one pointing at a deprecated endpoint. The one missing an auth check.

A 2026 benchmark found this happens in over a third of all queries. The system identified the right capability family 84 percent of the time. It just picked the wrong sibling.

Here is why that matters more for skills than tools. A tool returns data. You can check the data. A skill rewrites the agent's behavior. The agent absorbs the sibling's instructions, its scripts, its assumptions. It adopts the wrong workflow as its own.

**The retriever found the right neighborhood. The agent moved into the wrong house.**

---

## The Part the Description Cannot Carry

There is a popular pattern called progressive disclosure. Do not dump every skill into the agent's context. Give it a manifest, just names and short descriptions, thirty to fifty tokens each. The agent picks what it needs, then the system loads the full workflow.

Elegant idea. Bad assumption.

The assumption is that a two-line description captures everything that matters. The preconditions, the auth model, the environment target, the artifact format. Two recipes for the same dish, written by different chefs, look identical from the title alone. The distinguishing details are on page three.

Researchers tested this on eighty thousand skills. Routing on descriptions alone dropped accuracy by 37 to 44 percentage points. That is not drift. That is collapse. Better descriptions recovered some of the gap, but stayed 7 to 21 points below routing that could see the full body.

The signal that matters lives inside the skill, not in its label.

In [Route the Intelligence, Not Just the Context](/writing/2026-05-10-route-the-intelligence), I wrote that the harness should route intelligence, not just context. Same principle here. You are routing the model to the right skill. The information needed to do that correctly is in the recipe itself, not in the title.

**The description says what the skill is called. The body says what it actually does. Those are not the same thing.**

---

![Routing Pipeline. Embedding model filters, reranker picks, reasoning model executes.](/assets/the-skill-your-agent-should-never-have-learned/routing-pipeline.png)

## What the Restaurant Already Knew

The solution is not a smarter model that picks from a bigger menu. It is a smaller menu and a smarter kitchen.

GitHub Copilot had forty tools. Telemetry showed the agent ignoring instructions, making exploratory API calls, spending its reasoning budget on tool selection instead of coding. They cut to thirteen core tools. Everything else went behind "virtual tool" clusters, surfaced only when needed. An embedding model handles the routing, not the reasoning model.

Fewer tools. Faster answers. Better code.

The academic version does the same for skills. A small embedding model filters eighty thousand skills down to twenty candidates. A reranker reads the full body of each candidate, the complete recipe, and picks the best match. The reasoning model only sees the winner. This pipeline uses 1.2 billion parameters and runs six times faster than having the foundation model do the routing.

Both approaches share one insight: the reasoning model should not be choosing. It should be reasoning. Choosing is a different job.

In [Building the Control Layer](/writing/2026-04-26-building-the-control-layer), I wrote that the harness around the model is the real system. The skill routing layer is harness. It decides what the reasoning model is allowed to see before reasoning begins. That is the highest-leverage decision in the stack.

**Do not ask the chef to design the menu. Build the system that decides what the chef sees.**

---

## The Instinct That Keeps Making It Worse

The instinct to add capability is always rewarded in the short term.

Someone asks the agent to deploy. It cannot. The team writes a deployment skill. Works. Ship it. A different team needs a slightly different deployment. The first skill does not fit. They write a second one. Ship it. Six months later there are four deployment skills and the agent picks the wrong one 30 percent of the time.

You rarely end up with four copies of a file-read tool. But you absolutely end up with four deployment skills, three database workflows, and two review procedures. All written by different people. All describing themselves in nearly identical language.

Each addition was correct on its own. The collection is the problem.

The discipline is not in saying yes to the next skill. It is in asking: does this one shadow something that already exists? If yes, do not add it next to the old one. Refactor both into a single skill with clear internal routing.

In [Procedure Over Intelligence](/writing/2026-01-26-procedure-over-intelligence-building-reliable-ai-systems), I wrote that systematic constraints beat real-time supervision. This is a constraint. Not on the model. On the menu.

**Every skill you add makes the agent worse at every skill it already has.**

---

![The Menu Worth Building. Curated skills vs sprawling library.](/assets/the-skill-your-agent-should-never-have-learned/curated-menu.png)

## The Menu Worth Building

Back to the restaurant.

The three-hundred-item menu was not ambition. It was indecision. The owner could not decide what the restaurant was, so they made it everything. The kitchen could not execute. The staff could not recommend. Customers did not come back.

The forty-item menu was not a limitation. It was a statement. This is what we do. This is what we do well. Every item on this menu, we execute perfectly, every time.

Your agent's skill library is the same decision.

Curate aggressively or watch it degrade. A lean set of tools the model can reason about will outperform a bloated one. A skill library with no shadowing siblings will outperform a sprawling one. A routing layer that pre-selects the right capability will outperform a prompt that asks the model to figure it out.

The capability was never the bottleneck. The curation was.

**You do not build a better agent by giving it more skills. You build a better agent by curating the ones it has.**

---

## Resources & Next Steps

- [More Skills, Worse Agents? Skill Shadowing Degrades Performance When Expanding Skill Libraries](https://arxiv.org/abs/2605.24050). Up to 21% pass rate degradation. Skill shadowing dominates, context overhead does not.
- [Right Family, Wrong Skill: Benchmarking Risk Exposure in Agent Skill Retrieval](https://arxiv.org/abs/2606.10388). Retrieval systems expose risky siblings in over a third of queries.
- [SkillRouter: Skill Routing for LLM Agents at Scale](https://arxiv.org/abs/2603.22455). 1.2B retrieve-and-rerank pipeline, 74% Hit@1 across 80K skills.
- [How we're making GitHub Copilot smarter with fewer tools](https://github.blog/ai-and-ml/github-copilot/how-were-making-github-copilot-smarter-with-fewer-tools/). 40 tools down to 13, embedding-guided routing.
- Related post: [Route the Intelligence, Not Just the Context.](/writing/2026-05-10-route-the-intelligence)
- Related post: [Building the Control Layer.](/writing/2026-04-26-building-the-control-layer)
- Related post: [Procedure Over Intelligence: Building Reliable AI Systems.](/writing/2026-01-26-procedure-over-intelligence-building-reliable-ai-systems)
- Related post: [AI Agents Get the Hype. Hooks Get the Job Done.](/writing/2026-09-05-agents-get-the-hype-hooks-get-the-job-done)

---
