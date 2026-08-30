---
layout: post
title: "AI Agents Get the Hype. Hooks Get the Job Done."
date: 2026-09-05 09:00:00 -0500
reading_time: 8
categories: AI systems engineering
tags: [Agent Harness, Agent Loops & Control, AI Verification, Production Systems]
author: Karim Bhalwani
excerpt: "Everyone's excited about what AI agents can do on their own. Almost nobody's talking about the boring layer deciding whether they're allowed to, and that boring layer is the only reason any of it can be trusted."
topics: [agent-harness, ai-verification]
---

![AI Agents Get the Hype. Hooks Get the Job Done.](/assets/agents-get-the-hype/hero-main.png)

2:14 AM. An AI coding assistant is clearing out an old build folder, a routine cleanup task it's done a hundred times before. It runs a delete command on what it believes is that folder. The path resolves to the whole project instead. Every file is gone in under a second.

Somewhere in that assistant's instructions, near the top, it had been told plainly: never delete files without asking first. That instruction was never removed. It was still sitting there, in the exact same words it started with. It just stopped being the loudest thing in the room, buried under an hour of file changes and error messages that piled up after it.

Here's the part almost nobody talks about. There's a small, unglamorous piece of engineering whose entire job is making sure that instruction never has to depend on being remembered. It's called a hook, and it's probably the least exciting term in the entire AI industry right now.

**The part of AI everyone's excited about is also the part you can trust the least. The part nobody's talking about is the one actually holding everything else up.**

---

## The Exciting Story and the Boring One

Walk into any AI conference this year and the packed room is the one about agents: systems that plan, act, and get more independent every few months. The room down the hall, running through the actual safety mechanisms underneath those agents, has empty seats.

That's not because the safety mechanisms are unimportant. It's because they don't make for a good story. A more capable agent can do something new on stage, in front of an audience, right now. A safety mechanism, working correctly, produces nothing to watch. The bad thing simply didn't happen. There's no demo for that.

So capability gets the keynote. Skills get the blog posts: modular, shareable, easy to demo in ninety seconds. Hooks get almost nothing. They don't show up in product marketing. They rarely show up in conference talks. When they do get documented, it's a page of JSON schemas and exit codes sitting quietly in a docs folder that most people never open.

**Nobody writes a conference talk about the thing that didn't happen.**

---

## Why You Can't Just Tell an AI to Be Careful

Here's the part worth understanding, and it doesn't require a technical background. An AI model doesn't follow instructions the way a computer program follows code. It's guessing, word by word, what's most likely to come next, based on everything currently in front of it. An instruction you gave it earlier is just more words, sitting in that same pile, competing for attention with everything that's happened since.

In short conversations, that competition doesn't matter much. In long ones, with dozens of steps and a growing pile of file changes and outputs, an instruction given at the start can get crowded out, not because it was wrong, but because it's no longer the most prominent thing in view. Well-built AI agents still follow a stated rule somewhere between seventy and ninety percent of the time in real use. That number gets worse exactly when the stakes are highest: long sessions, messy context, several things happening at once.

You can reword the instruction. You can repeat it. It'll help a little, and it'll still eventually fail, because the problem was never about which words you chose.

**Rewriting the instruction doesn't fix a problem that was never about the wording.**

---

## What a Hook Actually Is

This is where the hook comes in, and it's a simpler idea than the name suggests.

A hook is a small, separate piece of code that sits between the AI and the action it's about to take. It's not part of the AI's thinking. It doesn't try to understand intent or read the situation. Before the AI is allowed to do something, like delete a file or run a command, the hook checks that action against a fixed rule. Does it match a pattern that's been marked off-limits? If yes, the action is stopped, cold, before it happens. No exceptions, no matter how the AI phrased its reasoning for wanting to do it.

For the engineers reading this: this happens at a checkpoint most coding agents call `PreToolUse`, and the way a hook says "absolutely not, stop everything" is by returning a specific signal, commonly exit code 2, that the system treats as a hard block no matter what else the AI's output says. If none of that meant anything to you, here's the plain version: think of it as a single strict word, either "go ahead" or "stop," decided by fixed code instead of the AI's own judgment.

The AI never gets a vote on this decision. Its reasoning never even reaches the part of the system that would carry out the action. The hook sits in the middle, and it doesn't care how confident or well-intentioned the AI's plan sounded.

**A hook doesn't ask the model to be careful. It takes away its ability to choose.**

![How a Hook Intercepts an Action](/assets/agents-get-the-hype/hook-intercept.png)

---

## No One Writes About the Checklist

Hospitals solved a version of this problem decades before software did. A surgeon's skill is the story people tell: years of training, steady hands, a hard case handled well. Nobody tells that story about the checklist read out loud before every operation, confirming the patient, the site, the instrument count, no matter how experienced the surgeon is or how routine the procedure looks.

The checklist is boring on purpose. It doesn't get impressed by a surgeon's track record. It doesn't skip a step because the last two hundred cases went fine. That's exactly why it catches the one case where something was about to go wrong for a reason nobody in the room had thought to watch for.

A hook plays the same role around an AI agent. It doesn't get more lenient because the AI has been performing well all session. It runs the same check on the first action and the thousandth.

**No one writes about the checklist. Everyone writes about the surgeon who almost needed one.**

---

## Boring Isn't the Opposite of Important

There's a real reason for the mismatch, and it's not that people are being careless. Every model, every agent, every skill runs on inference: probabilistic, capable of surprising you, which is exactly what makes it worth writing about. Surprise is interesting. Surprise is what a demo is built to show off.

A hook runs on plain computation. Pattern matching, exit codes, allow or deny. It cannot surprise you, by design. In a stack built almost entirely out of things that can surprise you, the one component that can't is doing something different from everything around it, and it's not a lesser job.

**The parts of the system you can actually trust are the parts that can't surprise you.**

---

## The Capability Gets the Launch Post. The Safeguard Gets the Incident Report.

A new AI capability gets announced the day it ships: look what it can do now that it couldn't do last month. A hook usually shows up only after something already went wrong. The postmortem gets written, and it ends with "we added a check for this." That check is a hook. It never gets the announcement the capability got.

That's the asymmetry worth sitting with. The parts built to do more get celebrated constantly, in public. The part built to make sure it doesn't do the wrong thing gets added quietly, one incident at a time, and mentioned only in the retro.

**The capability gets the launch post. The safeguard gets the incident report.**

---

## Back to 2:14 AM

The instruction not to delete files without asking was never gone. It just stopped being loud enough to matter, forty minutes into a session where dozens of other things had happened since.

A hook doesn't have that problem, because it isn't competing for attention inside the conversation at all. It sits outside it, checking the actual action against the actual rule, every time, whether the session is two minutes old or two hours old. It doesn't get quieter as the conversation grows, because it was never part of the conversation to begin with.

The exciting part of AI right now is what it can do without you watching. The trustworthy part is what it's still not allowed to do, no matter what it decides on its own. Those are two different achievements, and only one of them gets applause.

**Don't teach the model to be careful. Build the part of the system that doesn't need to be, and don't be surprised when nobody claps for it.**

---

## Resources & Next Steps

- [agentic-harness](https://github.com/karim-bhalwani/agentic-harness). A working example of hooks built around exactly this pattern.
- [VS Code Agent Customization: Hooks](https://code.visualstudio.com/docs/agent-customization/hooks). The technical reference for engineers who want the full mechanism.
- Related post: [Your Chatbot Hallucinated. Your Agent Passed the Test. Both Are Wrong.](/writing/2026-08-22-your-agent-passed-the-test)
- Related post: [Building the Control Layer.](/writing/2026-04-26-building-the-control-layer)
- Related post: [You're Not Above the Loop. You're Building It.](/writing/2026-06-26-loop-engineering)

---
