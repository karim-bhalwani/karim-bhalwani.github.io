---
layout: post
title: "Route the Intelligence, Not Just the Context."
date: 2026-05-10 09:00:00 -0500
reading_time: 10
categories: AI systems engineering
tags: [Edge Inference, On-Device AI, Model Routing, Hybrid Inference, Privacy]
author: Karim Bhalwani
excerpt: "You built the harness. Now you're calling a frontier model for everything. The same model that writes a novel handles a spell check. The problem isn't the model. It's that you never asked whether the task needed it."
topics: [token-economics, agent-harness]
---

![Not Every Task Needs a Surgeon Hero](/assets/right-sized-model/hero-main.png)

A hospital has neurosurgeons. It also has nurses, residents, technicians, and specialists. Each trained for a specific range of work. Each deployed when the task actually demands their skill.

A neurosurgeon does not take your blood pressure. Not because they couldn't. Because the hospital would grind to a halt, and go bankrupt, if they did.

Hold that image. We're coming back to it.

---

You've probably done this: a team builds an agentic harness, routes every task through a frontier model, and watches the system run beautifully for three weeks. Then someone checks the API bill.

One agent consumed 10 billion tokens in eight months. You trace it back. Converting acceptance criteria into Gherkin scenarios. Structured templating against a format you already defined. Confirming that a pull request touched the files listed in the spec.

Tasks that needed a technician, billed at neurosurgeon rates.

The model was not the problem. The default was.

---

## The Harness Has a Blind Spot

In [Building the Control Layer](https://karim-bhalwani.github.io/ai/systems/software-engineering/architecture/2026/04/26/building-the-control-layer/), I wrote about the infrastructure around the model. The harness manages context, routes tools, enforces boundaries, and persists state between sessions. The model just generates tokens. The harness is the system.

That is still true. But there is a quiet assumption buried in most harness implementations: all token generation goes to the same place. One frontier API call per task, regardless of what the task actually is.

You built precision routing for context. You never built it for the model itself.

Every agent call is a question you forgot to ask: does this task actually require a frontier model?

**The harness routes tasks. It should also route intelligence.**

---

## Three Tiers. One Decision.

This is not about which vendor to choose. It is about recognizing that intelligence has a natural shape, and most tasks fit comfortably in the lower tiers.

Picture three circles. Not a product comparison. A decision map.

The outer circle is frontier reasoning. Models trained to think before responding. Complex, multi-step judgment. Novel problems where the answer is not in any document you own. The pricing, around $30 per million tokens at the high end, is the market's signal about what that reasoning is worth. Use it when the task justifies it.

The middle circle is capable models that run on your own hardware. No API key. No internet connection. No billing meter. They do not know everything a frontier model knows. They do not need to. Summarizing a document you wrote, extracting entities from a known schema, classifying support tickets, generating structured output from a template. Fast, accurate, and free after setup.

The inner circle is your domain. You did not fine-tune it. You fed it. Your API contracts, your clause templates, your codebase patterns, loaded through the harness as Skills at the moment they matter. The model stays generic. The context is yours. That is what makes the output specific.

Most agents spend 80 percent of their calls in the outer circle. Most of those calls belong in the middle.

**You are not paying for capability. You are paying for the wrong default.**

![Three Tiers Decision Map](/assets/right-sized-model/three-tiers.png)

---

## What This Actually Looks Like

Forget specs and benchmarks for a moment. Think about what changes when the model runs closer to the work. And notice how familiar the pattern looks.

A lawyer on a flight reviewing a 200-page acquisition agreement. The contract is confidential. It cannot touch a third-party server. A local model, running on a laptop in airplane mode, reads the document, surfaces the indemnification clauses, flags three liability caps that differ from the term sheet, and produces a structured summary. No network required. No data transmitted. Done before landing.

A physician on a hospital ward with patchy WiFi dictates notes. A local model converts audio to structured format against the patient's record. The transcript never reaches an external server. The summary appears in the chart in seconds.

A developer merges a feature branch at midnight. The local coding agent checks style conventions, catches a missing error handler, flags a naming inconsistency against the project's patterns. None of that requires a frontier model. It requires knowing the rules. The local model already does.

The frontier gets one call. The agent hit an architectural decision it could not resolve. Novel problem. Genuine ambiguity. That is what the outer circle is for.

You have seen this pattern before. A defined task goes to the person trained for that task. An undefined problem goes to whoever can actually solve it. Every well-run hospital works this way.

**The best model for a task is the smallest one that gets it right.**

---

## The Pricing Already Said It

The major AI providers publish their pricing tiers publicly. The gap between their most capable models and their lightweight ones is not random. They are telling you, in dollar terms, which tasks belong where. Their own documentation says it plainly: use flagship models for complex, multi-step problems. Use smaller models for everyday tasks.

The market already built the tiering. Most architectures ignore it.

Run the math on a single agentic workflow that makes fifty model calls per task. Ten calls require frontier reasoning. Forty are classification, formatting, or retrieval. Routing those forty to a local or lightweight model cuts the cost per execution by 60 to 80 percent. Multiply that across thousands of daily executions and the savings stop being marginal. They become structural.

The flat-rate era that subsidized "call the frontier model for everything" is ending. Surcharges for large prompts, token-based billing replacing seat licenses. These are not complications. They are a forcing function, pushing architects toward the question that should have been asked from the start: what does this specific call actually need?

**When pricing pressure forces the right architectural question, that is not a constraint. That is a gift.**

![Routing Cost Math](/assets/right-sized-model/routing-math.png)

---

## The Data That Should Never Leave

There is a category of work where local inference is not an optimization. It is the only acceptable choice.

A lawyer pastes a client's case details into a public AI platform. The moment that information lands on someone else's server, the confidentiality that legal privilege depends on is gone. The client never consented to their strategy being readable by a vendor's infrastructure team.

The same scenario plays out in a hospital. A physician dictates patient notes into a cloud service. The vendor gets breached six months later. Every compliance checkbox was followed. None of it mattered once the data left the building.

Local inference removes the exposure at the source. The model runs on the device. The data never transmits. There is no server to breach. No terms of service that trade privacy for convenience. No third party holding information that was never theirs to hold.

This is not a security feature you add later. It is the architecture you choose from the start.

**The only data that cannot be breached is the data that never left.**

![Local vs Cloud Inference](/assets/right-sized-model/data-never-left.png)

---

## The Next Layer Is Already in Your Hands

Here is what I want to leave you with.

You've spent months building the harness. Tiered context loading, session state, skill modules, checkpoint files. Every piece of that infrastructure was built around one insight: the system around the model matters more than the model itself.

The next layer of that same insight is model routing. Not routing context. You already do that. Routing intelligence. Building the decision logic that determines, for each call your harness makes, which tier of model to reach.

That logic does not need to be complex. It starts with three questions.

Is this task routine or novel? Is the answer in a document you already own, or does it require reasoning about something genuinely new? Is this data private, or can it safely leave the building?

Ninety percent of calls answer these questions the same way every time. Route them locally. Escalate to the frontier only when local reasoning falls short. Log every escalation. Over time, the log tells you exactly where your local setup is underperforming and where you are overpaying for no reason.

The pattern emerging in production: local models handle the defined work. The frontier handles the undefined. The harness orchestrates the boundary between them.

This is not a new architecture. It is the architecture you already built, extended one layer deeper.

![Routing Logic Flow](/assets/right-sized-model/routing-logic.png)

**Every API call is a question. Does this task actually need a surgeon?**

---

The harness wraps the model. That much is established.

The next layer is the question you forgot to ask before the token counter started running.

We are building systems that run continuously, make thousands of model calls per day, handle data we cannot expose. A single default endpoint, regardless of how capable, is not an architecture. It is a placeholder.

The hospital analogy holds all the way down. You staff for the work you actually have. Most of it does not need a neurosurgeon.

**Build the routing layer. The frontier is for the cases that actually need it.**

---

## Resources & Next Steps

* [Ollama: Run Models Locally](https://ollama.com)
* [llama.cpp: CPU and GPU Inference for Open Models](https://github.com/ggerganov/llama.cpp)
* [Google Gemma: Edge and Mobile Models](https://ai.google.dev/gemma)
* [Microsoft Phi: Small Language Model Research](https://azure.microsoft.com/en-us/products/phi)
* Related post: [Building the Control Layer](https://karim-bhalwani.github.io/ai/systems/software-engineering/architecture/2026/04/26/building-the-control-layer/)
* Related post: [Code Got Cheap. Judgment Did Not.](https://karim-bhalwani.github.io/ai/systems/engineering/2026/04/03/code-got-cheap/)

---
