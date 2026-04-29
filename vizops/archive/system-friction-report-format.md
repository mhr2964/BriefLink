# System Friction Report Format

## Reporting Cadence Rules

- Publish one **weekly System Friction Report** on a fixed weekly cadence.
- Publish sooner than the weekly cadence if:
  - a new **P1** issue appears,
  - an issue materially blocks multiple departments,
  - a previously reported issue changes severity,
  - a user-visible or operator-visible failure starts recurring.
- Publish a short **System Friction Snapshot** for urgent changes between weekly reports.
- Weekly reports should emphasize trend clarity and delta versus the prior report, not a raw dump of every symptom.
- If no meaningful changes occurred, still publish the weekly report with an explicit **no material change** note.
- Every issue carried forward must show one of: **new**, **unchanged**, **worsened**, **partially improved**, **resolved**.

## Priority Labels

- **P1 — Critical**
  - Reproducible issue causing major workflow blockage, incorrect system behavior, or repeated failure across multiple departments.
  - Requires same-day visibility and an ad hoc snapshot.

- **P2 — High**
  - Significant recurring friction that slows execution, causes avoidable rework, or creates repeated confusion for operators.
  - Must appear in the next weekly report and sooner if impact is expanding.

- **P3 — Medium**
  - Real but non-blocking issue with limited operational drag or narrow scope.
  - Track in weekly reporting until resolved or deprioritized.

- **P4 — Low**
  - Minor annoyance, formatting gap, or low-frequency issue with limited immediate impact.
  - Include only if persistent, newly recurring, or part of a broader pattern.

## Input Responsibilities

### Efficiency
- Detect recurring operational friction patterns from board activity, escalations, handoff delays, idle periods, and repeated blockers.
- Summarize issue frequency, severity trend, and workflow impact.
- Flag when a symptom appears systemic rather than isolated.

### Archivist
- Maintain the canonical evidence log for reported system-friction issues.
- Preserve timestamps, affected departments, linked decisions, and prior report continuity.
- Confirm whether an issue is new, recurring, previously noted, or resolved.

### Chief of Staff
- Own the final user-facing report and snapshot publication.
- Merge efficiency pattern analysis with archivist evidence into a concise operating narrative.
- Assign clear owner/status labels, maintain priority discipline, and highlight what changed since the last report.

---

# Weekly Template: System Friction Report

## System Friction Report
**Reporting window:** [date range]  
**Prepared by:** Chief of Staff  
**Inputs:** Efficiency pattern review, Archivist evidence log  
**Overall status:** [stable / worsening / improving / mixed]

### Summary
- **Open issues:** [count]
- **New this week:** [count]
- **Resolved this week:** [count]
- **Highest priority:** [issue title]
- **Overall delta vs last report:** [1-3 sentence summary]

### Issue List

#### [Issue title]
- **Priority:** [P1 / P2 / P3 / P4]
- **Status:** [new / unchanged / worsened / partially improved / resolved]
- **Reproducible symptom:** [plain-language description of what repeatedly happens]
- **User/operator impact:** [what work is blocked, slowed, confused, or made unreliable]
- **Scope / frequency:** [who is affected, how often it appears, whether it spans multiple departments]
- **Suggested fix area:** [platform / orchestration / workspace visibility / reporting flow / escalation flow / other]
- **Owner:** [team or role expected to drive resolution]
- **Evidence / notes:** [brief supporting context, timestamps, or examples]
- **Delta vs last report:** [what changed since the previous report]

#### [Issue title]
- **Priority:** [P1 / P2 / P3 / P4]
- **Status:** [new / unchanged / worsened / partially improved / resolved]
- **Reproducible symptom:** [...]
- **User/operator impact:** [...]
- **Scope / frequency:** [...]
- **Suggested fix area:** [...]
- **Owner:** [...]
- **Evidence / notes:** [...]
- **Delta vs last report:** [...]

### Resolved Since Last Report
- **[Issue title]** — [what changed, when it stopped reproducing, and any remaining watch item]

### Watchlist / Emerging Signals
- [short list of lower-confidence issues worth monitoring next week]

---

# Ad Hoc Template: System Friction Snapshot

## System Friction Snapshot
**Date:** [timestamp]  
**Trigger:** [new P1 / severity increase / cross-company blocker / urgent user-visible failure]

- **Issue:** [short title]
- **Priority:** [P1 / P2]
- **Reproducible symptom:** [one clear sentence]
- **Impact:** [who is blocked or affected right now]
- **Current scope:** [departments/users/operators affected]
- **Suggested fix area:** [best current guess]
- **Owner / status:** [who is driving it and current state]
- **Delta since last report:** [new / worsened / partially improved]
- **Immediate next step:** [what should happen next]