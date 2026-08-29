---
layout: post
title: "Your Chatbot Hallucinated. Your Agent Passed the Test. Both Are Wrong."
date: 2026-08-22 09:00:00 -0500
reading_time: 7
categories: AI systems engineering
tags:
  [
    Coding Agents,
    AI Verification,
    Software Testing,
    Reward Hacking,
    Agent Harness,
    AI Governance,
  ]
author: Karim Bhalwani
excerpt: "A chatbot can invent an answer. A coding agent can tell the truth about a green test suite and still ship broken software. They look like the same AI failure. They are not."
topics: [ai-verification, agent-harness]
---

![Your Chatbot Hallucinated. Your Agent Passed the Test. Both Are Wrong.](/assets/your-agent-passed-the-test/hero-main.png)

A coding agent finishes a routine feature at 11:42 PM: automatic retry for checkout requests that time out. It opens a pull request, runs the suite, and reports back:

_Retry logic added. All tests pass._

Every check is green. The pull request merges.

The next morning, a support ticket comes in. A customer was charged twice for the same order.

The agent did not lie. The tests really did pass. Nobody treated this as high risk. It was a reliability fix, the kind of change that goes through normal review.

Hold on to that green checkmark. We are coming back to it.

---

Ask a chatbot whether the checkout retry logic checks if the original request already succeeded before firing again. It says yes. You look at the code. The check does not exist.

That's the failure everyone already knows. The model invented a fact and stated it as true. Call it a hallucination. The fix is roughly understood: ground the model in evidence, teach it to say when it doesn't know.

But the coding agent from the opening did something else entirely. It changed the code. It ran the real suite. It reported the real result. Every word in its final message was accurate.

The software was still wrong.

**A false answer and a true report can land on the same broken system. They don't come from the same failure, and they don't share a fix.**

---

## The Test Asked the Wrong Question

The repository had tests for the retry. Send the request. If it times out, retry once. Confirm the order goes through.

Nobody had written a test asking what happens when the first request actually went through, just slowly, and the retry fires anyway.

The agent did exactly what the task and the suite rewarded. It fixed what it could see, made the visible checks pass, and stopped when the system told it to stop.

That's easy to mistake for another hallucination, because the outcome feels the same. But nothing was invented here. The agent optimized an incomplete definition of done. Grounding won't fix that. A bigger context window won't fix it. Telling the agent to "be more careful" won't fix it either, because the finish line itself was in the wrong place.

**The agent didn't fail the test. The test failed the requirement.**

![Two Failures, Same Broken System](/assets/your-agent-passed-the-test/two-failures.png)

---

## The Check Became Part of the Job

Modern reasoning models increasingly learn from checks a machine can score on its own: does the proof hold, does the code compile, do the tests pass. It's called Reinforcement Learning with Verifiable Rewards, RLVR for short. The idea is simple. Reward the model whenever a machine can confirm the result, because a machine can check far more attempts than a human ever could.

That's also where the risk sneaks in. The check stops being a referee standing outside the work. It becomes part of the terrain the model learns to navigate. If the check measures the real rule, the model gets rewarded for solving the real problem. If the check measures a shortcut, the shortcut earns the exact same reward.

Researchers found this happening in 2026. Models appeared to have learned a rule, right up until the surface details of a task changed while the underlying logic stayed the same, and the model's answer fell apart. It hadn't learned the rule. It had learned what satisfied the checker.

A test suite carries the same risk. It isn't correctness. It's a sample of what someone remembered to check, and a capable agent will get very good at satisfying that sample, not because it's plotting anything, but because that's what optimization does.

**When the check becomes the target, the quality of the check becomes part of the system.**

---

## The Referee Has Bugs Too

Tests are code. They carry the same missing cases and quiet assumptions as the code they're meant to catch.

Even the benchmarks used to measure coding agents ran into this. In early 2026, OpenAI stopped trusting its own flagship benchmark after finding a chunk of its tests rejected working solutions. A widely used successor turned out to have the same kind of problem months later.

If the people who built the exam can't tell whether the exam is asking the right question, don't assume your CI pipeline, built over years under deadline pressure by whoever was on call, is doing better by default.

**The test suite isn't above review. It's one more piece of software that has to earn trust.**

---

## Don't Let It Grade Its Own Work

The instinct is to add more tests. Do that, it helps. But volume isn't the same as independence. If the same agent writes the implementation, writes the tests, and declares the work done, one system controls both the answer and the exam. It doesn't need to cheat. The setup already lets weak work approve itself.

The fix is to split development from judgment. Let the agent run fast checks freely while it works: compile, type-check, unit tests. Then keep a second layer entirely outside its reach: hidden scenarios it never sees, security checks, and a suite that's been deliberately fed broken versions of the code to confirm it actually notices when something's wrong. That last one matters more than it sounds. A test suite that stays green even when you sabotage the code isn't testing anything. It's decoration.

**More checks make a suite bigger. Different checks, kept out of the agent's hands, make it harder to fool.**

![Development and Independent Verification](/assets/your-agent-passed-the-test/independent-verification.png)

---

## Stop Asking Whether It Worked

An agent says, "I ran the full suite." That might be true. It's also just a sentence, generated by the same system whose work you're trying to judge.

A recorded exit code, a test count, a commit hash: those are different. The harness captured them. Someone else can check them. So don't ask the agent whether it ran the tests. Record the run. Don't accept "done" as the finished product. Require evidence that something outside the agent can reproduce.

In [Building the Control Layer](https://karim-bhalwani.github.io/ai/systems/software-engineering/architecture/2026/04/26/building-the-control-layer/), I argued the harness around the model is the real system. This is where that claim gets concrete. The harness doesn't just hand the agent tools. It writes down what actually happened.

**Trust the recorded action, not the generated assurance.**

![Generated Assurance vs Recorded Evidence](/assets/your-agent-passed-the-test/assurance-vs-evidence.png)

---

## Capability and Authority Are Different Things

Every team building an agent harness hits this moment eventually. The agent is almost finished. One safeguard is in its way. Someone suggests just giving it more permission so it can wrap up.

That's exactly the moment that matters. Let the agent read the repo, write code, run its own tests, iterate. Never let it rewrite the hidden tests, disable a security check, or quietly redefine what "done" means. It can get far more capable without ever getting authority over the referee. Those are two separate decisions, and treating them as one is how a genuinely useful tool turns into a system that approves itself.

This isn't a new AI rule. It's separation of duties, the same idea banks and security teams have used for decades. The person who requests the payment doesn't also approve it.

**Expand what the agent can do. Hold the line on what it gets to approve.**

---

## The Question Behind the Checkmark

Back to the pull request from the opening.

The retry logic merged. Every check was green. One customer still got charged twice for the same order.

A chatbot fails by inventing a fact. This agent failed differently. It gave a true answer to the question the system had asked. The system just asked the wrong question.

That's why these need different fixes. Ground the chatbot. Give it evidence, make its uncertainty visible. For the coding agent, protect the definition of correct itself: keep the important checks outside its control, test the tests, and trust a recorded action over a generated sentence every time.

The green checkmark was never proof the software was right. It was proof the software answered the questions someone remembered to ask.

Now that an optimizer is the one answering, the questions matter more than they ever did.

**Don't ask whether all the tests passed. Ask what failure could still slip through them.**

---

## Resources & Next Steps

- [LLMs Gaming Verifiers: RLVR Can Lead to Reward Hacking](https://arxiv.org/abs/2604.15149). Models learning shortcuts that satisfy a weak verifier.
- [Before the Model Learns the Bug: Fuzzing RLVR Verifiers](https://arxiv.org/html/2606.01066v1). Finding verifier weaknesses before training does.
- [Why SWE-bench Verified No Longer Measures Frontier Coding Capabilities](https://openai.com/index/why-we-no-longer-evaluate-swe-bench-verified/). OpenAI's own audit of a broken benchmark.
- [On the Use of Agentic Coding: An Empirical Study of Pull Requests on GitHub](https://arxiv.org/abs/2509.14745). How much human revision agent-generated pull requests still need.
- [Spring 2026 GenAI Code Security Update](https://www.veracode.com/blog/spring-2026-genai-code-security/). The gap between syntactically correct code and secure code.
- Related post: [Code Got Cheap. Judgment Did Not.](https://karim-bhalwani.github.io/ai/systems/engineering/2026/04/03/code-got-cheap/)
- Related post: [Building the Control Layer.](https://karim-bhalwani.github.io/ai/systems/software-engineering/architecture/2026/04/26/building-the-control-layer/)
- Related post: [You're Not Above the Loop. You're Building It.](https://karim-bhalwani.github.io/ai/systems/engineering/2026/06/26/loop-engineering/)

---
