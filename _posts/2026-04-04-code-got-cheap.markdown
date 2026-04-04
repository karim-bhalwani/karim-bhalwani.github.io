---
layout: post
title: "Code Got Cheap. Judgment Did Not."
date: 2026-04-04 09:00:00 -0500
reading_time: 10
categories: AI systems engineering
tags: [Code Economy, Specification, Career, Technical Debt, Radical Prototyping, Production Systems]
author: Karim Bhalwani
excerpt: "Code used to be scarce. Now agents generate thousands of lines in seconds for the cost of a few API tokens. The cost of writing code collapsed. What remains scarce is the judgment to direct it."
---

![Code Got Cheap Hero Image](/assets/the-code-economy/hero-main.png)

In the 1980s, an accountant's value was arithmetic. They held complex ledgers in their heads. They were paid for calculation precision. Then spreadsheets appeared, and the calculation became free. The profession did not disappear. It migrated. The value moved from arithmetic to judgment. Financial modeling, risk analysis, strategic interpretation. The accountants who survived the transition understood what the numbers meant. The ones who didn't were the ones fastest at producing them.

Software engineering is having that moment now.

For decades, the bottleneck was writing code. It was hard. Learning curves were steep. The cognitive load was real. Organizations paid premiums to people who could hold complexity in their heads. Who knew the React API from memory. Who could implement a sorting algorithm under pressure. Who could debug a distributed system at 2am without documentation. That premium existed because that capability was scarce.

It is no longer scarce.

Coding agents generate, refactor, and port thousands of lines of code in seconds for the cost of a few API tokens. The cost of producing code collapsed to near zero. And when the thing you were paid a premium to produce becomes free, the thing that remains scarce is not more of it. It is the judgment to direct it.

---

## The Excel Moment Nobody Wanted to Name

In 2015, the ability to write a React component from memory was a genuine signal of competence. Documentation was fragmented. Tooling was unforgiving. Syntax was a barrier. Developers were paid partly to hold that complexity in their heads because there was nowhere else to put it.

Ask an LLM to write that same component today and it produces multiple variations in seconds. The barrier dissolved. The skill that once justified a premium became what one researcher called "a parlor trick in the age of generative AI."

![Code Scarcity Shift](/assets/the-code-economy/scarcity-shift.png)

The research tracking this shift is unambiguous. Firms are no longer testing for generation velocity. They are testing for what they now call *verification ability*. The capacity to evaluate AI-generated output. To understand its failure modes. To catch the subtle, compounding errors that confident-looking code quietly introduces. The senior engineer of 2026 is not a faster typist. They are an auditor.

**The arithmetic became free. The accounting remained.**

---

## What the Agent Actually Changed

The capability shift did not happen uniformly. It happened in stages, and the stage we are in now is different in kind from the ones before it.

In 2023, models were reliably useful for single functions. Autocomplete with better context. By mid-2024, the unit of generation expanded to files and small modules. Through 2025, agents moved to features, then components, then entire subsystems. In 2026, we have documented cases of agents reimplementing entire frameworks.

The most striking example: a single engineer at Cloudflare reimplemented 94% of the Next.js API surface on Vite in one week. The project was called Vinext. The cost in Claude API tokens was approximately $1,100. The engineer did not write the implementation. They wrote the specification, ran the tests, and fed failures back to the agent. The test suite, over 1,700 Vitest tests and 380 end-to-end Playwright tests, was the source of truth. The agent executed against it.

![From Syntax to Specification](/assets/the-code-economy/syntax-to-spec.png)

This is not a productivity story. It is a structural story. The thing the engineer produced was not code. It was *specification with enough precision that an agent could execute reliably*. The code was downstream output. The spec was the work.

The ability to define what capability should do is now the scarcity. Vinext is what that looks like in practice.

**One engineer. One week. $1,100 in API costs. The specification was the product. The code was its expression.**

---

## The Technical Debt That Stopped Being Debt

The traditional view of technical debt treated it as a financial liability. Every shortcut was a deferred payment. Every legacy system kept alive past its optimal lifespan was interest compounding. The cost of replacement was prohibitive enough that organizations accepted the drag.

That math changed.

If an agent can rewrite a 500-line module in 30 seconds based on new requirements, the cost of throwing away old code drops to near zero. The sunk cost fallacy that used to trap engineers into maintaining bad systems dissolves when replacement takes thirty seconds. All that time invested. All that context built up. None of it holds weight when the rewrite is trivial.

![Disposable vs Durable Code](/assets/the-code-economy/disposable-durable.png)

The research tells a more interesting story. A study tracking over 200,000 code units across 201 open-source projects found that agent-authored code actually survives longer than human-authored code at the line level. It gets modified 16% less often. More stable, measurably.

The catch: agent-authored code showed a higher corrective rate, 26.3% versus 23.0% for human-authored code. More bug-fixing required to reach stability. But once stable, less disruption afterward.

Disposability is a property of the *development process*, not the artifact. You can afford to throw away the experiments. What survives into production may be more durable than what it replaced. The bottleneck shifts from "how do we prevent bad code from existing" to "how do we specify precisely enough that the agent produces stable code in the first place."

**The question is no longer how to prevent bad code from existing. It is how to specify well enough that the agent produces good code on the first pass.**

---

## Build to Think

When code was expensive, organizations spent significant time in the design phase to avoid building the wrong thing. Detailed specs. Static mockups. Weeks of alignment before a line was written. The cost of building the wrong thing was high enough that all the upfront planning made sense.

When code is cheap, the design phase and the build phase collapse into the same loop.

At firms that have adapted, designers are no longer handing off static Figma mocks to developers. They are using agents to produce functional prototypes directly. Product managers are turning user research, past requirements, and competitive analysis into strategy documents and working experiments in a single session. Engineers are building "maybe" features. Things they are not sure they need. The cost to try is near zero. If the feature fails, it gets deleted. The experiment cost almost nothing.

![Build to Think Loop](/assets/the-code-economy/build-to-think.png)

Researchers call this "radical prototyping." Practitioners call it "build to think." Same idea. When the cost of being wrong is near zero, you stop analyzing and start building. The prototype becomes the specification. The test suite becomes the design review.

This inverts decades of software development convention. It does not invalidate the reasoning behind those conventions. It obsoletes the constraint that made them necessary.

**The convention did not become wrong. The constraint that made it necessary disappeared.**

---

## What Compounds Now

The career implication runs through everything above.

The skills that compounded in the old economy were syntactic: framework knowledge, language internals, the ability to produce correct code under pressure. Those skills still have value in narrow contexts. They do not compound the way they used to, because the supply of them is no longer scarce.

What compounds now is harder to name but easier to recognize.

The engineer who can take a vague business problem and break it into testable constraints, without being handed a template, is worth more than the engineer who can write the implementation from memory. The first is scarce. The second is not.

The best framing I have heard: "hoard patterns, not syntax." Stop memorizing APIs. Start collecting working examples, documented decisions, reusable specifications, and architectural patterns that have succeeded in production. The person who maintains a library of things they know how to do, not how to type, but how to *direct*, is building capital that compounds.

![What Compounds Now](/assets/the-code-economy/what-compounds.png)

The audit function is the other thing that compounds. Every piece of AI-generated output requires human judgment to validate. In a small team with shared context, that verification load is manageable. In a large organization where agents generate output faster than the team can synchronize on what "correct" looks like, the verification becomes the bottleneck. The engineers who can perform that function are the ones the organization cannot replace. They understand cross-cutting dependencies. They catch subtle compounding errors. They know what right looks like without being told.

The career that compounds from here is not "developer." It is "specifier who understands systems." Some researchers call this role the "auditor." The labels are converging on a single description. Someone who can direct agent execution with precision, verify its output with judgment, and accumulate the patterns required to do both reliably.

**Hoard patterns, not syntax. The career that compounds is the one that knows what the code is for.**

---

## The Specification Layer Is the New Source of Truth

The thread running through all of this is specification.

When code was expensive, implementation was the artifact. You measured engineering output by what was shipped. Lines of code, pull requests, features delivered. The implementation was the proof of work.

When agents generate implementation, the implementation is downstream output. It is no longer the artifact that matters. What matters is the specification that produced it. The test suite, the acceptance criteria, the architectural constraints, the behavioral properties that define what correct looks like.

In spec-driven development, engineers define what the system should do. Agents generate the code to make it happen. The spec is the source of truth. The code is its output.

Vinext ran on 1,700 tests. One engineer. One week. $1,100 in API costs. That is not a story about what agents can do. It is a story about what a precise specification can unlock when there is nothing left standing between the intent and its execution.

**The value is not in the typing. It is in the thinking that makes the typing unnecessary.**

---

## What Does Not Change

Seniority still matters. Domain knowledge still compounds. Customer relationships still require humans. The judgment that comes from having shipped things that failed in production, that institutional memory, is not something an agent replaces.

What dissolves is the layer of work that justified headcount without requiring that judgment. The part of the job that was execution without thought. Syntax without architecture. Implementation without specification. That layer is gone. The demand is for the part that was always underneath it.

The pattern keeps showing up. Systematic workflows beat raw capability. Specification is the new scarcity. Organizations that do not restructure around it fall behind. Small crews outperform departments. Each of those observations points at the same root cause: code got cheap. The entire economy that justified large teams, long sprints, and syntax-heavy careers was built on a scarcity that no longer exists.

The engineers who are most at risk are not the ones who write bad code. They are the ones who write good code but cannot explain why the system should work the way it does. The ones who are fast at the typing but slow at the thinking. The ones who built a career on knowing the API but not on understanding the problem the API was solving.

**The ones who compound from here are the ones who always knew what the code was for.**

---

## Resources

- **Disposable Code Research**: [Disposable Code Is Here to Stay, but Durable Code Is What Runs the World, Honeycomb](https://www.honeycomb.io/blog/disposable-code-is-here-to-stay)
- **Vinext Case Study**: [How a Single Engineer Reimplemented Next.js in a Week](https://blog.cloudflare.com/vinext/)
- **Spec-Driven Development**: [Understanding Spec-Driven Development — Martin Fowler](https://martinfowler.com/articles/exploring-gen-ai/sdd-3-tools.html)
- **Survival Analysis of Agent Code**: [Predictably Irrational Software Engineering, Medium](https://medium.com/jonathans-musings/predictably-irrational-software-engineering-613d7d3dfcf8)
- **Related posts**: [Procedure Over Intelligence](https://karim-bhalwani.github.io/ai/systems/software-engineering/open-standards/2026/01/26/procedure-over-intelligence-building-reliable-ai-systems/) · [The Bottleneck Moved](https://karim-bhalwani.github.io/ai/systems/engineering/2026/03/01/the-bottleneck-moved/) · [The Agents Work](https://karim-bhalwani.github.io/ai/systems/engineering/2026/03/13/the-agents-work-the-organization-does-not/) · [Three People. Ten Agents. Zero Sprints.](https://karim-bhalwani.github.io/ai/systems/engineering/2026/03/19/three-people-ten-agents-zero-sprints/)

---
