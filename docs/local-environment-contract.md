# Local Environment Contract

_Last updated by platform in Round 3._

## Purpose

This document defines the platform-owned contract for how local environment requirements should be documented and shared across teams. It captures only evidence-backed setup expectations and explicit placeholders for anything not yet established.

It is intended to be the shared reference for `frontend`, `backend`, `ui-integration`, and `parity-qa` when describing local environment dependencies in a way that is:

- repo-visible
- auditable
- non-speculative
- safe for cross-team use

## Evidence rule

A statement belongs in this contract only if it is one of the following:

- visible in a platform-owned repository artifact
- explicitly confirmed by management in current platform instructions
- supplied by the owning department in a reviewable artifact that platform can cite

If a detail is not evidenced, this contract must label it as missing or placeholder rather than inventing a default.

## Known Ready

The following contract elements are currently ready and may be relied on at the platform level.

### 1. Contract location

The shared local environment contract now exists at:

- `workspace/docs/local-environment-contract.md`

The corresponding status summary exists at:

- `workspace/docs/environment-status-report.md`

### 2. Platform-owned documentation layer exists

Platform has now provided a shared place for:

- reporting current environment readiness
- identifying missing prerequisites
- documenting team unblock status
- publishing future evidence-backed updates

### 3. Manager-confirmed baseline exists

Recent manager instructions establish the following as available at baseline:

- root workspace scripts exist
- baseline env setup exists

This contract treats those as current high-level facts only. It does not infer detailed usage beyond what has been evidenced.

## Missing Prerequisites

The following parts of the local environment contract are still unresolved and must not be assumed.

### 1. Exact file paths for env templates

Not yet evidenced:

- root env template path(s)
- service-specific env template path(s)
- copy/setup instructions for local developer use

Placeholder:

- `[missing evidence: exact env-template file inventory]`

### 2. Variable matrix per service

Not yet evidenced:

- variable names
- required vs optional status
- consuming service/app
- safe placeholder examples
- ownership of real values
- behavior when omitted

Placeholder:

- `[missing evidence: per-service variable matrix]`

### 3. Local prerequisite inventory

Not yet evidenced:

- runtime/toolchain versions
- package manager expectations
- databases, queues, or third-party services
- migrations/seeding requirements
- local browser/device assumptions if any

Placeholder:

- `[missing evidence: local prerequisite inventory]`

### 4. Startup contract

Not yet evidenced:

- startup commands
- dependency order
- local ports
- base URLs
- ready/healthy signals

Placeholder:

- `[missing evidence: local startup contract]`

### 5. Secret handling contract

Not yet evidenced:

- secret ownership
- local secret placement rules
- injection mechanism expectations
- CI/staging mapping to local placeholders

Placeholder:

- `[missing evidence: secret ownership and injection contract]`

## Contract Rules

### 1. No real secrets in shared docs

This contract may include:

- variable names
- placeholder values
- ownership notes
- required/optional status
- setup instructions that do not reveal secrets

This contract must not include:

- real secret values
- personal tokens
- production credentials
- unredacted sensitive connection strings

### 2. Unknowns must remain explicit

If a team has not published an evidenced requirement, the contract must use a placeholder such as:

- `[missing evidence: frontend variables]`
- `[missing evidence: backend startup command]`
- `[missing evidence: integration base URL]`

Unknowns must not be replaced with guessed defaults.

### 3. Service owners define service requirements

Platform owns:

- shared contract structure
- shared documentation location
- root/shared environment documentation process

Service-owning teams own:

- the actual variables their software consumes
- the actual startup steps for their software
- the runtime validation of those requirements

### 4. Documentation is not runtime proof

A variable or command listed in a contract is only documentation until verified by the owning team.

This contract does **not** by itself prove that:

- services boot successfully
- integrations function
- tests pass
- dependencies are reachable

### 5. Repo-visible updates only

To become part of the shared contract, new environment details should be added in a repo-visible, reviewable form rather than passed informally.

## Team Unblock Notes

### `frontend`

Unblocked now for:

- using this contract as the required format for publishing frontend env needs
- identifying missing frontend setup details as named placeholders
- relying on a stable shared documentation path

Still blocked on missing evidence for:

- exact frontend variable list
- exact frontend startup command
- exact frontend local port/base URL

### `backend`

Unblocked now for:

- using this contract as the required format for publishing backend env needs
- documenting backend prerequisites in a shared, auditable place
- aligning backend config reporting with platform rules

Still blocked on missing evidence for:

- exact backend variable list
- exact backend startup command
- exact backend local port/base URL
- exact external dependency requirements

### `ui-integration`

Unblocked now for:

- using this contract to identify the missing composition contract
- requesting explicit env and routing details from service owners
- distinguishing documented setup from assumptions

Still blocked on missing evidence for:

- integration routing/base URLs
- startup order across services
- integration-specific env requirements
- verified combined runtime

### `parity-qa`

Unblocked now for:

- using this contract to cite missing prerequisites precisely
- mapping QA blockers to documented setup gaps
- avoiding reliance on undocumented environment assumptions

Still blocked on missing evidence for:

- runnable target confirmation
- QA preconditions
- data/account assumptions
- stable verified service endpoints

## Required contract shape for future updates

When teams provide evidence-backed environment details, this contract should be expanded to include the following sections.

### A. File inventory

Required fields:

- exact file path
- purpose
- owner
- whether committed or local-only

Current placeholder:

- `[missing evidence: file inventory]`

### B. Variable matrix

Use the following structure:

| Variable | Required | Consumed by | Safe placeholder/example | Value owner | Notes |
|---|---|---|---|---|---|
| `[PLACEHOLDER_VAR]` | `[yes/no]` | `[service/app]` | `[safe-placeholder]` | `[team/system]` | `[notes]` |

Current placeholder:

- `[missing evidence: variable matrix]`

### C. Local prerequisites

Required fields:

- prerequisite
- why it is needed
- owner
- whether mandatory for all contributors or role-specific

Current placeholder:

- `[missing evidence: local prerequisites table]`

### D. Startup/runtime table

Required fields:

- service/app
- startup command
- dependencies
- local port/base URL
- ready signal

Current placeholder:

- `[missing evidence: startup/runtime table]`

## Current safe use of this contract

Teams may safely use this contract to:

- document what is known
- mark what is missing
- coordinate environment handoff in a standard format
- avoid converting assumptions into false guarantees

Teams may not safely use this contract to claim:

- any specific variable exists unless listed in evidence-backed form
- any service boots unless verified by its owner
- any integration path works unless evidenced
- any QA run is ready unless prerequisites are published and satisfied

## Open placeholders to resolve

- [ ] exact root script inventory
- [ ] exact env-template path inventory
- [ ] frontend variable matrix
- [ ] backend variable matrix
- [ ] integration variable/routing matrix
- [ ] QA precondition list
- [ ] local prerequisite inventory
- [ ] startup/runtime table
- [ ] ports and base URLs
- [ ] secret ownership/injection notes
- [ ] runtime verification references