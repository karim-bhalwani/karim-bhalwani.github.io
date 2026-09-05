---
layout: post
title: "The Scaffold Was Never the Safety."
date: 2026-10-04 08:00:00 -0400
reading_time: 12
categories: AI systems engineering
tags: [Agent Loops & Control, AI Governance, Production Systems, Agent Harness]
author: Karim Bhalwani
excerpt: "Human-in-the-loop was never a safety mechanism. It was a comfort mechanism. The human in the middle is not catching errors. They are absorbing blame for errors they had no real chance of catching."
topics: [agent-harness, ai-verification]
---

![The Scaffold Was Never the Safety.](/assets/the-scaffold-was-never-the-safety/hero-main.png)

A financial services team deploys an autonomous agent to handle overnight reconciliation. The workflow requires human approval before any transaction is reversed. An audit gate. A safeguard. Proof that a human reviewed the work.

What actually happens: the on-call analyst has reviewed 94 consecutive agent proposals without rejecting a single one. By 3 AM, they are approving reversals faster than it takes to read the diff. Not because they are negligent. Because the human brain, hit with a stream of similar-looking decisions one after another, stops actually thinking about them. It pattern-matches. It clicks.

The approval gate was real. The review was theater.

---

In [The Human Was Always the Next Ceiling](/writing/2026-06-14-human-ceiling), I argued that asking humans to approve agent work in real time does not work. Machines move faster than humans can respond. Someone is always asleep when the agent fires at 2 AM.

That argument was about speed. There is a worse problem underneath it.

A paper published in August 2026 by Margaret Mitchell, Avijit Ghosh, and Samir Passi, *AI Agents Push Humans Out of the Loop*, puts numbers to something practitioners have been noticing for months. The problem is not just that humans are slow. It is that watching agents work actually makes humans worse at watching agents work. The longer they supervise, the less they can catch.

This is not a software problem. But the architecture of every major agent platform today is making it worse.

---

![The Three Ways Oversight Collapses. Approval fatigue, automation bias, and information overload compound over time.](/assets/the-scaffold-was-never-the-safety/oversight-collapse.png)

## The Three Ways Oversight Collapses

There are three things that go wrong. They do not happen one at a time. They happen together.

**Approval fatigue.** An agent working through a long task stops frequently to ask for confirmation. Write a file. Call an API. Update a database. Each request shows up without the full context behind it. The operator answers. The agent continues. Do this enough times without anything going wrong, and the human stops actually evaluating the requests. The habit of clicking approve replaces the habit of checking. The human in the loop becomes a button the agent pushes.

I described a version of this in [The Human Was Always the Next Ceiling](/writing/2026-06-14-human-ceiling): "The review collapses into pattern-matching. Familiar shapes get rubber-stamped." What the research shows goes further. The chance that a supervisor catches a real error drops fast as the session goes on. Not slowly. Fast.

**Automation bias.** Every time the agent does something without visible failure, the person watching it trusts it a little more. Not because they decided to. Because that is how the human brain works. After a hundred steps that went fine, the hundred-and-first feels safe even when it is not. The agent has built up a credibility it has not actually earned for the situation it is now in.

I pointed at this in [You're Not Above the Loop. You're Building It.](/writing/2026-06-26-loop-engineering): a bad loop runs all night on the wrong goal. Automation bias makes it worse. The longer the loop runs correctly, the less prepared the person watching it is to notice when it starts going wrong.

**Information overload.** Agents produce a lot of output. Reasoning notes. Tool call logs. API responses. Messages from other agents in multi-agent setups. Nobody can read all of it in real time. So the operator gets a summary. A diff. An abstracted view. But abstraction cuts detail. The detail that would expose a subtle error is often exactly what the summary leaves out.

Three problems, all running at the same time, all getting worse the longer the session runs.

---

![The Moral Crumple Zone. The human operator absorbs liability for systemic architectural failures.](/assets/the-scaffold-was-never-the-safety/moral-crumple-zone.png)

## The Interface Is the Problem

Current agent platforms do not just fail to support real oversight. The way they are built works against it.

Here is the default setup. The agent runs. A notification comes in. The operator reads a summary and clicks approve or reject. The agent keeps going.

That is not oversight. It is treating the human like a function the platform calls. Input comes in, output goes out, no state between calls. The platform has no idea whether the person on the other end is alert or exhausted, whether they read the diff or skimmed it, whether they understood what they approved.

And when something goes wrong, that person takes the blame. There is a name for this: the *moral crumple zone*. The human at the front of the system absorbs the damage for failures that were baked into the design long before they sat down.

I made a similar argument in [Building the Control Layer](/writing/2026-04-26-building-the-control-layer). The harness around the model is the real system. Right now, most harnesses are designed around what is convenient for the agent. They are not designed around what the person supervising the agent can actually handle.

---

![Cognitive Scaffolding Architecture. Gate by risk, batch into milestones, and enforce deliberate engagement.](/assets/the-scaffold-was-never-the-safety/cognitive-scaffolding.png)

## What Actually Helps

The fix has a name: Cognitive Scaffolding. It sounds complicated. It is not.

It is not about showing the operator more information. It is about designing the interface so the operator can still think clearly by the end of a long session.

**On the software side, four things matter:**

*Gate by risk, not by action.* Not every agent step needs a human check. What needs a check is the small set of high-impact things that cannot be undone: writing to a production database, running an arbitrary script, making network calls at scale, changing permissions. Everything else should run without interruption. Sending every small action through a confirmation prompt does not create safety. It creates the fatigue that makes humans unable to catch the one action that actually matters. I built this principle into the harness design in [Building the Control Layer](/writing/2026-04-26-building-the-control-layer). It is not optional.

*Make high-stakes approvals require effort.* When a genuinely risky action is about to run, a single click is the wrong design. Require the operator to do something that takes a second of thought: write down what they expect to happen, flag one thing that could go wrong, confirm a key number. Research on this is consistent. Adding a small deliberate step before a high-stakes decision stops the autopilot from firing. These moments are rare in most sessions. The added time is small. The benefit is real.

*Batch reviews into milestones, not individual actions.* Instead of 40 separate approval prompts during a run, show the operator a clear summary at the end of each meaningful chunk of work. Not the raw log. A clean picture of what changed, what the agent planned, and where it diverged. One thing to review instead of dozens.

*Track how the operator is engaging.* The system should pay attention to whether the review is actually happening. How long did they spend on a diff? Did they approve a 300-line change in two seconds? An operator doing that is not reviewing the diff. The harness should respond to that. Pause the run. Require a longer look. Flag the session for follow-up. This is not surveillance. It is the system taking responsibility for the person it depends on.

**On the organizational side, three things that software cannot replace:**

*Limit how long anyone monitors in a single stretch.* Watching agents run is tiring work. Treating it as something a person can do all day without a break is wrong. Air traffic controllers have shift limits. Surgeons have rules about operating hours. Agent oversight needs the same. Fixed durations. Mandatory breaks. Hard stops before the person checking the work is too tired to check anything.

*Keep people doing the actual work, not just reviewing it.* The more you hand off to agents, the faster you lose the skill to catch their mistakes. Knowing that a database migration is risky, or that a particular API call pattern is a security problem, requires experience doing that work. If your team only reviews agent output and never does the underlying work themselves, that knowledge fades. I covered this risk in [The Agents Work. The Organization Does Not.](/writing/2026-03-13-the-agents-work-the-organization-does-not). The fix is scheduled blocks where operators work on relevant tasks without agent help. Not as a punishment. To keep the skill sharp.

*Spread the responsibility.* Right now, blame lands on the person who clicked approve. That person was not set up to succeed. The real responsibility belongs with the people who built the harness, designed the interface, and set the supervision policies. Accountability has to sit there, because that is the only place where fixing the underlying problem makes sense.

---

## The Loop Reframed

In [You're Not Above the Loop. You're Building It.](/writing/2026-06-26-loop-engineering), I argued the human job has shifted. You are not directing the agent step by step anymore. You are building the system that directs it.

That is still right. But there is something I did not say clearly enough.

Designing the loop is not just about what the agent does. It is about what the person watching the loop can still do after it has been running for six hours.

The goal, the trigger, the stop condition: those are engineering decisions. Cognitive scaffolding is the other half. It is the design work that keeps the human in a state where they can actually intervene when something goes wrong.

In [Your Chatbot Hallucinated. Your Agent Passed the Test.](/writing/2026-08-22-your-agent-passed-the-test), I wrote about keeping the system that checks the agent's work separate from the agent itself. The same logic applies here. The human's ability to think clearly is a resource the system depends on. If the system uses up that resource faster than the session requires, the oversight is gone. Not visibly. Not loudly. Just gone.

The green checkmark was never proof the software was right. The human approval was never proof the judgment was sound.

---

## Three Questions Before You Add a Human Approval Gate

If you are building a system that asks a human to review agent decisions, answer these before it ships.

**What can this person actually evaluate at the moment they get this prompt?** Not in theory. In practice, given how many decisions came before it, how much context they have, and how long they have been at it. If the honest answer is "not much," the gate is decoration. Remove it or redesign it.

**What does their judgment look like after four hours on this interface?** If the design ignores fatigue, the safety guarantee only holds at the start of the session. A gate that works in hour one and produces rubber-stamped approvals in hour four is not safe. It is worse than no gate, because it creates a paper trail showing that someone reviewed the work.

**Who takes the blame when this fails?** If the answer is the operator who clicked approve, the design is wrong. That person was asked to do something the system made nearly impossible. The responsibility belongs with the harness, the interface design, and the policies around it. Building accountability there is the only thing that creates real pressure to fix the problem.

---

![Where Judgment Belongs. Upstream in specs and constraints, downstream in audit logs, not in the synchronous loop.](/assets/the-scaffold-was-never-the-safety/where-judgment-belongs.png)

## The Scaffold Was Always Temporary

Every reliable system goes through the same stages. Manual first. Then supervised automation. Then automation with human oversight at the edges.

Human-in-the-loop was the right call when agents were unreliable, nobody knew the blast radius, and there was no infrastructure to catch mistakes automatically. In [The Human Was Always the Next Ceiling](/writing/2026-06-14-human-ceiling), I argued that moment has passed. The harness, the sandbox, the audit trail, the spec discipline: those exist now. The trust lives in the infrastructure. The synchronous approval gate is a holdover from 2024.

The gate was never providing the safety it looked like it was providing. And as agents get more capable, it provides less protection while burning through more of the mental energy that would be needed to catch the things the gate misses.

The scaffold was never the safety. The safety was in the spec before the run, in the harness design, in the audit log reviewed afterward, in the escalation path for the decisions the agent genuinely cannot make. That is where human judgment belongs. Not clicking approve on the hundred-and-first tool call at 3 AM.

Stop adding approval gates. Start designing systems where the gates you keep are ones a human can actually use.

**The loop is not where judgment lives. The loop is where judgment goes to die.**

---

## Resources & Next Steps

- [AI Agents Push Humans Out of the Loop (arXiv:2608.23642)](https://arxiv.org/abs/2608.23642). Mitchell, Ghosh, Passi.
- [Cognitive Forcing Functions Can Reduce Overreliance on AI](https://www.researchgate.net/publication/351120800_To_Trust_or_to_Think_Cognitive_Forcing_Functions_Can_Reduce_Overreliance_on_AI_in_AI-assisted_Decision-making). The research behind deliberate friction at high-stakes gates.
- Related post: [The Human Was Always the Next Ceiling.](/writing/2026-06-14-human-ceiling)
- Related post: [You're Not Above the Loop. You're Building It.](/writing/2026-06-26-loop-engineering)
- Related post: [Building the Control Layer.](/writing/2026-04-26-building-the-control-layer)
- Related post: [Your Chatbot Hallucinated. Your Agent Passed the Test.](/writing/2026-08-22-your-agent-passed-the-test)
- Related post: [The Agents Work. The Organization Does Not.](/writing/2026-03-13-the-agents-work-the-organization-does-not)
