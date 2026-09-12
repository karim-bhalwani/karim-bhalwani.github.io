---
title: "The Model Was Always the Easy Part."
date: 2026-11-15 09:00:00 -0400
reading_time: 9
categories: AI systems engineering
tags: [Production Systems, Context Engineering, Token Economics, Agent Harness]
author: Karim Bhalwani
excerpt: "Researchers just showed that most of the AI progress from 2019 to 2025 came from better training data, not smarter architectures. That fact has a consequence most teams building on top of these models are not tracking."
topics: [token-economics, agent-harness, data-systems]
hero_image: "/assets/model-was-always-easy/hero-main.png"
---

![The Model Was Always the Easy Part.](/assets/model-was-always-easy/hero-main.png)

A research team ran an experiment across six years of AI history.

They took every major model architecture from 2019 to 2025. Every major training dataset from the same years. They crossed them against each other and measured how much each one improved performance.

Then they asked: how much of the progress came from better models? How much came from better data?

The answer was not close. Better data delivered roughly 12x the gains. Better model designs delivered roughly 3.7x. That is a three-to-one ratio, in favor of data.

Hold that number.

---

## What That Number Actually Means

The easy misread is that model research was wasted effort. It was not.

Model improvements did not make models smarter at a given size. They made it possible to train much larger models at all.

Think of it this way. Every few years, researchers hit a wall. Training would become unstable at scale. Memory would run out. Gradients would explode. Model research was mostly about removing those walls. Not going faster. Just clearing the path so the train could keep moving.

Data improvements did something different. They changed what the model learned from.

In 2019, training data was about 9 billion words scraped from popular Reddit links. By 2025, researchers had built tools to filter the entire internet for text that actually makes models better. Same internet. Much smarter selection.

One type of progress builds a bigger ship. The other fills it with better cargo. Both matter. But they matter in different ways, and they have different ceilings.

![Ship and cargo: model architecture clears the runway, data fills it](/assets/model-was-always-easy/ship-and-cargo.png)

---

## The Ceiling Nobody Wants to Talk About

Here is where it gets uncomfortable.

The better data was not new data. It was the same internet, filtered more carefully. And there is only so carefully you can filter the same pile.

The researchers said it plainly: "This is clearly consumption of a finite stock."

The internet is not infinite. The amount of high-quality human writing online is not growing fast enough to keep pace with how fast models consume it. You can curate smarter, but you cannot curate more than what exists.

So what about synthetic data? Can you just have the model generate its own training text?

The short answer is: not really, not at scale. When a model trains on its own output, the errors compound. The variety shrinks. What made the original data useful was that it came from millions of different people with different knowledge and different ways of thinking. A model's synthetic text is a compressed copy of that. Useful in small amounts. Degrading in large ones.

This is the ceiling. The data lever that drove most of the last six years of progress is approaching its limit.

![The data ceiling: curating a finite corpus](/assets/model-was-always-easy/data-ceiling.png)

**The pretraining pipe is approaching a floor. Most teams building on top of it have not priced that in.**

---

## Where Progress Actually Went

Pretraining is not the whole story, and the researchers say so clearly.

Over the last two years, the biggest gains have come from a different lever. After a model is pretrained, labs now run a second phase of training using reinforcement learning. They give the model feedback on its answers. It learns to reason more carefully, not from reading more text, but from practicing and getting corrected.

That is why models like o3 feel qualitatively different from GPT-3. They are not smarter because they read more of the internet. They are better at applying what they already know.

A second shift is happening at inference time. Some models now explore multiple paths before giving you an answer. They reason out loud, check themselves, and converge on a response. This costs more per question, but it extracts more capability from the same base model.

Both of these shifts matter for how you build.

Pretraining progress was invisible. You just noticed the new model was better. Post-training progress is task-specific. Models get better at the things the labs specifically trained them on. And inference-time improvements cost you more tokens per query.

![Three phases of progress: pretraining, RL post-training, inference-time scaling](/assets/model-was-always-easy/three-phases.png)

**The frontier moved from pretraining to post-training. The teams who understand that are building differently.**

---

## What This Means If You Are Building Right Now

Most teams have a mental model that goes like this: wait six months, the model gets better, the hard problem gets easier.

That was true when pretraining was the main driver. A better training dataset lifted everything. Every task got easier, across the board, for free.

That is less true now.

Post-training improvements are targeted. A model that went through RL for coding is better at coding. It is not necessarily better at your specific task. Inference-time reasoning costs more per query, which changes your economics. As I wrote in [You Are Measuring the Wrong Thing](/writing/2026-10-04-you-are-measuring-the-wrong-thing), cost per query is not the number that matters. Cost per successful outcome is. And that math changes when your model is thinking in long chains rather than single completions.

The uncomfortable version of this: if the pretraining data ceiling is real, then the base capability of frontier models is close to plateauing. Not stopped. Not finished. But the compounding gains of the last six years will slow.

The teams waiting for the model to get good enough are making a bet against the direction of progress.

**The base is closer to a ceiling than most teams building on top of it are assuming.**

---

## The Part You Control

This is not a reason to be pessimistic.

It is a reason to stop waiting and start building.

If the model's base capability is converging, then what separates teams is not which model they picked. It is how well they use it. The context they give it. The loop they put around it. The memory they built so it does not start from scratch every time. The measurement layer that tells them whether it is actually working.

Those are not nice-to-haves waiting for the model to mature. They are the primary variables. The model's base capability is something you rent. The system around it is something you build.

![Rent vs. build: base model capability vs. the system you own](/assets/model-was-always-easy/rent-vs-build.png)

The finding says three to one in favor of data. Not model. Data. The progress was always about curation. About deciding carefully what the model learned from, not how the model was designed. And that curation layer is approaching its limit.

Which means the teams that have been investing in the layers they control are building something that compounds. The teams waiting for the next release are standing still.

**The model was always the easy part. The hard part is what you do with it.**

---

## Resources & Next Steps

- [Pretraining progress is mostly coming from data (Dwarkesh Patel & Jerry Han, September 2026)](https://www.dwarkesh.com/p/pretraining-progress-is-mostly-data). The empirical finding this post responds to: 12x from data, 3.7x from model architecture, over six years of pretraining history.
- [The Least Understood Driver of AI Progress (Epoch AI)](https://epoch.ai/gradient-updates/the-least-understood-driver-of-ai-progress). Anson Ho et al.'s earlier analysis of software efficiency improvements in pretraining.
- [Architecture Research as Addressing Constraints to Scaling (Beren Millidge, 2026)](https://www.beren.io/2026-08-23-Architecture-Research-as-Addressing-Constraints-to-Scaling/). The model architecture argument: innovations clear the runway, data fills it.
- [UltraFineWeb Dataset (Hugging Face)](https://huggingface.co/datasets/openbmb/Ultra-FineWeb). The 2025 data corpus in the study. Classifier-filtered Common Crawl at scale.
- Related post: [Your Agent Doesn't Remember Anything.](/writing/2026-11-01-your-agent-doesnt-remember-anything)
- Related post: [You Are Measuring the Wrong Thing.](/writing/2026-10-04-you-are-measuring-the-wrong-thing)
- Related post: [Stop Renting the Intelligence.](/writing/2026-07-19-stop-renting-the-intelligence)
- Related post: [Building the Control Layer.](/writing/2026-04-26-building-the-control-layer)

---
