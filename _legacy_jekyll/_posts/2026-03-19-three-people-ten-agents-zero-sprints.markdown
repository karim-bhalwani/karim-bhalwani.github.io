---
layout: post
title: "Three People. Ten Agents. Zero Sprints."
date: 2026-03-19 09:00:00 -0500
reading_time: 10
categories: AI systems engineering
tags: [Crews, Spec-Driven Development, Agile, Team Structure, Agentic Workforce, Production Systems]
author: Karim Bhalwani
excerpt: "A twelve-person sprint team shipped one feature in two weeks. Three people with ten agents shipped the same feature by Wednesday. The difference is not productivity. It is physics."
---

![Three People Ten Agents Hero Image](/assets/zero-sprints/hero-main.png)

A team of twelve ran a two-week sprint. Sprint planning. Ten standups. Backlog grooming. Review. Retro. One feature shipped on day fourteen.

A team of three wrote a spec on Monday morning and pointed their agents at it. The feature was in production by Wednesday. No standup. No retro. No blocker board. The twelve-person team was still debating acceptance criteria.

Same feature. Same complexity. One team had twelve humans coordinating. The other had three humans specifying and ten well-scoped agents executing.

This is not a productivity story. It is a physics story.

A twelve-person team has 66 possible communication pathways: n(n−1)/2. Every pathway is a potential conversation, clarification, meeting, or message thread. Add one more person and twelve new pathways appear instantly. Coordination grows faster than the team itself. As teams expand, the surface area of communication increases faster than the work the team is trying to accomplish. Eventually, a growing share of effort goes into staying aligned rather than building.

In a three-person team, there are 3 pathways. Alignment is the default state.

For two decades, the tradeoff was tolerable. More humans meant more capacity. Communication overhead was the price of admission. That equation broke. When agents handle execution, every human you add past the coordination threshold does not increase output. It increases the overhead required to keep output coherent.

My last two posts built toward this. [The Bottleneck Moved](https://karim-bhalwani.github.io/ai/systems/engineering/2026/03/01/the-bottleneck-moved/) argued that specification, not execution, is the new scarcity. [The Agents Work. The Organization Does Not.](https://karim-bhalwani.github.io/ai/systems/engineering/2026/03/13/the-agents-work-the-organization-does-not/) argued that no amount of AI tooling matters if the organization itself is not rebuilt around how agents actually work.

This post closes the arc. If specification is the bottleneck and the organization must change, then the atomic unit of change is the team. This is what the redesigned team actually looks like.

---

## The Coordination Surface Nobody Measures

Software architects solved this problem years ago. When a monolith grows too large, you do not keep adding code. You decompose it. You split the system into services with clean interfaces because tightly coupled components every function calling every other function slow the system as it grows. The cost of keeping everything coherent rises faster than the value of the next feature.

Teams behave the same way. They are organizational monoliths.

![Communication Pathways](/assets/zero-sprints/pathways.png)

The math is simple. A twelve-person team creates sixty-six communication pathways. A three-person team creates three. But the formula alone does not explain why organizations keep choosing sixty-six. For decades, each pathway carried real load. Twelve people meant twelve sets of hands writing code, designing systems, shipping features. The coordination tax was real, but the capacity it bought justified the cost. Organizations tolerated the overhead because they needed the humans.

That constraint dissolved. A three-person team running agents now produces what used to require a department. The work no longer needs twelve humans. But the org chart still allocates twelve. And those twelve still generate sixty-six relationships, each one consuming attention that could go toward judgment, specification, or review.

Organizations feel the slowdown but misdiagnose the cause. They see slow shipping and assume they need more people. They add headcount and get more sync meetings. They get more meetings and see slower shipping. They assume they need better processes. They add ceremonies. They get more overhead. The cycle feeds itself.

The pathology is the team size itself. Not the process. Not the tools. Not the people. The number of relationships the team must maintain just to stay coherent.

DORA's 2025 research, surveying nearly 5,000 technology professionals, puts a finer point on this: AI is an amplifier. It magnifies the strengths of high-performing organizations and the dysfunctions of struggling ones. A small, well-specified team gets amplified into a powerhouse. A bloated, misaligned team gets amplified into chaos.

**Every person beyond the coordination threshold does not add capacity. They add drag that scales with how productive your team already is.**

---

## The Trap of Cheap Output

A team deployed agents across a dozen developers. Weekly pull requests quadrupled. Three weeks later, the integration environment was broken four days out of five. The agents had generated working code individually. Nobody had enough shared context to verify whether it worked together.

AI makes generating code, content, and designs nearly free. A model produces ten iterations in the time it takes a person to describe one. Every conversation about AI and teams fixates on this acceleration. More code. More content. Faster.

This fixation leads to structural mistakes that compound.

The bottleneck was never volume. I argued in [The Bottleneck Moved](https://karim-bhalwani.github.io/ai/systems/engineering/2026/03/01/the-bottleneck-moved/) that "organizations that cannot specify with precision will build the wrong things at unprecedented speed." The same principle applies to team design. Optimizing your team for maximum output is optimizing for the wrong variable.

The research supports this consistently. When AI extends each person's competence into adjacent domains, functional silos collapse. An engineer reasons about product strategy. A product manager prototypes data models. The boundaries that justified ten specialists in ten narrow lanes dissolve, because AI fills the gap between what someone knows deeply and what they need to understand well enough to specify.

![Volume vs Correctness](/assets/zero-sprints/volume-correctness.png)

This is the mechanism that makes small crews viable. Three senior people using AI can each operate across a broader domain than they could alone. They need architectural judgment to extend their reach and they need each other as verification against specification blind spots.

Verification is the catch. Every piece of AI-generated output requires human judgment to validate. In a three-person team, the verification load distributes across a coherent shared context. Everyone knows what right looks like because everyone holds the same mental model. In a twelve-person team, AI output multiplies by another factor of four, but the shared context degrades. So the team schedules meetings to synchronize. Those meetings generate more decisions, more AI tasks, more output to verify, more meetings. Machine-speed output meets human-speed review. Contradictory plans proliferate. Confident-looking code accumulates.

A team of three can maintain a coherent specification: a shared definition of what they are building, why, and what "right" looks like. A team of twelve cannot. The specification fractures into sub-interpretations that drift apart, resynchronized only through meetings. When agents execute against fractured specifications, the output looks productive but does not cohere. This is the failure mode I described in [The Bottleneck Moved](https://karim-bhalwani.github.io/ai/systems/engineering/2026/03/01/the-bottleneck-moved/): building the wrong things at unprecedented speed.

**Specification coherence is the scarce resource. Small teams maintain it. Large teams lose it.**

---

## Sprints Were Built for a World That No Longer Exists

Agile was designed for a specific problem: managing ambiguity through iterative human feedback. Two-week sprints. Daily standups. Retrospectives. All of it assumed that humans were the ones doing the work and that iteration happened at human pace.

That assumption broke.

McKinsey found that 89% of organizations still operate with industrial-era hierarchies. 9% have adopted digital-era Agile. Only 1% have transitioned to the decentralized networks that agentic operations require.

The structural mismatch has a name: the Three-Speed Problem.

**Speed one: AI execution.** Continuous. Compounding. An agent iterates in seconds. No downtime for sprint planning.

**Speed two: Human adaptation.** Iterative but human-bound. Agile teams guide agents in two-week cycles, which restricts agent productivity by 70% or more.

**Speed three: Organizational governance.** Quarterly budgets. Hierarchical approvals. Legal reviews that take weeks. By the time the steering committee meets, the agents have iterated a hundred times.

When these speeds are incompatible, investment decays. 46% of AI pilots failed because organizations layered machine-speed execution onto human-speed governance. The agents sprinted. The organization crawled. The gap produced waste.

The two-week sprint itself becomes a bottleneck. You give an agent a task. It finishes in four hours. The sprint has ten days left. The agent waits. The human waits. Everyone waits for the ceremony.

This is not a failure of Agile. It is the end of the problem Agile was built to solve. When execution takes seconds instead of weeks, the iteration cycle is not bi-weekly. It is continuous.

Deloitte's 2026 State of AI report surveyed over 3,200 leaders and found that 84% of companies have not redesigned jobs or work itself around AI. Half are considering flatter, pod-based structures. Only 16% have implemented them to a meaningful extent. The gap between knowing and doing is where most AI investment goes to die.

**Agile was the right answer to a question the industry no longer asks.**

---

## Specs Replace Stories

User stories were designed to facilitate conversation between humans. "As a user, I want to upload a file so that I can share it with my team." Intentionally vague. Meant to start a dialogue.

AI agents do not need dialogue. They need constraints.

When you hand an agent a fuzzy user story, it hallucinates. It fills gaps with plausible nonsense. Developers end up spending 75% of their time correcting drift rather than building features. The industry calls this "vibe coding." It feels productive. The output is unreliable.

Spec-Driven Development inverts this. Instead of starting vague and converging through conversation, you start precise and let agents execute with confidence.

![Specs vs Stories](/assets/zero-sprints/specs-vs-stories.png)

A spec has four layers.

**Requirements.** What and why, in business terms. Human-validated. This is the contract between the product owner and the team.

**Design.** Technical architecture, APIs, data flows. The founding engineer writes this. It is the source of truth agents follow.

**Tasks.** Granular, isolated, testable steps broken from the design. Each task runs in a parallel worktree. No merge conflicts. No agent stepping on another agent's files.

**Steering.** Persistent rules and conventions, security standards, naming patterns, test coverage thresholds, that every agent inherits automatically.

This is what I built toward in [Procedure Over Intelligence](https://karim-bhalwani.github.io/ai/systems/software-engineering/open-standards/2026/01/26/procedure-over-intelligence-building-reliable-ai-systems/). Agent Skills encode the how. Specs encode the what. Together, they replace the conversation that Agile ceremonies used to provide. Except the conversation happens once, in writing, and every agent executes from the same source of truth.

By the time instructions reach the agent, they are precise enough to produce production-ready code with 90% first-run success. If the output is wrong, you refine the spec and regenerate. You do not debug the code. You debug the intent.

**The unit of work is no longer the story. It is the spec.**

---

## Two Teams. No Middle Ground.

AI-native organizations are converging on two team archetypes. Not departments. Not squads. Mission units.

**Pathfinders.** A single person with a full AI toolkit. Zero coordination overhead. One person, many agents, total autonomy. Pathfinders map territory. They prototype. They prove viability. This is not hypothetical. In the first half of 2025, 36.3% of new startups were founded by a single person, according to data from Carta Solo Founders Report 2025. The constraint is a single person's judgment, which is perfect for exploration and dangerous for production.

**Crews.** Three to five people executing against a production target. Small enough that everyone maintains the shared mental model. Senior enough to provide the judgment layer agents cannot. Every member on a three-person team is visible. Every contribution is legible. There is no organizational cover.

![Pathfinders and Crews](/assets/zero-sprints/scouts-strike.png)

The crew follows what practitioners call the 1:2:3 model.

**The 1**: a product manager with supreme trade-off authority. Not a coordinator. A decision-maker. In an environment where agents generate ten iterations before a committee can schedule a meeting, waiting for consensus is operationally impossible.

**The 2**: a founding engineer who writes the architectural constitution, and a productization engineer who hardens prototypes into production code. The founding architect does not write features. They write the constraints every agent follows. The productization engineer ensures AI-generated code survives contact with real users.

**The 3**: quality, DevOps, and reliability. Not a downstream checkpoint. A top-tier governance authority. They own security vulnerabilities, injection risks, and non-functional guarantees. Because AI-accelerated systems fail faster than human systems, the infrastructure must be automated end to end.

For legacy modernization, organizations deploy a third pattern: the agent factory. Minimal human oversight. Well-defined inputs and outputs. The agents handle execution. Humans handle exceptions. But for anything that requires innovation, judgment, or taste, the crew is the only viable unit.

**The two-pizza team is dead. The one-pizza pod replaced it.**

---

## Nobody Applied for This Job

When agents handle execution, every human role moves toward judgment.

McKinsey documented a "shift right" in the software product development life cycle. Product managers are no longer coordination hubs. They are product builders. AI stitches together telemetry, service tickets, social sentiment, and competitive research into a coherent picture. A single PM can run discovery, prototype, generate marketing collateral, and build technical proofs-of-concept with minimal involvement from designers or engineers.

Roles that used to require separate specialists, product marketing, UI/UX, technical product management, are converging into the PM. Not because those disciplines are less important. Because AI handles the routine execution within each one, and a single capable person can orchestrate across all of them.

Engineers shift from writing code to reviewing architecture. From syntax to systems thinking. The demand is not for more developers. It is for senior engineers who understand cross-cutting dependencies and can catch the subtle, compounding errors that AI-generated code quietly introduces.

This echoes what I wrote in [The Agents Work](https://karim-bhalwani.github.io/ai/systems/engineering/2026/03/13/the-agents-work-the-organization-does-not/): "The skills that compound from here are problem framing, task decomposition, and the ability to specify work clearly enough that a system can execute without hand-holding." The crew is composed of people who have those skills. Everyone else is either developing them or being replaced by an agent that does not need them.

There is a talent consequence that follows directly. In a three-person crew, every member's specification quality gets multiplied by agents. A weak specifier does not merely underperform. They introduce noise into the shared context. Their imprecise definitions propagate through agent-generated output, creating verification burdens on every other member. The strong performers spend their time diagnosing drift instead of building. The crew gets slower, not because it lacks capacity, but because the specification surface is contaminated.

The hiring filter for a crew centers on specification ability. Can this person decompose a vague business problem into testable constraints without being handed a template? Do they reason about systems or about syntax? Do they know what "done" looks like well enough to write a holdout scenario that would catch an agent gaming its own tests? The skills that matter in a three-person crew are the same systems skills I described in [The Bottleneck Moved](https://karim-bhalwani.github.io/ai/systems/engineering/2026/03/01/the-bottleneck-moved/): problem framing, task decomposition, and the clarity to specify intent precisely enough that a system can execute reliably.

**The career that compounds from here is not "developer." It is "specifier who understands systems."**

---

## The Ambition Failure

The executive conversation about AI and teams almost always reduces to cost. Same mission. Fewer bodies. Lower burn. This is the wrong frame, and it may be the most consequential strategic error an organization can make right now.

In [The Agents Work](https://karim-bhalwani.github.io/ai/systems/engineering/2026/03/13/the-agents-work-the-organization-does-not/), I argued that the winning organizations are the ones rebuilding their structure around agentic execution. The corollary nobody draws: if you rebuild the structure, you should also rebuild the mission. Otherwise you are redesigning the engine and driving the same route.

![10x the Mission](/assets/zero-sprints/10x-mission.png)

When headcount was the binding constraint on ambition, organizations scoped their strategy to what they could staff. A data platform team with twelve engineers built one product because twelve was all they had and the coordination surface of twelve kept them slow. Restructure that into four crews of three, each specifying against their own domain while agents execute, and the same twelve people can sustain four products. Not because they work harder. Because the coordination overhead that consumed 60% of their week evaporated.

The people who built domain expertise over a decade are not suddenly less valuable. They are more valuable, because domain knowledge is the raw material of specification, and specification is the bottleneck. What dissolves is the management layer that existed only to route information through a team too large to share context directly. What remains is the judgment, the institutional memory, and the customer relationships that no agent replaces.

Most leadership teams have not internalized this because their planning cycles, budgeting frameworks, and strategic assumptions still treat headcount as the primary input to ambition. "We cannot do that, we do not have the people" used to be the terminal objection to any ambitious proposal. It no longer holds when three people with agents can sustain what previously required a department.

**The strategic question is not "how lean can we get?" It is "what could we build if every three-person crew operated at department-level capacity?"**

---

## It Was Always About the Team

Every post in this series has circled the same insight from a different angle.

[The Bottleneck Moved](https://karim-bhalwani.github.io/ai/systems/engineering/2026/03/01/the-bottleneck-moved/) argued that specification is the new scarcity. That capability doubles every four months and the ability to define what capability should do is what separates teams that ship from teams that churn.

[The Agents Work. The Organization Does Not.](https://karim-bhalwani.github.io/ai/systems/engineering/2026/03/13/the-agents-work-the-organization-does-not/) argued that none of it matters if the organization itself is not rebuilt. You cannot bolt AI onto a broken org chart and expect the AI to fix the org chart.

This post is the structural answer. The specification problem and the organization problem both resolve at the same unit: the team. A team small enough to hold shared context. Senior enough to specify with precision. Autonomous enough to ship without waiting for the ceremony.

The coordination overhead that felt necessary, the standups, the sprint rituals, the sixty-six communication channels, felt necessary because humans were the only source of capacity. Remove that constraint and the overhead does not disappear. It just stops paying for itself.

That is the part that is hard to unsee. Your team is not slow because of bad process. It is sized for a tradeoff that no longer holds.

Twelve people in a sprint, arguing over acceptance criteria, while three people down the hall shipped the same feature on Wednesday.

They are not failing. They are succeeding at a game that already ended.

**Three people. Ten agents. Zero sprints. That is the team that ships.**

---

## Resources

- **McKinsey PDLC Research**: [How an AI-enabled PDLC will fuel innovation](https://www.mckinsey.com/industries/technology-media-and-telecommunications/our-insights/how-an-ai-enabled-software-product-development-life-cycle-will-fuel-innovation)
- **McKinsey Agentic Organization**: [The agentic organization: A new operating model for AI](https://www.mckinsey.com/capabilities/people-and-organizational-performance/our-insights/the-agentic-organization-contours-of-the-next-paradigm-for-the-ai-era)
- **Scrum.org Three-Speed Solution**: [How AI-Native Operating Models Close the Authority Gap](https://www.scrum.org/resources/blog/three-speed-solution-how-ai-native-operating-models-close-product-ownerships-authority-gap)
- **Martin Fowler on SDD**: [Understanding Spec-Driven Development: Kiro, spec-kit, and Tessl](https://martinfowler.com/articles/exploring-gen-ai/sdd-3-tools.html)
- **Intellias AI Engineering**: [Achieving a 100% Boost with AI-Enabled Engineering](https://intellias.com/ai-enabled-engineering/)
- **DORA 2025 Report**: [State of AI-Assisted Software Development](https://dora.dev/research/2025/dora-report/)
- **Deloitte 2026 Report**: [State of AI in the Enterprise](https://www.deloitte.com/us/en/what-we-do/capabilities/applied-artificial-intelligence/content/state-of-ai-in-the-enterprise.html)
- **Related posts**: [Procedure Over Intelligence](https://karim-bhalwani.github.io/ai/systems/software-engineering/open-standards/2026/01/26/procedure-over-intelligence-building-reliable-ai-systems/) · [Beyond the Million-Token Window](https://karim-bhalwani.github.io/ai/rag/document-intelligence/2026/02/07/beyond-million-token-window/) · [The Bottleneck Moved](https://karim-bhalwani.github.io/ai/systems/engineering/2026/03/01/the-bottleneck-moved/) · [The Agents Work](https://karim-bhalwani.github.io/ai/systems/engineering/2026/03/13/the-agents-work-the-organization-does-not/)

---
