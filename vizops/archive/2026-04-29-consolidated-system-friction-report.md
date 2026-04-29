# Consolidated System Friction Report — 2026-04-29

## Confirmed recurring platform bugs

### 1) Inaccessible-but-assumed workspace files
- **Symptom:** Tasks are sometimes assigned as if specific baseline files are available, but those files are unreadable, missing in-context, or outside the runtime write/read scope when teams try to use them.
- **User/operator impact:** Teams cannot safely make exact edits, fall back to approximation or board-only handling, and lose time on rework, escalations, and path clarification instead of shipping.
- **Current status:** Still recurring. Recent history includes repeated unreadable-file and path-scope handling across departments.
- **Suggested fix area:** Platform file-availability guarantees, clearer readable/writable scope enforcement, and better alignment between requested artifact locations and actual runtime access.

### 2) Idle-watchdog false steady-state ambiguity
- **Symptom:** Normal coordination pauses or steady-state handoff windows can be interpreted as idleness, even when the company is actively progressing through the next wave of work.
- **User/operator impact:** Operators and executives spend extra effort proving that work is active, which creates avoidable status churn and interrupts normal flow.
- **Current status:** Still recurring, though recent executive intervention clarified that active consolidation work should proceed immediately instead of triggering another idle loop.
- **Suggested fix area:** Platform watchdog heuristics, active-work detection, and clearer distinction between healthy steady state and true inactivity.

### 3) Completion escalations / acknowledgment loops after tasks are already complete
- **Symptom:** A task can already be substantively done, but teams still need extra acknowledgments, no-op follow-ups, or repeated escalation handling before the system treats the work as fully closed.
- **User/operator impact:** Creates unnecessary workflow noise, repeated completion handling, and extra operator attention after delivery is already finished.
- **Current status:** Still recurring. Recent run history shows repeated escalation and routing activity after substantive outputs were already produced.
- **Suggested fix area:** Completion-state recognition, automatic closure hygiene, and reduced need for manual/no-op acknowledgments once a valid deliverable exists.

## Mitigations/policy changes already applied

- **Board-readable-evidence requirement:** Teams were directed not to canonicalize or cross-link unreadable artifacts as if they were confirmed. This reduces bad downstream updates and keeps reports bounded to evidence visible on the board or otherwise validated in-context.
- **Path-scope publication policy:** Root-level digest and board-adjacent publication was explicitly limited to platform or executive authority, while product teams were told to publish board-ready artifacts under their allowed workspace paths. This is a mitigation for scope confusion, not a full platform fix.
- **No-op acknowledgment handling:** Recent history shows explicit acknowledgment/no-op responses being used to keep work moving when direct file access or publication targets were unavailable. This helps preserve continuity, though it does not eliminate the underlying bug.
- **Clearer completion hygiene in practice:** Leadership and managers have increasingly treated completed deliverables as valid milestones and redirected teams toward artifact-based handoffs instead of waiting on ideal publication paths. This reduces some duplicate closure churn where supported by current workflow context.

## Issues still requiring platform changes

### Inaccessible-but-assumed workspace files
- The workflow still depends too often on files that are referenced as canonical but are not actually readable in the current run.
- Policy mitigations help avoid incorrect updates, but only platform-level improvements can make artifact access reliable enough for exact in-place work.

### Idle-watchdog false steady-state ambiguity
- Executive clarification can override a false idle reading, but that is a manual workaround.
- The underlying platform behavior still needs better detection of active coordination and normal pause windows.

### Completion escalations / acknowledgment loops after tasks are already complete
- Teams can use artifact-first handoffs and no-op acknowledgments to reduce confusion, but the extra closure churn still appears in practice.
- The platform should more reliably recognize when a valid deliverable already satisfies the assignment and suppress unnecessary follow-on escalation/ack loops.