---
layout: post
title: "The Session Was Always the Ceiling."
date: 2026-05-29 09:00:00 -0500
reading_time: 11
categories: AI systems engineering
tags: [Background Agents, Agent Architecture, Developer Productivity, Cloud Agents, Engineering Velocity]
author: Karim Bhalwani
excerpt: "Your laptop was never the bottleneck. Your session was. The next wave of agents does not run on your machine. It runs in the cloud, fires on events, and finishes the work while you sleep. Here is what the teams who built it first learned."
topics: [multi-agent-orchestration, token-economics]
---

![The Session Was Always the Ceiling Hero](/assets/session-ceiling/hero-main.png)

There is a moment on every factory floor when someone asks the wrong question.

The question is: how do we make the workers faster?

The right question is: why does the factory stop when the workers go home?

Software engineering just had that moment. The teams who asked the right question are shipping a thousand pull requests a week. The teams who asked the wrong one have faster engineers and a longer review queue.

This post is about the right question.

---

## The False Summit

Most teams hit the same wall. They just hit it at different speeds.

The agent works. The pull request lands. You feel the leverage and want more of it. So you run another agent. Then two more. The machine stays on all day, the session stays open, and at some point you realize the constraint did not move. It just became invisible.

In [The Bottleneck Moved. Most Teams Have Not.](https://karim-bhalwani.github.io/ai/systems/engineering/2026/03/01/the-bottleneck-moved/), I wrote about where the constraint shifted: from writing code to knowing what to build and reviewing what agents wrote. That still holds. There is a layer underneath it that deserves its own examination.

Agents running on laptops are a false summit.

Four parallel agents on your local machine is impressive until the lid closes. Until the VPN drops. Until two agents fight over the same file. Until the task takes six hours and you need your computer back.

There is also a gravity problem. When Uber opened their agentic workflows to developers, 70 percent of what engineers pushed into the system was the unglamorous maintenance work nobody wants to do. Library upgrades. Dead code cleanup. Bug fixes. Doc generation. Not because anyone forced them. Because those tasks have clear start and end states, accuracy was higher, and success bred more use. The virtuous cycle ran toward the work engineers had been quietly avoiding for years. The session boundary is what kept it local when it should have been running overnight.

The personal throughput gain is real. The organizational throughput gain is not. You optimized the individual. You did not change the system.

You can see the peak from there. You are not at the peak.

**The laptop was never the ceiling. The session was.**

---

## What Changes When the Agent Leaves the Laptop

A background agent is not a coding assistant running quietly on your machine. The distinction matters.

A background agent runs in its own isolated environment in the cloud. Its own toolchain. Its own test suite. Its own credentials. Decoupled from your device and your session entirely. You kick one off from Slack, check the result from your phone, and review the pull request in the morning.

Three things change when the agent leaves the laptop.

The session boundary disappears. Local agents are bound to your terminal. Close the lid and the work stops. Background agents run to completion regardless. A six-hour migration does not require six hours of your attention. It requires thirty seconds to describe the task.

Concurrency stops being rationed. On a laptop, parallel agents compete for memory, CPU, and your working directory. In the cloud, each agent gets its own isolated environment. You stop asking how many you can run at once and start asking how many you need. Those two questions produce different architectures.

Security stops being implicit. On a desktop, an agent inherits everything on the machine: browser sessions, SSH keys, local clones, personal files. That convenience is also the exposure. A cloud-hosted background agent gets exactly what you give it, nothing more. Repository access is scoped. Credentials are injected at run start and cleaned up after. The blast radius of a mistake is bounded by design, not by trust.

![Local Agent vs Background Agent](/assets/session-ceiling/local-vs-background.png)

**Decoupling the work from the session changes what the system can become.**

---

## The Teams Who Built It First All Landed in the Same Place

Four organizations published their background agent architectures within months of each other. Different companies. Different stacks. Different problems. The takeaway from each one points at the same wall.

**Stripe** built Minions on top of disposable cloud sandboxes, kicked off from Slack, with structured workflows handling the scaffolding humans and agents both keep forgetting. The takeaway: over a thousand agent-authored pull requests merged every week, each one reviewed by a human. Volume only became safe once the environment was disposable.

**Ramp** built Inspect to give agents the same tools a human engineer uses to verify their work. Run the tests. Query the telemetry. Screenshot the preview. The takeaway: agents wired into your actual systems find what humans miss. In one week, Inspect surfaced nearly a hundred security vulnerabilities that penetration testing had not.

**Harvey** built Spectre for legal work, not code, and landed in the same architecture. The takeaway: the worker is disposable, the run is durable. No process is kept alive to hold state. Anyone on the team can inspect, resume, or redirect a run because the run itself is the source of truth.

**Uber** built Minions on their own CI platform because external vendors were not an option. The takeaway: when you remove the friction, developers route the repetitive, low-judgment work into the system first. 70 percent of their volume. The tasks with clear start and end states ran best, accuracy compounded, and the system grew toward the work it was most useful for.

Four teams. Four stacks. One conclusion. The session was the ceiling, and removing it changed what the organization could ship.

**The pattern is visible enough to learn from instead of rediscover.**

---

## The Five Primitives

Every team arrived at the same five structural decisions independently. Not as best practices. As requirements that reality imposed on them.

**Sandboxed execution.** Isolated, reproducible environments. Not a shared server. Not an engineer's laptop. A fresh environment per run, scoped to exactly what the task needs and nothing else.

**Governance at the runtime layer.** Identity, permissions, and audit trails enforced by infrastructure, not by prompts. The agent does not have permission because you asked it to behave. It has permission because the runtime grants it specifically and revokes it when the run ends.

**Context and connectivity to internal systems.** Agents that cannot reach your CI pipeline, your internal APIs, your test suite, or your feature flags cannot verify their own work. Connection to your actual systems is what separates an agent that investigates from one that guesses.

**Event-driven triggers.** A background agent you have to remember to run is not a background agent. It is a faster batch job. Real background agents fire on repo events, Slack messages, Jira tickets, cron schedules, Sentry alerts. The trigger is part of the architecture.

**Fleet coordination.** Parallel provisioning across repositories, with progress tracking. Not one agent on one repo. A fleet of agents across the systems that need attention, coordinated, observable, auditable.

![Five Primitives of a Background Agent Platform](/assets/session-ceiling/five-primitives.png)

These are not nice-to-haves. They are the difference between agents that help one engineer and agents that change how an organization ships.

**Sandbox, governance, context, trigger, fleet. Miss one and the system collapses back into your session.**

---

## The Harness Is Still the System

In [Building the Control Layer](https://karim-bhalwani.github.io/ai/systems/software-engineering/architecture/2026/04/26/building-the-control-layer/), I wrote that the model is not the system. The harness around it, managing context, routing tools, enforcing boundaries, persisting state, is the system.

Background agents do not change that. They extend it.

Harvey's team described it plainly. A harness turns a model that can use tools into a system that can do work. That means assembling the working context of a run, starting the right provider, translating provider events into a stable internal shape, deciding how progress is represented, and determining how the run changes state, with clear tools, stop conditions, and terminal states.

A thin SDK wrapper is fine until you need durability, shared visibility, retry semantics, cost accounting, multi-provider support, and collaboration surfaces. At that point the harness becomes the product.

Uber made this explicit. They built Minions with abstraction layers specifically so they could swap the underlying model or vendor without rebuilding the system. Their reasoning was direct. The tech we are building will likely be replaced by something better. The goal is not to protect the investment in a specific tool. The goal is to keep delivering impact while the tools keep changing underneath you.

**The model generates tokens. The harness generates trust.**

---

## The Shift Nobody Anticipates

There is a framing that shows up across every team that built this: engineers move *on* the loop instead of *in* it.

Uber put it plainly. Developers are no longer writing the code. They are acting as their own tech leads, directing agents, course-correcting when needed, reviewing the result. The engineer who used to write the migration script now describes the migration in language. The agent runs it. The engineer reviews the pull request, catches the edge cases the agent missed, and approves what is right.

That is not a reduction in engineering judgment. It is a redistribution of where judgment gets applied. The leverage point shifts from writing every line to designing the systems, describing the tasks clearly, and reviewing the output critically.

There is a second-order effect most teams do not anticipate. As agent output increases, review volume increases with it. Uber saw it directly. Developers were spending more and more time in code review because there was simply more code arriving. Review is the work engineers like least. Done under volume pressure, it is also where mistakes slip through.

The background agent solved the generation problem and created a review problem. That is not a failure. It is the next constraint to design around.

The teams who treated background agents as architecture got the organizational velocity gain. The teams who treated them as tooling got faster individuals and a longer review queue.

**Organizational velocity is not a model problem. It is a session boundary problem.**

---

## What This Means If You Are Building Now

Four questions sit upstream of every other decision.

Does this work need a human present to run, or can it run to completion unattended? If it can run unattended, it belongs in the cloud, not on a laptop.

Can the agent verify its own work? If it cannot reach your test suite, your telemetry, or your actual systems, it is generating output, not completing tasks. The difference matters.

What is the blast radius if it goes wrong? The answer determines your sandbox design, your permissions model, and your audit trail. Get it wrong and you will rebuild the security layer under a system already in production.

Is the task description good enough to produce a good result? Uber built a prompt improver directly into Minions because low-quality prompts produced low-quality runs, and developers do not always know the difference until the pull request arrives wrong. Output quality is bounded by input quality. Good defaults and prompt tooling are not polish. They are infrastructure.

![Four Questions Upstream of the Build](/assets/session-ceiling/four-questions.png)

The teams at Stripe, Ramp, Harvey, and Uber built these primitives themselves. It took months of dedicated platform engineering each time. The structural decisions did not vary.

**The pattern is visible. You do not have to rediscover it.**

---

## The Factory Floor, Revisited

We started with a factory floor and a wrong question.

The wrong question was how to make the workers faster. The right question was why the factory stops when the workers go home.

A coding assistant answers the wrong question. Faster, more capable, still requires the worker to be present. Still stops when the session ends.

A background agent answers the right one. The work runs through the night. The engineer arrives in the morning to review what was built. The judgment applied overnight was encoded upstream. In the task description. In the permissions. In the stop conditions. In the review gate. The expertise is applied before the run, not beside it.

Stripe called it pair programming that does not require both pairs to be present at the same time. Harvey called it a durable run that anyone on the team can inspect, resume, or redirect. Both descriptions point at the same thing.

Work that is no longer trapped in one person's session.

That is the shift. Not faster coding. Organizational velocity decoupled from individual presence.

The question was never how to make the worker faster. The question was why the factory stopped when they left.

Now you know the answer. The harder question is whether you build around it.

**The session was always the ceiling. The cloud is where the ceiling goes away.**

---

## Resources & Next Steps

* [Stripe: Minions, Part 1](https://stripe.dev/blog/minions-stripes-one-shot-end-to-end-coding-agents)
* [Stripe: Minions, Part 2](https://stripe.dev/blog/minions-stripes-one-shot-end-to-end-coding-agents-part-2)
* [Ramp: Why We Built Our Background Agent](https://builders.ramp.com/post/why-we-built-our-background-agent)
* [Harvey: Building Spectre](https://www.harvey.ai/blog/building-spectre-internal-collaborative-cloud-agent-platform)
* [Ona: Engineering Leader's Guide to Background Agents](https://ona.com/guides/background-agents)
* Related post: [Building the Control Layer](https://karim-bhalwani.github.io/ai/systems/software-engineering/architecture/2026/04/26/building-the-control-layer/)
* Related post: [The Bottleneck Moved. Most Teams Have Not.](https://karim-bhalwani.github.io/ai/systems/engineering/2026/03/01/the-bottleneck-moved/)
* Related post: [Route the Intelligence, Not Just the Context.](https://karim-bhalwani.github.io/ai/systems/engineering/2026/05/10/route-the-intelligence/)

---
