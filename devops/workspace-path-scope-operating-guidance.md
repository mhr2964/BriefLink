# Workspace Path / Scope Operating Guidance

## Status
This guidance converts the accepted findings in `workspace/devops/workspace-read-failure-findings.md` into standing operating practice.

The prior workspace read-failure incident is **closed** unless **materially new, reproducible symptoms** appear.

## Canonical operating interpretation
Use the following interpretation going forward:

- workspace provisioning/path-scope-resolution mismatch is the current accepted explanation for the prior incident
- repository content presence in the visible tree was evidenced
- branch/revision mismatch was not proven, but also could not be ruled out from the available logs
- CI/deploy issues were not evidenced as causal in that incident

This guidance is meant to reduce recurrence and improve future diagnosis quality.

## Standing guidance

### 1) Normalize path targeting to department scope
Before any read, write, or patch attempt:

- normalize the target path to the expected `workspace/...` form
- confirm the path is inside the acting department's allowed scope
- avoid generating artifacts for paths that are known to be out of scope
- when a task spans multiple departments, route ownership explicitly instead of assuming cross-scope write access

### 2) Prefer scope-aware targeting over root-relative assumptions
Do not assume that a visible file in the workspace tree is writable or readable from every worker context.

Operationally:
- a file may exist in the tree and still be inaccessible to a specific worker
- a failed access attempt should first be checked against scope rules before being treated as file absence
- root-level paths should be treated as authority-dependent, not universally writable

### 3) Require branch/commit metadata in future incident reports
Any future incident report involving read failures, missing files, path inconsistencies, or conflicting tree views should include revision context where tooling allows.

Minimum required metadata:
- branch name, if available
- commit SHA or equivalent revision identifier, if available
- timestamp of the failing attempt
- path requested exactly as submitted
- worker/department scope involved in the failure

This requirement exists because the prior incident could not fully confirm or exclude branch/revision mismatch from the logs alone.

### 4) Distinguish `not found` vs `out of scope` in future handoffs where tooling allows
Future handoffs and incident notes should avoid collapsing these into one ambiguous category when the tooling can separate them.

Preferred reporting format:
- **Not found:** target path was within allowed scope but no file was present at that path
- **Out of scope:** target path exists or may exist, but the acting worker was not permitted to access it
- **Malformed patch/input:** request failed due to patch formatting or invalid submission structure, not repository state

If tooling emits a combined message, note the ambiguity explicitly rather than asserting file absence.

### 5) Separate access failures from patch-format failures
Do not treat malformed patch/application errors as proof of missing files.

In future incident summaries:
- scope/access failures should be described as access-policy or targeting issues
- malformed patch errors should be described as submission-format issues
- file absence should only be claimed when specifically evidenced

## Escalation threshold to reopen the incident
The prior incident should remain closed unless there is **materially new, reproducible evidence**, such as:

- repeated read failures against correctly scoped paths
- conflicting results across workers using the same path and same revision context
- newly captured logs that clearly contradict the accepted explanation
- reproducible evidence that a correctly scoped, existing file is inaccessible without a policy reason
- repeated failures after path normalization and scope-aware targeting have been applied

Absent those conditions, do **not** reopen the diagnosis lane.

## Recommended handoff checklist for future workspace/path incidents
When posting a new handoff, include:

1. exact requested path
2. normalized path
3. acting department/worker
4. known allowed scope
5. branch/commit metadata, where available
6. whether the failure was:
   - not found
   - out of scope
   - malformed patch/input
   - unknown/combined tooling message
7. whether the file is visible in the current workspace tree
8. whether the symptom is reproducible

## Closing statement
Standing guidance is now:

> Normalize path targeting to department scope, require branch/commit metadata in future incident reporting, distinguish `not found` from `out of scope` wherever tooling allows, and keep the prior workspace read-failure incident closed unless materially new reproducible symptoms appear.