---
layout: post
title: "You Don't Maximize Tokens. You Maximize Learning."
date: 2026-08-09 09:00:00 -0500
reading_time: 9
categories: AI systems engineering
tags:
  [
    Token Maxing,
    Architectural Ownership,
    Model Routing,
    Fine-Tuning,
    AI Cost Governance,
    Learning Velocity,
  ]
author: Karim Bhalwani
excerpt: "Spending hard on tokens teaches you what the models can do. That learning is real. But there is a difference between learning the tool and learning your domain. One is scaffolding. The other is foundation. Scaffolding comes down. Foundation stays."
---

![You Don't Maximize Tokens. You Maximize Learning.](/assets/token-maxing-learning/hero-main.png)

A building goes up behind a cage of steel poles and planks. For months, the scaffolding is the most visible thing on the site. It is what you notice from the street. It is where all the movement is.

Then one morning it comes down, and you find out what was actually built.

Hold that image. We are coming back to it.

---

Monday morning. A developer starts an agentic coding session. By lunch the agent has scaffolded a service, written the tests, worked through three rounds of failures, and opened a clean PR. Four hundred thousand tokens in one sitting. The code is solid. The speed is not in question.

I read the PR. The patterns are generic. The naming is the model's default, not ours. The security boundaries are technically correct and quietly ignore three internal standards that nobody thought to put in a prompt.

The developer got faster. The organization learned nothing.

The following week, a different developer runs the same kind of session. This time the agent calls a model fine-tuned on our codebase. The standards are in the weights. The naming is already right. The PR lands clean on the first pass and review has nothing to correct.

Same tokens. Same speed. One session left the knowledge in a developer's hands. The other left it in the building.

That difference is the whole post.

---

## The Scaffolding Goes Up Fast

Garry Tan made the point that reset how a lot of founders think about AI spend. Spend hard on tokens now, while frontier models are cheap, and you learn what 2028 feels like before anyone else gets there.

He is right about the speed. He is right about the culture too. Public by default, high trust, invest in intelligence. Those are worth copying.

But watch that playbook run long enough and something shows up.

The team learns the tool. They get fast. They ship. Then tokens get cheaper, and cheaper, and the speed stops being an advantage because everyone has it. And most of what they learned, how to prompt one model, how to shape a session, how to work around one vendor's quirks, turns out to have been scaffolding. It held the work up while the work was being done. It was never meant to stay.

Nobody on a construction site confuses the poles for the building. In AI right now, a lot of organizations are wrapping themselves in scaffolding and calling it architecture.

The question is not whether you are moving fast. The question is what is still standing when the scaffolding comes down.

**Scaffolding gets the building up. It does not keep it standing.**

---

## Two Kinds of Learning

Every agent session teaches you something. There are two kinds.

The first is tool knowledge. You learn which prompts land with this model. You learn its failure modes, where it drifts, where it is sharp. This is real knowledge and it makes you faster today. It also expires. The model updates, or you switch vendors, or you hand the work to a colleague, and it does not transfer. It lived in your hands, not in the system.

The second is domain knowledge. You learn which problems actually need frontier intelligence and which ones a small model handles fine. You learn where your business logic is genuinely ambiguous and where it is routine. You learn what the model consistently gets wrong about your world. That knowledge does not expire, because you can put it in the architecture. The next engineer inherits it without being told.

One is scaffolding. The other is foundation.

Token maxing on its own does not pick for you. It produces both. Most teams just never separate them, so the tool knowledge accumulates and the domain knowledge evaporates at the end of the session.

**Every session teaches you something. The question is whether it teaches you the tool or the domain.**

![Scaffolding vs Foundation](/assets/token-maxing-learning/scaffolding-vs-foundation.png)

---

## The Price Curve Does Not Wait

The arithmetic is worth saying plainly.

Token prices fell about 600-fold between 2020 and 2026. That figure comes from a study of 3,237 models and 62 cross-checked milestone prices, and it is the cleanest measure available.

But the tiers do not fall at the same rate, and that is the part worth sitting with. Economy models halve in price every 1.1 years. Mid-tier every 1.55 years. Both beat the two-year mark Moore's Law set. Flagship models barely track the curve at all, because reasoning tokens carry a premium of roughly 30x over non-reasoning ones.

Read that twice. The cheap end is getting cheaper fast. The expensive end is not. So the gap between routing well and routing lazily gets wider every quarter, on its own, whether or not anyone is watching it.

Gartner expects AI coding costs to pass the average developer salary by 2028. Not because prices went up. Because consumption grew faster than prices fell.

This is why the window matters. The edge from knowing what cheap intelligence can do only holds while you are ahead of the curve. That window is real. It is also about eighteen months wide, maybe two years if your volume is low enough to keep the bill sane.

When it closes, everyone has cheap intelligence. The teams that learned the tool start over from there. The teams that learned their domain, and wrote it into the architecture, compound from there.

The scaffolding comes down for everybody on the same day.

**The cost curve does not slow down so you can catch up. Pour the foundation while the scaffolding is still cheap.**

---

## Two Patterns, Same August

Walk into any organization running agents at scale right now and you see one of two patterns.

**The first is speed.** Sessions burn four hundred thousand to two million tokens. Feedback is instant. Code ships. The developers know the model cold, its quirks, its failure modes, its strengths. The place is moving faster than it ever has.

It works. Today, it works.

Underneath it, something quiet is happening. The knowledge is piling up in people, not in the system. Someone leaves and it walks out with them. The model changes and the patterns stop working. A new hire starts from zero, because none of it was written anywhere the next person could pick up.

Shared skill files and agent instructions help. They are the difference between scaffolding you wrote down and scaffolding you did not. But they are still context you resend on every call. The model is not learning from them. It is being reminded.

**The second is routing.** These teams look slower at the start. They spend time deciding which work needs frontier intelligence and which work a small model handles fine, then they build that decision into the system. They fine-tune small models on the narrow tasks where the data is clean and the volume is high. Ambiguity goes to the frontier. Routine goes local.

The numbers back the move. NVIDIA's research puts 40 to 70 percent of enterprise AI tasks inside the reach of models under 10 billion parameters. Hugging Face reports that 92.5 percent of model downloads are now for models under a billion parameters. Teams running this in production tend to settle near 70 percent local, 20 percent mid-tier, 10 percent frontier. The industry is not voting for raw capability everywhere. It is voting for specialization.

The first pattern builds scaffolding. It is fast and it looks impressive from the street. The second pours foundation. It is slower and nobody notices until the poles come down.

**Speed is scaffolding. Routing is foundation.**

---

## The Knowledge That Survives

In [Stop Renting the Intelligence](https://karim-bhalwani.github.io/ai/systems/engineering/2026/07/19/stop-renting-the-intelligence/), I wrote that a fine-tuned model pushes organizational knowledge one layer deeper. The expertise is not in the prompt. It is in the weights.

The same idea holds even if you are still on frontier APIs.

A developer who maxed tokens on one model learned prompt patterns that work with that model. Real knowledge, sitting in their fingers. Fragile the moment anything changes.

A team that learned which problems actually need frontier intelligence, and built that decision into a router, put the knowledge in the architecture. The next engineer inherits it by default. The routing logic explains itself. Nobody has to remember.

This is the same thread running through the whole series. In [Procedure Over Intelligence](https://karim-bhalwani.github.io/ai/systems/software-engineering/open-standards/2026/01/26/procedure-over-intelligence-building-reliable-ai-systems/), encoded constraints beat real-time supervision. In [Building the Control Layer](https://karim-bhalwani.github.io/ai/systems/software-engineering/architecture/2026/04/26/building-the-control-layer/), the harness around the model is the system. In [Loop Engineering](https://karim-bhalwani.github.io/ai/systems/engineering/2026/06/26/loop-engineering/), nobody prompts anymore, they build the thing that prompts.

Same instruction every time. Stop holding the knowledge in your hands. Put it in the building.

**Scaffolding holds knowledge in people. Foundation holds it in systems.**

![Knowledge That Survives](/assets/token-maxing-learning/knowledge-survives.png)

---

## What To Do Monday

**If you are maxing tokens right now,** do not stop. The speed is real and the learning is real. Just start asking one question at the end of each session: would this still be useful on a different model tomorrow? If the answer is no, you learned the scaffolding.

Then make it concrete. Every time a session teaches you something about your domain, which tasks are routine, where the ambiguity actually lives, what the model keeps getting wrong about your business, write it somewhere the next session inherits. A shared context file. A routing rule. A fine-tuned adapter. Anything that moves the learning out of your hands and into the system.

**If you are building the next system,** copy the culture. Public by default, high trust, invest in intelligence. Those scale no matter which model you use.

Do not copy the habit of sending everything to the frontier. Own the architecture instead. Route routine work to small models, where the unit economics work. Reserve frontier models for the ambiguous, novel, high-value work, where the spend earns its keep. Build the verifier so you can change routing decisions without a human in the middle. Automate the decision so it scales with volume, not with headcount.

Prompt compression and output caching alone can take 30 to 50 percent off your API bill without changing vendor or quality. Worth doing. But routing is the move that compounds, because routing is what survives the transition.

**If you are running an enterprise,** treat cost governance as foundation, not a line item. Teams with mature AI cost governance report 40 to 60 percent lower per-inference costs than unmanaged deployments, and that gap widens every quarter. It is not about spending less. It is about knowing what you are spending on and why.

Get routing in place inside 30 days. Send anything below your quality threshold to a cheaper model. Attribute cost by team, by use case, by business unit. Measure cost per successful outcome, not cost per token.

**The teams that pour the foundation now own the next ceiling.**

---

## The Building That Stands

Two developers. Same kind of session. Same tokens. Same speed. One left the knowledge in muscle memory. The other left it in the architecture.

In eighteen months, tokens will be cheap enough that speed is not a differentiator. Everyone gets fast feedback. Everyone gets frontier capability for a fraction of today's price. The scaffolding comes down for all of us at once.

What is left is the foundation. The teams that learned their own domain and wrote it into the system. The ones that built routers, fine-tuned models on their own data, and put the decision logic in the architecture instead of in someone's head.

The token-maxing moment is real. Use it. Use it to pour foundation, not to build more scaffolding.

There is still time to be the team with a building.

Not much, though.

**You do not maximize tokens. You maximize what you learn. And what you learn only counts if it outlives the session.**

---

## Resources & Next Steps

- [Tiered Super-Moore's Law: LLM Inference Pricing (arXiv 2603.28576)](https://arxiv.org/abs/2603.28576). The source for the 600-fold decline and the per-tier price half-lives.
- [Small Language Models are the Future of Agentic AI (arXiv 2506.02153)](https://arxiv.org/abs/2506.02153). NVIDIA's case that most agent sub-tasks do not need a frontier model.
- [How to Choose Between Small and Frontier Models (Towards Data Science)](https://towardsdatascience.com/how-to-choose-between-small-and-frontier-models/). A practical decision framework, including when not to bother fine-tuning.
- [AI Model Token Pricing Breakdown: 2026 Guide](https://blog.exceeds.ai/ai-model-token-pricing-breakdown/). Why agentic sessions inflate bills quadratically, and what to do about it.
- [AI Cost Optimization: Cut LLM and Infrastructure Costs (Alice Labs)](https://alicelabs.ai/en/insights/ai-cost-optimization). An enterprise framework for model tiering and AI FinOps governance.
- [Gartner: AI Coding Costs Will Surpass Average Developer Salary by 2028](https://www.gartner.com/en/newsroom/press-releases/2026-06-24-gartner-predicts-ai-coding-costs-will-surpass-average-developer-salary-by-2028-as-token-consumption-surges). The forecast behind the urgency.
- Related post: [Stop Renting the Intelligence.](https://karim-bhalwani.github.io/ai/systems/engineering/2026/07/19/stop-renting-the-intelligence/)
- Related post: [You're Not Above the Loop. You're Building It.](https://karim-bhalwani.github.io/ai/systems/engineering/2026/06/26/loop-engineering/)
- Related post: [The Human Was Always the Next Ceiling.](https://karim-bhalwani.github.io/ai/systems/engineering/2026/06/14/human-ceiling/)

---
