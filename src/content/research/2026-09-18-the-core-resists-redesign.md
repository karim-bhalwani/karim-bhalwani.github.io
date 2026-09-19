---
title: "The Core Resists Redesign. The Edge Doesn't."
section: "Research"
date: 2026-09-18 09:00:00 -0400
read-time: "12 min read"
reading_time: 12
author: "Karim Bhalwani"
description: "You cannot redesign an organization by editing it in place. The people and systems running it have every reason to protect its current shape. The alternative is building small, AI-native teams outside the org chart, then earning your way back in."
excerpt: "You cannot redesign an organization by editing it in place. The people and systems running it have every reason to protect its current shape. The alternative is building small, AI-native teams outside the org chart, then earning your way back in."
topic-hub: "multi-agent-orchestration"
topics: [multi-agent-orchestration, agent-harness, data-systems]
tags: [Org Adaptation, Multi-Agent Fleets, AI Governance, Production Systems, Agent Harness]
featured: true
hero_image: "/assets/core-resists-redesign/hero-main.png"
---

![The Core Resists Redesign](/assets/core-resists-redesign/hero-main.png)


You cannot make an organization AI-native by editing it in place. You can bolt AI onto existing processes. You can watch the bolt-on plateau. But the transformation everyone promised will not arrive this way.

Most enterprise AI work today is enablement, not transformation. Take a process built for people, hand the people a copilot. It helps. Everyone reports moving faster. But the process underneath does not change. Same handoffs, same approval chains, same assumption that a human sits in the loop at every step deciding what happens next. The old machine runs louder. It is not a new machine.

The numbers confirm how wide the gap between intent and execution actually is. Deloitte's 2026 survey of 501 tech leaders found only 15% of organizations have scaled a multi-agent system, despite roughly half claiming a clear operating-model vision. McKinsey lands in the same place from a different angle: 62% of organizations are experimenting with or piloting AI agents, but no more than 10% have reached meaningful scale in any given business function. That is not a model-capability gap. It is a design gap, and design gaps do not close because the tool got better.

---

## Why the core resists

Large organizations are not badly managed. They are optimized for a different goal than transformation, and that goal actively works against what AI-native design requires.

Consider what gets a process owner promoted. It is not "I redesigned my function and shrank my own team." It is "I ran this reliably, on budget, with no surprises." Ask that same person to rebuild their function around agents that might make their headcount smaller, and you are asking them to work against their own interest. That is not a character flaw. It is what the incentives point at.

Then there is the compliance problem, which is quieter and arguably worse. The moment a project has "AI" attached to it, it gets routed through the same review as a full production launch, typically a standing council spanning security, legal, privacy, compliance, data governance, enterprise architecture, and a business unit representative. Each function is protecting something real. But getting five or six people with genuinely different priorities aligned on a two-week prototype is its own project, separate from the prototype itself. One governance benchmark found 56% of enterprises take six to eighteen months to move an AI project from intake into production, purely the internal approval pipeline, before any initiative gets built or even tested. Separately, while an employee can start using a new AI tool in under two minutes, the security review to formally sanction that same tool can take eleven weeks.

Gartner is right that ungoverned agent deployment is a genuine cause of failure. But when a rough idea has to survive the same approval process as a finished system before anyone knows if it works, most good ideas die of overhead, not of being bad.

Put these two forces together, incentives protecting the status quo and review processes taxing new ideas at full price, and the outcome is predictable. Transformation attempted inside a live function gets killed by review, starved by whoever's turf it threatens, or watered down until it is just another dashboard. This is close to universal, which is exactly why treating it as a culture problem fixable with a better memo from the C-suite does not work.

If an organization cannot redesign itself while running, the redesign has to happen somewhere structurally separate.

---

## The alternative architecture: Edge teams

The model that works is what I call **edge teams**: small, structurally independent squads of three to five people, sitting outside the normal corporate hierarchy, paired with a fleet of AI agents doing most of the execution work. Give them one specific business function. Give them access to data that does not force them into a multi-month governance queue before they have built anything. Give them a real mandate: if we were building this function today, assuming agents are the default tool, what would it actually look like?

**On data access**, start on synthetic or sandboxed data while the team is still figuring out the shape of the workflow. That is the phase where waiting on data governance kills momentum for no good reason. But before anyone calls the thing proven, graduate to scoped, read-first access to live systems, the way a software team promotes code from a local environment to staging before it reaches production. If the team never makes that jump, you have built something optimized for a fictional dataset, and you will not find out how fictional until it is already live.

This is not hypothetical. Contact centers are the clearest proof. The organizations that moved fastest did not try to convert their existing call center in place. They stood up a separate, AI-native operation and ran it alongside the old one until it proved itself, then moved volume over. NTT DATA reports real deployments seeing total cost of ownership drop by up to 60%, and Gartner projects agentic AI will resolve 80% of common customer service issues autonomously by 2029, cutting operational costs by around 30%. That is not incremental. That is a different operating curve, and it came from building outside, not editing inside.

Inside each team, the shift in how the human core operates is worth being explicit about, because it is a different job than what "human in the loop" usually means. [In the loop](/writing/2026-10-18-the-scaffold-was-never-the-safety) means a person checks or approves each step before the next one happens. That is exactly the assumption baked into most of today's workflows, and exactly why the old process cannot just be handed to agents without redesign. [Above the loop](/writing/2026-06-14-human-ceiling) means something else: the human sets the goal, defines what a good outcome looks like, and steps in only where judgment genuinely cannot be delegated, while the agents run the steps in between without a person rubber-stamping each one.

McKinsey's research on the agentic organization describes this directly. Not a single assistant bolted onto a workflow, but small groups of specialized agents, each handling one piece of a process, with humans positioned above the loop to steer. [The value migrates](/writing/2026-04-03-code-got-cheap) from doing the work to deciding what "better" means for this function, and handling the calls the agents genuinely cannot make.

![Edge Team Structure and Composable Architecture](/assets/core-resists-redesign/edge-to-capabilities.png)

---

## Sell it to the core, do not just outflank it

Everything above about incentives is true, and also incomplete on its own. If the edge team's posture toward the core is "we are building around you because you will block us," that posture is exactly what gets edge teams politically strangled. Nobody cooperates with something built to make them obsolete.

The version that survives treats the edge team like an internal vendor. Its pitch to the function it eventually replaces is not "we are going to do your job better." It is "you have this process, what is your actual pain point? Let us fix that specific thing." That is a different conversation. It is an offer, not an ambush, and one the function can accept, push back on, or ignore the way you would treat any vendor showing up with a proposal.

The structural independence does not change. The edge team still operates outside the function's chain of command, builds on its own timeline, skips the full production review while prototyping. What changes is the target. It builds toward a problem the function already knows it has, not toward proving the function unnecessary. An edge team that has shipped a few things that visibly made someone else's week easier has an easier time getting the next function to say yes. A track record as a vendor worth working with, not a rumor about a team trying to replace people. Work migrates because the receiving team wants it, not because it was mandated from three levels up.

---

## From systems to platforms: Composable capabilities

If each edge team produces one finished system for one function, you have solved one problem and you are starting from zero on the next. That is not a model. That is a lucky outcome.

What makes it a model is that these teams build **reusable capabilities**, not monoliths. A fraud-detection agent. A customer-verification workflow. A routing rule. Pieces that get shared across the organization instead of staying locked inside the team that built them. If one team has already built and cleared a fraud-detection capability and a verification workflow, and another team needs both plus one new piece, the second team only builds the new piece. Everything else comes off the shelf, already approved.

A handful of these capabilities show up needing the same shape everywhere:

- **Call and document summarization.** Every LOB that talks to customers or processes legal, medical, or policy documents needs a version of "read this, extract what matters, produce a clean summary."
- **RAG over internal knowledge.** HR needs it for policy questions, IT for troubleshooting, sales for product specs. Same retrieval-plus-citation pattern underneath.
- **[PII and PHI redaction](/writing/2026-01-17-context-matters-redacting-health-records).** Anywhere a document moves between systems, or between a person and a model, something has to strip sensitive details before content goes where it should not. Build that once with jurisdiction-specific rules baked in, and every LOB pulls from the same certified capability.

The pattern across all of these: each is a horizontal capability many LOBs need, not a business-specific one-off. Build them the way you would build shared infrastructure, a small number of well-governed AI services sitting underneath the enterprise that any edge team can call instead of building from scratch.

Organize this as **one edge team per line of business**, not a generic innovation team floating above the company. A team tied to a specific LOB has a real business owner, a real functional problem, and a real customer for its work. But teams organized by LOB still have to coordinate. The non-negotiable habit is **checking before building**: into the capability registry, or straight to another LOB's edge team, asking what already exists. Has claims processing already solved customer verification? Has retail banking already built a fraud-detection capability this team needs? Every reuse avoids a duplicate build and a duplicate compliance review.

That coordination does not happen automatically just because a registry exists. Someone has to own keeping it current and searchable, and someone has to make shopping-before-building a real habit under deadline pressure. When it works, the payoff compounds across the whole portfolio. Every LOB is still solving its own problem on its own timeline, but none of them is starting from zero.

This is where [governance stops being the enemy of speed](/writing/2026-04-26-building-the-control-layer) and starts compounding advantage. Right now, every new AI project pays full compliance and security review price, even when it reuses logic already reviewed elsewhere. Gartner has documented this failure mode in platform teams: when governance gets implemented as an approval queue instead of infrastructure, cycle times stretch from days into months, and people start finding workarounds. That is worse for governance than the slow process was trying to prevent.

The fix is what platform engineers call the **golden path**: build the compliant option so it is also the easy option. A capability gets reviewed once, earns an internal seal, and anyone can pull it into a new solution without re-litigating the same compliance questions from scratch. Access controls, spend limits, data handling, all enforced automatically at the platform layer. You are not removing governance. You are moving it earlier and paying for it once instead of every time.

---

## Break it before it ships

Every AI system deployed will eventually get pushed past what it can reliably handle. That is not a risk to manage down to zero. It is a guarantee. The only question is where the ceiling gets discovered.

If it surfaces in production against a real customer, that is an incident. Someone is writing a postmortem and probably apologizing to someone. If it surfaces inside the edge team's own sandbox, on purpose, before anything ships, that is just a Tuesday. Same failure, completely different cost.

The edge team's mandate should include actively trying to break what it builds, pushing volume, edge cases, and adversarial inputs until something gives, then watching how it fails and how it recovers. That produces a different kind of learning than a risk-assessment meeting. A meeting speculates about where an agent might go wrong. Actually watching it go wrong tells you the real ceiling.

This gives capability certification teeth. A capability earning its internal seal should not just mean "it worked in testing." It should mean someone deliberately tried to break it, and it survived, or the team fixed what did not. That is a meaningfully higher bar than most compliance review applies, and the edge team can clear it faster because they are doing the breaking on their own schedule instead of waiting for someone else to find the failure for them.

![Adversarial Sandbox and Failure Testing Loop](/assets/core-resists-redesign/adversarial-break-loop.png)

---

## The numbers, in one place

The data points woven through this analysis converge on a single conclusion: the constraint is organizational design, not model capability.

- **Gartner, 2025:** more than 40% of agentic AI projects will be canceled by the end of 2027. The driver is not model capability. It is escalating cost, unclear business value, and inadequate risk controls.
- **Gartner, 2026:** only 17% of enterprises have deployed AI agents, even as multi-agent system inquiries surged 1,445% between Q1 2024 and Q2 2025, the fastest adoption-intent curve Gartner has recorded for any emerging technology.
- **Gartner, 2026:** by 2030, roughly 80% of software engineering organizations will shift toward smaller, AI-assisted "tiny teams," letting the people who understand the problem build the solution directly.
- **Anthropic Economic Index:** current AI use still splits 57% augmentation to 43% automation. Most of what is happening today is AI helping a person do their job, not AI running a process end to end.

---

## The vendor objection

Why not buy a comprehensive agentic AI suite from a major vendor and skip the internal building?

A purchased platform, however good, still gets deployed inside your existing structure. Same reporting lines, same functional boundaries, same approval chains. It makes those boundaries move faster. It does not redraw them, and redrawing them is the actual point.

There is a competitive problem underneath. If you and your closest competitor both buy the same vendor's agent catalog, neither gets ahead. You have both purchased the identical cost reduction. [Real advantage comes from proprietary process knowledge](/writing/2026-07-19-stop-renting-the-intelligence) that builds up inside your own operations, and that only comes from your own people doing the work on your own workflows. You cannot buy that off a shelf, by definition. And when one vendor supplies your orchestration layer, governance tooling, and core systems, your ability to evolve is tied to their roadmap, not yours.

This does not argue against using vendor tools. Edge teams should use the best available models and infrastructure instead of reinventing everything. The distinction is between vendor tools as components inside a structure you control, versus a vendor's entire operating model standing in for actually redesigning your own.

---

## Where this lands

The organizations ahead in five years will not be the ones with the best models. At this point basically everyone has access to good models. They will be the ones that figured out early that adding AI to an existing process and becoming genuinely AI-native are two different projects, and that you cannot do the second by editing the first in place.

The harder part is not the architecture. Small teams, reusable capabilities, governance done once and shared. None of that is a particularly novel idea on its own. The harder part is the discipline. Letting these teams actually operate independently instead of quietly pulling them back under normal reporting the first time they threaten someone's turf. Treating most individual teams failing as the normal cost of running a real portfolio, not proof the approach was wrong. Keeping a sponsor in the room long enough for the capability library to actually start compounding, which takes longer than most executives are comfortable waiting.

That discipline, not the technology, is what separates the companies that get to AI-native from the ones still running a faster version of the same old process five years from now.

---

## Resources

- **McKinsey Agentic Organization**: [The agentic organization: A new operating model for AI](https://www.mckinsey.com/capabilities/people-and-organizational-performance/our-insights/the-agentic-organization-contours-of-the-next-paradigm-for-the-ai-era)
- **McKinsey Agent Scaling**: [Report shows AI interest but slow scaling](https://itbrief.co.uk/story/mckinsey-report-shows-ai-interest-but-slow-scaling) (IT Brief)
- **Deloitte Tech Leaders Survey**: [Agentic AI Years Away for Most Enterprises](https://www.ciodive.com/news/agentic-ai-years-away-enterprises/827737/) (CIO Dive)
- **Gartner Project Cancellation Forecast**: [Over 40% of Agentic AI Projects Will Be Canceled by End of 2027](https://www.gartner.com/en/newsroom/press-releases/2025-06-25-gartner-predicts-over-40-percent-of-agentic-ai-projects-will-be-canceled-by-end-of-2027)
- **Gartner Agentic Hype Cycle**: [5 Hard Truths from the First-Ever Agentic AI Hype Cycle](https://tray.ai/blog/gartner-agentic-ai-hype-cycle-2026/) (Tray.ai)
- **Gartner Software Engineering 2030**: [Future of Software Engineering 2030: AI-Native Tiny Teams](https://www.gartner.com/en/documents/7530885)
- **Anthropic Economic Index**: [The Anthropic Economic Index](https://www.anthropic.com/research/the-anthropic-economic-index)
- **NTT DATA Contact Center Outcomes**: [Agentic AI Use Cases and Cost Outcomes](https://nj-resources.nojitter.com/free/w_defa9660) (No Jitter)
- **Gartner Contact Center Projections**: [Agentic AI for Contact Centers](https://www.avaya.com/en/insights/agentic-ai-for-contact-centers/) (Avaya)
- **Related research & posts**: [The Agents Work. The Organization Does Not.](/writing/2026-03-13-the-agents-work-the-organization-does-not) · [Three People, Ten Agents, Zero Sprints](/writing/2026-03-19-three-people-ten-agents-zero-sprints) · [Beyond the Million-Token Window](/research/2026-06-28-beyond-million-token-window)
