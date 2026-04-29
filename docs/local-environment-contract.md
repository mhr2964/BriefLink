# Local Environment Contract

_Last updated by platform on this round._

## Purpose

This document defines the minimum contract for local environment documentation and configuration handoff across departments. It is intentionally limited to platform-evidenced process and file expectations. It does **not** invent app behavior or service requirements.

## Contract scope

This contract applies to:

- root/shared environment templates owned by platform
- documentation of required variables and local prerequisites
- handoff expectations for `frontend`, `backend`, `ui-integration`, and `parity-qa`

This contract does **not** define:

- secret values
- app-specific business logic
- service behavior
- test outcomes
- deployment semantics unless separately evidenced

## Current baseline assumptions platform can state

From the current assignment context, platform can state only the following:

- a root script baseline exists
- a baseline environment template/setup exists
- fuller shared documentation was still needed before this round
- platform owns the shared documentation and contract layer under `workspace/docs/`

If any team needs stronger guarantees than the above, those guarantees must be documented in an evidenced artifact before they are treated as contractually available.

## Contract rules

### 1. No secret values in repo-owned docs

This repository may document:

- variable names
- whether a variable is required or optional
- who owns provisioning of the value
- where the value is expected to be injected locally

This repository must **not** document:

- real secrets
- personal tokens
- production credentials
- unredacted connection strings intended to remain private

### 2. Environment requirements must be named, not implied

For any service/app that expects environment configuration, the owning department should provide an evidenced list containing:

- variable name
- required/optional status
- consumer(s)
- safe example or placeholder format
- notes on what happens if omitted, if known
- owner of the real value

If that list does not exist, teams should treat the requirement set as incomplete.

### 3. Platform owns the shared contract format

Platform owns:

- the existence and location of shared environment documentation
- root/shared template conventions
- repo-visible guidance for how departments describe env needs

Other departments own:

- declaring the variables their software actually consumes
- correcting inaccurate service-specific claims
- validating their runtime behavior

### 4. Runtime truth belongs to service owners

A variable documented in a template or contract is not the same as a verified runtime configuration.

Service-owning departments must separately confirm:

- the app starts with the documented variables
- the documented defaults/placeholders are accurate
- any required external dependency is reachable
- missing-variable behavior is as described

### 5. QA and integration may rely only on evidenced setup

`ui-integration` and `parity-qa` may rely on:

- documented variable names and placeholders
- documented local prerequisites
- documented run-order dependencies
- documented ports/base URLs

They may **not** assume:

- credentials exist
- services are running
- data is seeded
- cross-service flows are valid

unless those conditions are separately evidenced.

## Required artifact shape

When environment details are mature enough to publish, the shared contract should include, at minimum, the following sections.

## A. File locations

Document all relevant env/config files, for example:

- root template file path: `[placeholder: path not yet cited in this document]`
- service-specific template file path(s): `[placeholder]`
- setup/readme references: `[placeholder]`

If the actual paths are known later, replace placeholders with exact repo paths.

## B. Variable matrix

Each service/app should eventually publish a matrix like the following:

| Variable | Required? | Consumed by | Example/Placeholder | Value owner | Notes |
|---|---|---|---|---|---|
| `[PLACEHOLDER_VAR]` | `[required/optional]` | `[service/app]` | `[safe-placeholder]` | `[team/person/system]` | `[behavior or notes]` |

At present, this matrix is a required placeholder and not yet populated by evidenced service data in this assignment.

## C. Local prerequisites

Each runnable surface should document prerequisites such as:

- language/runtime version
- package manager expectation
- database or external service dependency
- seed/migration requirement
- required local ports
- browser/device assumptions if relevant

Current state in this document: `[placeholder: prerequisite list not yet evidenced here]`

## D. Startup contract

Each runnable surface should eventually state:

- startup command
- expected dependent services
- expected base URL/port
- health-check or ready signal, if one exists

Current state in this document: `[placeholder: startup contract not yet evidenced here]`

## E. Ownership map

Every variable or prerequisite should have an owner category:

- `platform` — shared template location/format, root guidance
- `frontend` — frontend-consumed variables and runtime validation
- `backend` — backend-consumed variables and runtime validation
- `ui-integration` — integration-specific composition assumptions
- `parity-qa` — test preconditions and environment usage assumptions
- `[placeholder for additional owner]`

## Presently acceptable placeholders

Until exact values/paths are confirmed, placeholders are acceptable only if they are explicit and non-misleading. Use forms like:

- `[placeholder: exact env template path pending evidence]`
- `[placeholder: backend-required variable list pending backend artifact]`
- `[placeholder: frontend local port pending frontend artifact]`

Do **not** replace unknowns with guessed defaults.

## Minimum handoff expectations by team

## `frontend`

Should provide, in an evidenced artifact:

- variables consumed by frontend code/tooling
- whether each is required for local boot
- expected local port/base URL
- backend dependency assumptions, if any

## `backend`

Should provide, in an evidenced artifact:

- variables consumed by backend services
- required external dependencies
- startup command and ready condition
- local port/base URL
- safe placeholders for non-secret config

## `ui-integration`

Should provide, in an evidenced artifact:

- composition assumptions across frontend/backend surfaces
- any integration-only variables or routing assumptions
- required order of service startup, if any
- what “ready for integration” means in observable terms

## `parity-qa`

Should provide, in an evidenced artifact:

- test preconditions
- required accounts/data/state assumptions
- environment selection assumptions
- blockers caused by missing variables, services, or setup docs

## Platform acceptance rule

Platform may treat an environment detail as part of the shared contract only when it is:

- present in a platform-owned file, or
- supplied by the owning department in a reviewable artifact, or
- explicitly confirmed through management

Until then, the correct contract state is a placeholder.

## Open placeholders to resolve

- [ ] Exact root env-template file path(s)
- [ ] Exact root script names and purpose
- [ ] Frontend variable matrix
- [ ] Backend variable matrix
- [ ] Integration composition prerequisites
- [ ] QA precondition matrix
- [ ] Port/base URL matrix
- [ ] External dependency list
- [ ] Local startup sequence
- [ ] Secret ownership/injection guidance

## Change policy

When updating this contract:

1. Preserve factual, evidenced statements.
2. Replace placeholders only with sourceable facts.
3. Attribute service-specific requirements to the owning department.
4. Avoid converting runtime hopes into contract guarantees.
5. Prefer an explicit gap over an invented default.