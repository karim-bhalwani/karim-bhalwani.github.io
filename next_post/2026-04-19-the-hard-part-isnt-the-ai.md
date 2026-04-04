---
layout: post
title: "The Hard Part Isn't the AI."
date: 2026-04-19 09:00:00 -0500
reading_time: 14
categories: AI systems engineering
tags: [RAG, Redaction, Hierarchical Navigation, RLM, Production Systems, Document Analysis]
author: Karim Bhalwani
excerpt: "Three posts explored the pieces. Context-aware redaction. Hierarchical navigation. Recursive language models. This post shows what happens when you assemble them into a production pipeline that processes documents end to end."
---

![The Demo Worked Hero](/assets/the-demo-worked/hero-main.png)

You've probably built something like this: a demo that takes a PDF, sends it to an LLM, and produces a summary. Twenty lines of code. Looks great in a sprint review. Ships to staging.

Then someone uploads a 200-page medical record. The summary misses the medication list buried on page 47. The patient's name leaks into the LLM prompt. A reviewer asks "where did this diagnosis come from?" and nobody can trace it back to a source page.

The demo worked. The system did not.

Over the past three months, three posts explored each failure mode independently. [Context-aware redaction](https://karim-bhalwani.github.io/healthcare/privacy/nlp/2026/01/17/context-matters-redacting-health-records/) solved the privacy problem. [Hierarchical navigation](https://karim-bhalwani.github.io/ai/rag/document-intelligence/2026/02/07/beyond-million-token-window/) solved the "lost in the middle" problem. [Recursive language models](https://karim-bhalwani.github.io/ai/rag/document-intelligence/2026/02/22/mit-gave-the-model-a-python-interpreter/) solved the adaptive reasoning problem. Each post stood alone. Each addressed one failure mode in isolation.

This post is about what happens when you stop solving problems in isolation and build the complete pipeline: a privacy-first document analysis system that transforms unstructured medical records into summarized reports and verifiable Q&A, end to end.

The three posts were ingredients. This is the recipe.

---

## The Pipeline Nobody Wants to Build

Here's the uncomfortable truth about building document analysis systems in 2026: the hard part is not the AI. The hard part is everything around it.

Models can summarize, route, generate, and verify. The tooling exists. Cloud OCR services extract text from PDFs. Presidio detects PII. spaCy parses grammar.

The difficulty is sequencing these capabilities into a pipeline where privacy is enforced before any LLM sees the data, where document structure is preserved through chunking, where answers trace back to source pages, and where the cost per query doesn't make the system economically unusable.

Most teams skip straight to the interesting parts: the LLM calls, the RAG retrieval, the chat interface. They treat redaction as a checkbox. They treat chunking as a solved problem. They treat cost as someone else's concern.

Every production failure in document analysis traces back to one of those shortcuts.

**The pipeline is the product. Not the model.**

---

## Stage 1: Privacy as Architecture, Not Afterthought

The [first post](https://karim-bhalwani.github.io/healthcare/privacy/nlp/2026/01/17/context-matters-redacting-health-records/) in this series described why standard PII redaction destroys clinical utility. Generic NER treats every name as equivalent. In a medical record, that collapses the distinction between the patient who needs protection and the cardiologist whose name defines the care pathway.

The pipeline enforces a hard architectural rule: **redaction runs before any LLM call**. Not as a filter. Not as middleware. As a pipeline stage that must complete before the next stage can begin. The orchestration layer physically prevents downstream steps from executing if redaction hasn't produced output.

The redaction itself uses the two-pass pattern from that earlier post:

**Pass 1 (Precision):** Presidio and spaCy identify patient information using grammatical role analysis, contextual keywords, and provider title detection. Names preceded by "Dr." or "Nurse" are tagged as providers and excluded. Names that are grammatical subjects of patient-specific verbs ("complained," "reported," "underwent") are tagged as patients.

**Pass 2 (Recall):** Cached patient names from pass one are used to find additional mentions elsewhere in the document. Fuzzy matching catches variations. Provider contexts are explicitly avoided.

The result: `[PATIENT_NAME_REDACTED]` replaces patient identifiers. `Dr. Williams, Cardiology` stays intact. The clinical "who's who" survives. The privacy boundary holds.

This matters downstream in ways that aren't obvious at first. When the summarization model generates a report, it can describe decision pathways ("referred by Dr. Williams to Cardiology") without exposing the patient. When the Q&A engine answers "who ordered the echocardiogram?", the answer is useful because the provider context was preserved.

Redaction is not a compliance checkbox. It's the foundation that makes every subsequent AI call safe to make.

**Privacy is not a feature. It's a precondition.**

---

## Stage 2: Structure Before Retrieval

After redaction, clean text flows into ingestion. This is where most document analysis systems make their most consequential architectural decision, and where most get it wrong.

The standard approach: split text into fixed-size chunks, embed them, store them in a vector database, retrieve by cosine similarity. It works for blog posts and FAQ pages. It fails for structured documents where context depends on position.

A medical record is not a bag of paragraphs. "History of cancer" in the family history section means something entirely different from "cancer" in the current diagnosis section. A flat chunking strategy collapses that distinction. The retrieval engine can't tell the difference because the structural signal was destroyed at ingest time.

The fix is hierarchical chunking based on the RAPTOR architecture from the [second post](https://karim-bhalwani.github.io/ai/rag/document-intelligence/2026/02/07/beyond-million-token-window/):

**Level 0 (Foundation):** Text is split into sentence-aware chunks with page markers preserved. Every token belongs to exactly one chunk. Zero data loss.

**Semantic Annotation:** Each chunk receives an LLM-generated label: section title, key topics, cross-references, defined terms. These labels power the routing layer later.

**Recursive Summarization:** Groups of chunks produce section summaries. Groups of summaries produce chapter summaries. The tree converges upward until a single document-level summary sits at the root.

**Medical Annotation:** The system scans for clinical cross-references ("See Page 5," "Pathology Report") and resolves them into explicit links between chunks.

**Table of Contents:** A master map is generated from the hierarchy, giving the routing layer a navigable index of the entire document.

The ingestion step also runs chunk summarization in massive parallel batches via async calls to GPT-4.1-Mini. A 50-page document produces dozens of chunks. Summarizing them sequentially would be a latency bottleneck. Parallelizing them makes ingestion practical at scale.

The output is not a flat vector store. It's a navigable tree with labeled entry points at every level of abstraction.

**Structure is not a luxury. It's what makes retrieval work on documents that matter.**

---

## Stage 3: Routing That Reasons

With a structured index in hand, the Q&A engine can do something that flat RAG cannot: navigate.

When you ask the system a question, it doesn't compute cosine similarity against every chunk and hope the top-k results contain the answer. It reasons about where the answer should be, then drills down to get it.

### Hierarchical Routing

The router operates in multiple passes:

**Query Classification:** First, the system classifies query complexity (simple, moderate, complex) to determine how many sections to examine. "What was the primary discharge diagnosis?" needs one chunk. "What is the relationship between the cardiac history and current medication regimen?" needs several.

**Reasoning Pass:** The router examines the Table of Contents via a chain-of-thought scratchpad. It thinks out loud: "The user asked about medications. The 'Discharge Summary' and 'Physician Notes' sections are likely relevant because they typically contain prescriptions."

**Selection Pass:** It selects specific chunks identified during reasoning. Output is structured via TOON (Token-Optimized Object Notation) for efficient parsing.

**Drill-Down:** If a selected section is too broad, the router descends into sub-sections for paragraph-level precision.

**Cross-Reference Resolution:** References like "See Page 5" or "Pathology Report" are automatically resolved, pulling in the linked content.

This is the hierarchical navigation pattern from the second post, implemented as a production router. The scratchpad creates an auditable reasoning trace. When the system makes a mistake, you can see exactly where the navigation went wrong.

### Deep Reasoning (RLM)

For complex analytical questions, the pipeline supports an optional deep reasoning mode based on the Recursive Language Model architecture from the [third post](https://karim-bhalwani.github.io/ai/rag/document-intelligence/2026/02/22/mit-gave-the-model-a-python-interpreter/).

Instead of passively consuming context, the root model writes Python code to interrogate the document programmatically. It peeks at sections, greps for anchors, partitions the corpus, and dispatches sub-queries to child LLM calls. Each child operates in an isolated context and returns only its conclusion. The parent's context stays clean.

The security controls outlined in that earlier post are implemented here: code scanning before execution, an allowlist of safe builtins, OS-level resource limits, a queue-based proxy for process isolation, sub-query cost ceilings, and intermediate output truncation.

The combination of hierarchical routing and adaptive RLM gives the pipeline two modes for the same problem class. Standard routing is fast, predictable, and auditable. Deep reasoning is slower, more expensive, and handles questions that require synthesis across structurally distant sections. The system classifies the query and picks the appropriate path.

**Retrieval finds content. Routing finds meaning.**

---

## Stage 4: Answers You Can Trace

Answer generation is not "generate text from context." It's a three-step process designed to produce verifiable output.

**Generation:** Selected chunks are assembled into a context block. The prompt enforces a hard rule: answer using only these chunks. Every claim must cite its source with page numbers.

**Verification:** An independent LLM call reads the answer alongside the source chunks and checks whether the answer is grounded. Is anything fabricated? Does every citation map to actual content? The verifier returns "accurate" or "inaccurate" with an explanation.

**Quality Scoring:** A composite confidence score (0-100%) weights verification status (40%), citation count (40%), and chunk coverage (20%). The user sees a confidence badge alongside every answer.

This matters enormously in the medical domain. A hallucinated medication or fabricated diagnosis is not a minor error. Verification catches these before they reach the reviewer. The confidence score gives the reviewer a calibrated signal about how much to trust the output.

An answer with 95% confidence and three page citations is actionable. An answer with 40% confidence and no citations is a flag to check manually.

**Trust is not a default. It's a score you earn with evidence.**

---

## The Model Dispatch Strategy Nobody Talks About

The architectural decision that has an outsized impact on both cost and quality: not every LLM call needs the same model.

The system dispatches different tasks to different model tiers in the GPT-4.1 family:

| Task | Model | Why |
|------|-------|-----|
| Deep Reasoning (RLM root) | GPT-4.1 | Needs strongest reasoning for code generation and synthesis |
| Report Generation | GPT-4.1-Mini | Structured output from well-scoped context |
| Answer Generation | GPT-4.1-Mini | Citation enforcement with focused chunk input |
| Answer Verification | GPT-4.1-Mini | Binary judgment (grounded vs. not) on small context |
| Semantic Routing | GPT-4.1-Nano | Classification and selection over labeled metadata |
| Chunk Labeling | GPT-4.1-Nano | Short annotation tasks at high volume |

The full model does the hard reasoning. The mini model handles structured generation. The nano model handles high-volume classification. Each task gets exactly the capability it needs, nothing more.

Combined with Cache-Augmented Generation (CAG), which separates static document context from dynamic query content to maximize prompt-prefix cache hits, the cost profile changes dramatically. Naive full-document loading sends the entire corpus on every query. Tiered dispatch sends only what each task requires. Caching eliminates redundant context across sequential questions on the same document. The compound effect is an order-of-magnitude reduction in per-query cost, the difference between a system that's economically viable and one that isn't.

**The cheapest token is the one you never send.**

---

## No Database, By Design

There is no server-side persistence. No database. No file storage. All document state lives in the browser's `sessionStorage` and is cleared when the session closes.

This is not a limitation. It's a privacy guarantee.

When you process a medical record, the extracted text, redacted output, document structure, and summary all flow through the pipeline as an in-memory `PipelineContext` object. The API returns the full result to the frontend. The frontend holds it in session storage. The server retains nothing.

The tradeoff is obvious: users re-upload per session. There is no "document library." No search across past uploads. For ad-hoc document analysis where privacy is non-negotiable, this is the right tradeoff. The alternative, persisting PHI on a server, would require encryption at rest, access controls, retention policies, audit logs, and a compliance review. All solvable, but none of them are free, and none of them are necessary for the core use case.

The simplest privacy architecture is the one where sensitive data never persists in the first place.

**The most secure data store is the one that doesn't exist.**

---

## What the Architecture Actually Looks Like

Zoomed out, the system is four layers:

```
[ Browser SPA ]
      |  HTTP
      v
[ FastAPI API Layer ]
      |  Pydantic domain models
      v
[ Orchestration Layer ]
      |  Protocol interfaces
      v
[ Service Modules: OCR | Redaction | RAG | Summarization ]
      |  External calls
      v
[ LLM Provider | OCR Provider | SpaCy + Presidio ]
```

Every service module implements a Protocol interface. The orchestration layer depends on abstractions, never on concrete implementations. Replacing one LLM provider with another, or swapping Presidio for a different NER engine, requires changes in configuration and service initialization. The pipeline logic doesn't move.

This isn't theoretical flexibility. During development, the LLM provider, model versions, and chunking strategies all changed multiple times. The interface boundaries meant each change was isolated to a single module.

Every pipeline step is decorated with `@traceable` for observability. Every public endpoint has rate limiting. Every route handler is async. Every input is validated and sanitized. The startup sequence fails fast if the LLM provider, OCR service, or spaCy model is unavailable.

These are not interesting architectural decisions. They're the decisions that keep a system running in production when nobody's watching.

**Architecture is what survives contact with real data.**

---

## The Three Posts, Assembled

Every post in this series addressed a failure mode that's obvious once you've tried to build document analysis for real.

[Context-aware redaction](https://karim-bhalwani.github.io/healthcare/privacy/nlp/2026/01/17/context-matters-redacting-health-records/) solved the problem of privacy tools that destroy analytical utility. Two-pass redaction preserves clinical context while enforcing a hard privacy boundary before any LLM call.

[Hierarchical navigation](https://karim-bhalwani.github.io/ai/rag/document-intelligence/2026/02/07/beyond-million-token-window/) solved the problem of models drowning in context they can't navigate. A RAPTOR tree and scratchpad router turn a 200-page document into a navigable index where the model reads exactly what it needs.

[Recursive language models](https://karim-bhalwani.github.io/ai/rag/document-intelligence/2026/02/22/mit-gave-the-model-a-python-interpreter/) solved the problem of questions that require adaptive decomposition. A deep reasoning mode lets the model decide at inference time how to traverse the document, with the security controls to make that safe.

Individually, each technique addresses one dimension of the problem. Together, they form a pipeline where privacy enables trust, structure enables precision, and adaptive reasoning enables complexity, all within a cost envelope that makes the system viable for daily use.

The models will keep improving. Context windows will keep growing. None of that eliminates the need for the pipeline around them. The pipeline is what turns a capable model into a reliable system.

**Capability is what the model can do. Intelligence is what the system does with it.**

---

## Resources & Next Steps

- **Context-Aware Redactor**: [GitHub](https://github.com/karim-bhalwani/context-aware-redactor) | [Blog Post](https://karim-bhalwani.github.io/healthcare/privacy/nlp/2026/01/17/context-matters-redacting-health-records/)
- **Hierarchical Navigation**: [GitHub](https://github.com/karim-bhalwani/hierarchical-navigation) | [Blog Post](https://karim-bhalwani.github.io/ai/rag/document-intelligence/2026/02/07/beyond-million-token-window/)
- **MIT RLM Paper**: [arxiv.org/abs/2512.24601v1](https://arxiv.org/abs/2512.24601v1) | [Blog Post](https://karim-bhalwani.github.io/ai/rag/document-intelligence/2026/02/22/mit-gave-the-model-a-python-interpreter/)

---
