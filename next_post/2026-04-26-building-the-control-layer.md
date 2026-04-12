---
layout: post
title: "Building the Control Layer: How Agent Harnesses Make AI Reliable"
date: 2026-04-26 09:00:00 -0500
reading_time: 14
categories: AI systems software-engineering architecture
tags: [AI Agents, Agentic Harness, Agent Architecture, Memory Management, Execution Safety, Context Optimization, Production Systems]
author: Karim Bhalwani
excerpt: "The model is not the system. The harness that wraps it, manages memory, enforces execution boundaries, and orchestrates tool calls, that is the system. Here are the seven ingredients that make autonomous agents reliable."
---

![Building the Control Layer Hero](/assets/agentic-harness/hero-main-1.png){: .img-hero }

You've probably done this: pointed an agent at a codebase and watched it scaffold a feature in fifteen minutes. Impressive. Then you pointed the same agent at the same codebase the next morning. It forgot every convention it followed yesterday. It rewrote a module it already built. It called an API that no longer exists because it hallucinated the endpoint from a stale context window.

The model didn't get dumber overnight. The model was never the system. The model was always a component inside a system that nobody designed.

**The infrastructure around the model determines whether agents work. The model just generates tokens.**

---

## The Harness Is the System

When teams hit reliability problems with autonomous agents, the instinct is to upgrade the model. Bigger context window. Better reasoning. More parameters. This rarely fixes anything, because the model was never the problem.

An *agentic harness* is the software layer that wraps around a core language model, managing what the model sees at each step, what tools it can call, how errors propagate, and how work persists. The harness assumes responsibility for everything except the probabilistic generation itself. Think of it as the operating system for your agents. The model is the CPU. Without an OS managing memory, scheduling processes, enforcing permissions, and handling I/O, the CPU is just silicon that runs hot and crashes.

The pattern I keep seeing: rewriting the control layer yields larger reliability gains than swapping models. A mediocre model inside a well-designed harness outperforms a frontier model running naked every time. Drop the same open-weight model into two different harnesses and you get two completely different reliability profiles. The harness is the differentiator, not the model.

So what goes into the harness? I've been building and iterating on a multi-agent orchestration system and have converged on seven ingredients. Some are table stakes for any agent. Others only emerge when you're coordinating twelve agents across a pipeline.

![Model vs Harness — The OS Analogy](/assets/agentic-harness/model-vs-harness.png)

**You don't fix agent reliability by scaling parameters. You fix it by engineering the control layer.**

---

## 1. Tiered Context Loading

The first question any harness must answer: *what does the model see on each turn?*

Smart runtimes separate a stable prompt prefix (instructions, tool descriptions, workspace summary) from the changing session state (latest request, recent transcript, short-term memory). The stable part gets cached. The changing part gets rebuilt each turn. That separation is necessary but insufficient for multi-agent systems. When twelve agents share a project, each one needs different domain context. The data engineer needs medallion architecture patterns. The security reviewer needs OWASP checklists. Neither needs both. Loading everything into every agent consumes the context window with domain knowledge before any task-specific reasoning begins.

The fix is tiered loading with a strict budget:

```
.copilot/context/
  PROJECT_CONTEXT.md     ← Tier 1: Always loaded (< 200 lines)
  ORIENTATION.md         ← Tier 1: 5-min quick-start summary
  ARCHITECTURE.md        ← Tier 2: Loaded for architecture tasks
  CODEBASE_PATTERNS.md   ← Tier 2: Loaded for coding tasks
  DECISIONS.md           ← Tier 3: Loaded only when referenced
```

**Tier 1** loads at session start, every session, every agent. Project name, tech stack, critical rules, deployment target. Budget: under 200 lines, enforced as a hard constraint, not a suggestion.

**Tier 2** loads when the task domain matches. The agent working on data pipelines loads the data engineering context. The agent reviewing a PR loads the security checklist. Task-matched loading is how you get domain expertise without paying the token cost on every interaction.

**Tier 3** loads only when explicitly cited. Decision logs, historical templates, deep references. This content never enters the prompt unless something specifically requests it.

Why the 200-line budget on Tier 1? Because it's loaded into *every* task. A 500-line Tier 1 measurably degrades reasoning quality across all downstream operations. The constraint forces discipline: if everything is critical, nothing is.

![Tiered Context Loading — Tier 1, 2, 3 Hierarchy](/assets/agentic-harness/tiered-context.png)

The [Meta-Harness research](https://arxiv.org/abs/2603.28052) from Stanford (March 2026) validated this at scale. Automated end-to-end optimization over harness code, including context management, retrieval, and prompt construction, achieved a 7.7-point accuracy gain over state-of-the-art while *reducing* token costs by 4x (from ~51K to ~11K tokens). The insight: optimizing which context the model sees at each step yields larger gains than any prompt engineering technique applied at the model level.

**Context capacity is not the constraint. Context curation is.**

---

## 2. Structured Session Memory

Most agent systems separate working memory (a small, distilled state) from the full transcript (every request, response, and tool output). The full transcript is the durable record. The compact transcript is what actually goes back into the prompt. That distinction matters, but it only covers one agent talking to itself across turns.

A multi-agent harness needs an additional layer: *pipeline-level* state that persists across agent handoffs, not just across turns within a single agent.

The pattern: a checkpoint file written at the end of every agent's turn that the next agent reads at the start of its turn.

```markdown
# Session State

> **Last Updated:** 2026-04-25T14:30:00Z
> **Last Agent:** senior-developer
> **Status:** paused

## Pipeline Position

- **Current Phase:** Build
- **Pending Handoff:** guardian

## Completed Steps

1. [2026-04-25 09:15] architect: Spec approved, saved to .copilot/specs/SPEC.md
2. [2026-04-25 11:30] senior-developer: Core module implemented with tests

## Pending Steps

1. guardian: Security review and holdout validation
2. release-manager: Deployment and changelog

## Context Pointers

- .copilot/specs/SPEC.md
- src/api/checkout.py
- tests/test_checkout.py
```

The *Context Pointers* section is the most valuable part. Accurate pointers save the resuming agent from re-exploring the entire codebase. Load the pointed files, continue from `Pending Steps`. No context reconstruction.

The write rule is mandatory: at the end of *any* non-trivial task where work may continue, the agent writes this file. Target under 60 lines. A missing state file means the next session starts blind.

Beyond session state, agents need access to persistent organizational knowledge, what I call the *Project Bible*. This is `PROJECT_CONTEXT.md`: the authoritative source for project identity, tech stack, critical rules, and deployment target. The rule is absolute: if a decision, convention, or architectural rule is not encoded as a versioned repo artifact, it is invisible to every agent. Knowledge in Slack threads, meeting notes, or people's heads does not exist from the system's perspective.

**Memory is an engineering problem. Treating it as a model feature is how agents forget.**

---

## 3. Skills: Domain Expertise as Loadable Modules

When one agent handles everything, domain knowledge lives in the system prompt. When twelve agents span architecture, implementation, data engineering, security review, and deployment, domain knowledge needs to be modular, loadable, and bounded.

A skill is a self-contained module that encodes *how* work gets done in a specific domain:

```
data-engineering/
  SKILL.md           ← The contract: capabilities, constraints, workflow
  references/        ← Templates, checklists, examples
  scripts/           ← Optional automation
```

Each skill defines what it does, what it does *not* do, and the conditions under which it loads. The "does not do" boundary is critical: it prevents scope creep at the module level. The data engineering skill handles PySpark and Delta Lake. It does not handle API design. That's the architect's skill.

Skills use a deliberate load-before-use pattern:

```yaml
---
name: data-engineering
description: PySpark, Delta Lake, dbt, data quality frameworks
disable-model-invocation: true  # Must be loaded explicitly
---
```

The `disable-model-invocation` flag creates three categories:

- **Domain skills** load only when the task matches. An agent starting a pipeline task loads `data-engineering`. An agent doing a code review loads `guardian`.
- **Background skills** (like verification gates) load automatically when specific conditions trigger but remain invisible to the user.
- **Gating skills** (like security boundaries) load only when untrusted content is detected or a delegation decision is required.

If all 21 skills in a system were pre-loaded simultaneously, the context window would be consumed by domain knowledge before any task-specific reasoning could begin. Progressive disclosure is the mechanism.

The practical test: can a team write a skill once and use it across any agent, any tool, any platform? If it requires platform-specific hooks, it's a plugin, not a skill. Skills are YAML and Markdown. No proprietary tooling. Your team's expertise travels with *you*, not with your IDE.

**Skills encode how your organization actually works. The harness is the runtime that loads them.**

---

## 4. Structured Tool Access and Permissions

The basic mechanics of tool use are well understood: the model emits a structured action, the harness validates it, optionally asks for approval, executes it, and feeds the bounded result back. The harness gives the model *less* freedom but improves usability at the same time.

For a multi-agent harness, tool access needs an additional layer: *routing and eligibility*. Not every agent should have access to every tool, and not every request should reach the agent it's aimed at.

Entry points, parameterized prompts that route incoming requests, act as the front door. Each includes eligibility gates: scope checks that redirect oversized requests before they reach the wrong workflow. A quick-fix prompt that receives a 200-line change request routes to the full feature-planning workflow instead of attempting to handle it inline. The gate fires *before* any model call, saving tokens and preventing misrouted work.

Within each agent, tool permissions are constrained by role:

- The **architect** can read the codebase and write specifications. It cannot execute code or modify source files.
- The **guardian** can read everything, run analysis tools, and write review reports. It cannot modify a single line of code.
- The **senior developer** can read, write, and execute. But it cannot access holdout files (more on this in ingredient 6).

The pattern that prevents runaway execution: the **3-strike rule**. If the same operation fails three times consecutively, *stop*. Don't loop. Surface the failure with diagnostic information and escalate. This prevents the most common agent failure mode: burning through an entire context window retrying a fundamentally broken approach.

**Fewer choices lead to better decisions. Constraints eliminate wrong actions before the model chooses them.**

---

## 5. Pipeline Topology and Bounded Delegation

Single-agent delegation is straightforward: spawn a helper for a side task, give it enough context to be useful, run it inside tighter boundaries than the parent.

When you scale from one agent to twelve, delegation becomes topology. The instinct is to let agents talk to each other freely. A mesh. Sounds collaborative. In practice, it's a coordination catastrophe.

DeepMind's research on multi-agent systems (December 2025), which I unpacked in [The Bottleneck Moved](https://karim-bhalwani.github.io/ai/systems/engineering/2026/03/01/the-bottleneck-moved/), showed that peer-to-peer meshes degrade performance by 39-70% on sequential tasks and amplify errors up to 17x compared to centralized coordination. The reason is combinatorial: *n* agents in a mesh create *n(n-1)/2* communication pathways. Twelve agents produce 66 possible pathways. Every pathway is a potential error propagation channel.

A linear pipeline constrains coordination to a bounded surface:

![Pipeline Topology — Linear Flow with Bounded Handoffs](/assets/agentic-harness/pipeline-topology.png)

```
Discovery → Design → Build → Review → Ship
```

Twelve agents. Eleven handoff points. Predictable, traceable, auditable. Each phase has clear inputs and outputs. Each handoff has defined success criteria.

The critical structural principle: **one entity designs, multiple entities execute, one entity audits**. The designer doesn't implement. The implementers don't audit. The auditor doesn't modify code.

Handoffs between agents use well-known artifact paths with strict producer-consumer contracts:

```
.copilot/specs/SPEC.md            ← Architect writes, Developer reads
.copilot/holdout/HOLDOUT.md       ← Architect writes, Guardian reads
.copilot/artifacts/review-report.md ← Guardian writes, Release Manager reads
```

Each path has a single producer and one or more consumers. When everyone can write everywhere, nobody knows which state is authoritative.

Within the pipeline, delegation to subagents follows a strict context isolation principle. The golden rule: **subagents never inherit the orchestrator's session history.** Each subagent receives exactly what it needs:

```markdown
## Task: Add rate limiting to POST /api/checkout

**Spec section**: See .copilot/specs/SPEC.md §3.2
**Files to modify**: src/api/checkout.py, tests/test_checkout.py
**Acceptance criteria**:
- POST /api/checkout returns 429 after 10 requests/60s per IP
- 429 response includes Retry-After header
- Unit test covers threshold and reset behavior

**Output**: DONE / DONE_WITH_CONCERNS / NEEDS_CONTEXT / BLOCKED
```

No session history. No reasoning steps from the parent. No unrelated context. Context pollution causes the subagent to reason about the parent's session instead of its own task.

**More agents does not mean more capability. It means more coordination cost. Minimize the coordination surface.**

---

## 6. Verification Gates and Holdout Validation

This is the ingredient most harnesses skip entirely, and it's the one that determines whether "done" actually means done. In [Code Got Cheap](https://karim-bhalwani.github.io/ai/systems/engineering/2026/04/03/code-got-cheap/), I argued that verification ability, not generation velocity, is the new scarcity. That claim applies to agents as much as it does to engineers.

The first gate is a principle borrowed from machine learning: **separate the test author from the implementer**. In ML, you never evaluate a model on its training data. In agent systems, the entity writing acceptance criteria should be structurally different from the entity implementing the feature, and the criteria should be stored where the implementer cannot access them.

![Holdout Validation — Architect Writes, Guardian Reads, Implementer Is Blind](/assets/agentic-harness/holdout-validation.png)

The architect writes holdout scenarios and saves them to `.copilot/holdout/`. Implementation agents (senior developer, data engineer, AI engineer) are structurally blind to this directory. They cannot read it. The guardian loads the holdout during review and evaluates whether the implementation satisfies what real users need, not just what the tests check.

The contrast is sharp:

| Unit Test (Instruction) | Holdout Scenario (Intent) |
|---|---|
| `assert response.status_code == 200` | A logged-in user requesting their profile receives data within 2 seconds |
| `assert len(results) > 0` | A compliance officer searching "GDPR violations" finds all flagged records from 90 days |

Unit tests verify mechanism. Holdout scenarios verify outcomes. Agents will optimize for whatever metric you give them. If the metric is "tests pass," they'll write tests that match the code rather than tests that match the requirements. Holdout validation breaks that loop.

The second gate is the verification-before-completion iron law:

```
NO COMPLETION CLAIMS WITHOUT FRESH VERIFICATION EVIDENCE
```

If the agent hasn't run the verification command *in this message*, it cannot claim it passes. "Should work" is not evidence. "Tests passed last time" is not evidence. The gate function:

1. **Identify**: What command proves this claim?
2. **Run**: Execute the full command, fresh.
3. **Read**: Full output, exit code, failure count.
4. **Verify**: Does output confirm the claim?
5. **Claim**: Only then. With evidence.

Skip any step and the claim is a guess, not a verification.

Each agent also defines an **intent contract**: what must be true when work is done, expressed as outcomes rather than procedural steps.

The architect's contract: *"Two independent teams could implement both sides of any module boundary and integrate on the first attempt."*

The developer's contract: *"The feature works correctly for the end user, not just for the test suite."*

The guardian's contract: *"A team lead can make a ship/no-ship decision in under 5 minutes without re-reading the code."*

Intent contracts prevent the most subtle form of agent drift: doing exactly what was instructed while missing what was intended.

**Verification is not a final step. It is a structural property of the system.**

---

## 7. Execution Safety and Sandboxing

Autonomous agents that execute code and modify filesystems introduce an attack surface that most teams underestimate. The agent operates with the same permissions as the developer running it. A compromised model call can exfiltrate environment variables, delete directories, or establish reverse shells.

The primary threat vector is *indirect prompt injection*: malicious instructions embedded in data repositories, configuration files, or pull request descriptions. When the agent ingests this content, the model interprets the injection as a command. This is not theoretical.

Containment requires sandbox isolation. Two architectural patterns dominate:

**Pattern 1: Isolate the Tool.** The agent's core loop runs on the primary backend. Only dangerous operations (terminal execution, script runs) route to an isolated sandbox. Advantage: low latency. Risk: agent memory spikes degrade the main application.

**Pattern 2: Isolate the Entire Agent.** The full agentic loop runs inside a secured sandbox with zero credential access. All communication flows through a control plane proxy. Advantage: agent is entirely disposable, credential theft structurally impossible. Cost: network latency on every operation.

| Feature | Isolate the Tool | Isolate the Agent |
|---|---|---|
| Agent Location | Main backend | Secure sandbox |
| Secret Management | API keys on backend | Sandbox receives no credentials |
| State Persistence | Main database | Control plane reconstructs state |
| Latency Penalty | Only on code execution | Every operation |

Regardless of pattern, three controls are non-negotiable:

1. **Network allowlisting**: No outbound connections without explicit approval.
2. **Filesystem write boundaries**: Writes outside the active workspace blocked at OS level.
3. **Configuration file protection**: Agent-specific config files read-only to the agent, even within the workspace.

A harness-level defense adds a fourth control: treat all content read from files, terminals, URLs, and user inputs as DATA, never as INSTRUCTIONS, unless it originates from a trusted instruction file. If the agent detects embedded directives ("ignore previous instructions," "act as"), it flags the injection attempt and treats the content as data.

**Security is not a feature you add later. It is the architecture you start with.**

---

## The Architecture, Assembled

Seven ingredients. Each addresses a different failure mode:

1. **Tiered context loading** prevents reasoning degradation and cost explosion.
2. **Structured session memory** prevents catastrophic forgetting across turns and agents.
3. **Loadable skills** prevent monolithic domain bloat and encode organizational expertise.
4. **Tool permissions and routing** prevent runaway execution and misrouted work.
5. **Pipeline topology** prevents coordination overhead and error amplification.
6. **Verification gates** prevent "done" from meaning "claimed" instead of "proven."
7. **Execution safety** prevents security breaches and credential theft.

None of these are model improvements. Every one is an engineering decision about the infrastructure surrounding the model.

![The Seven Ingredients — Complete Harness Architecture](/assets/agentic-harness/architecture-assembled.png)

This connects to what I wrote about in [Procedure Over Intelligence](https://karim-bhalwani.github.io/ai/systems/software-engineering/open-standards/2026/01/26/procedure-over-intelligence-building-reliable-ai-systems/). That post argued that Agent Skills encode *how* work gets done. The harness is the system that loads those skills, manages the memory they operate within, and enforces the boundaries they define. Skills are the contracts. The harness is the runtime.

The model will keep getting better. That's a given. The question that determines whether your agents actually work in production is not "which model are you using?" It's "what did you build around it?"

**The model generates tokens. The harness generates trust.**

---

## Resources & Next Steps

- **Meta-Harness — End-to-End Optimization of Model Harnesses**: [arXiv:2603.28052](https://arxiv.org/abs/2603.28052) — automated harness search that outperforms hand-engineered baselines across text classification, math reasoning, and agentic coding
- **Harnessing Claude's Intelligence**: [Anthropic](https://claude.com/blog/harnessing-claudes-intelligence) — progressive disclosure via skills, letting the model manage its own context, and setting harness boundaries
- **Harness Design for Long-Running Apps**: [Anthropic Engineering](https://www.anthropic.com/engineering/harness-design-long-running-apps) — generator-evaluator patterns, context resets, and why every harness component encodes an assumption worth stress-testing
- **Harness Engineering — Leveraging Codex in an Agent-First World**: [OpenAI](https://openai.com/index/harness-engineering/) — repository as system of record, progressive disclosure, and mechanical enforcement of architecture
- **Building Effective Agents**: [Anthropic Engineering](https://www.anthropic.com/engineering/building-effective-agents) — foundational patterns for agentic system design
- **Cognitive Architectures for Language Agents (CoALA)**: [arXiv:2309.02427](https://arxiv.org/abs/2309.02427) — foundational framework for agent memory, action spaces, and decision procedures
- **Related post**: [Procedure Over Intelligence: Building Reliable AI Systems](https://karim-bhalwani.github.io/ai/systems/software-engineering/open-standards/2026/01/26/procedure-over-intelligence-building-reliable-ai-systems/) — how Agent Skills encode organizational expertise

---
