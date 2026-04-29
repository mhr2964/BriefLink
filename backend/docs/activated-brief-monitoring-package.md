# Activated Brief Monitoring Package

## Purpose

This package defines a minimal, repo-agnostic backend contract for **Activated brief monitoring** so frontend implementations can migrate from local/mock state to durable API-backed state without changing core UI flow. It covers:

- minimal monitoring data model
- `/api/v1` request/response envelopes
- lifecycle and status/state transitions
- validation and error cases
- explicit persistence and integration seams

This document is intentionally implementation-neutral. It does not require a specific database, queue, auth provider, or framework.

---

## Scope

Activated brief monitoring begins **after a brief has been activated** and needs ongoing status tracking. The minimal backend responsibility is to:

1. create or upsert a monitoring record for an activated brief
2. expose current monitoring state via versioned API routes
3. accept status updates from internal workers/integrations
4. persist a lightweight status history for audit/debugging
5. provide stable response shapes for frontend consumption

Out of scope for this package:

- alert delivery implementation
- visualization details
- polling intervals chosen by frontend
- vendor-specific webhook wiring
- analytics/reporting beyond status history
- authorization policy details beyond envelope examples

---

## Design Goals

- Keep the first contract small and stable
- Support frontend migration from mock/local state with minimal adapter logic
- Separate current state from event history
- Make transitions explicit and predictable
- Preserve room for future signals, metrics, and automation
- Ensure all external-facing routes are versioned under `/api/v1`

---

## Minimal Domain Model

### 1) Monitoring Record

Represents the current monitoring state for one activated brief.

#### Entity: `ActivatedBriefMonitor`

| Field | Type | Required | Notes |
|---|---|---:|---|
| `id` | string | yes | Stable monitor identifier, server-generated |
| `briefId` | string | yes | ID of the activated brief being monitored |
| `accountId` | string | yes | Owning account/workspace/customer identifier |
| `status` | enum | yes | Current lifecycle status |
| `health` | enum | yes | Coarse health summary for UI badges |
| `source` | enum | yes | Origin of current state update |
| `summary` | string \| null | no | Short operator/UI-readable summary |
| `lastCheckedAt` | string(datetime) \| null | no | Last successful monitoring evaluation/check |
| `lastStatusChangedAt` | string(datetime) | yes | Timestamp of current status transition |
| `lastEventAt` | string(datetime) \| null | no | Timestamp of most recent accepted event |
| `errorCode` | string \| null | no | Machine-readable error key when degraded/failed |
| `errorMessage` | string \| null | no | Safe, user-displayable error summary |
| `metadata` | object | no | Non-critical structured context, small and sanitized |
| `createdAt` | string(datetime) | yes | Record creation time |
| `updatedAt` | string(datetime) | yes | Last persistence update time |

#### Status enum: `MonitoringStatus`

Minimal allowed values:

- `pending` — monitoring exists but first check/event has not completed
- `active` — monitoring is functioning normally
- `degraded` — monitoring is functioning with issues or incomplete signal coverage
- `paused` — monitoring intentionally paused by system/operator
- `failed` — monitoring cannot currently operate
- `completed` — monitoring lifecycle has ended normally
- `archived` — record retained but not operational

#### Health enum: `MonitoringHealth`

UI-oriented rollup:

- `unknown`
- `ok`
- `warning`
- `critical`

#### Source enum: `MonitoringSource`

Origin of the current state:

- `system`
- `integration`
- `user`
- `migration`

---

### 2) Monitoring Event

Represents a single accepted state-affecting or informational event.

#### Entity: `ActivatedBriefMonitorEvent`

| Field | Type | Required | Notes |
|---|---|---:|---|
| `id` | string | yes | Stable event identifier, server-generated |
| `monitorId` | string | yes | Parent monitoring record |
| `briefId` | string | yes | Denormalized for query convenience |
| `type` | enum | yes | Event classification |
| `statusBefore` | enum \| null | no | Previous monitor status |
| `statusAfter` | enum \| null | no | New monitor status, if changed |
| `healthAfter` | enum \| null | no | New health value, if relevant |
| `source` | enum | yes | Event origin |
| `message` | string \| null | no | Human-readable event description |
| `occurredAt` | string(datetime) | yes | When the event occurred |
| `recordedAt` | string(datetime) | yes | When backend persisted the event |
| `dedupeKey` | string \| null | no | Optional idempotency/deduplication key |
| `metadata` | object | no | Small structured context |

#### Event type enum: `MonitoringEventType`

Minimal allowed values:

- `monitor_created`
- `check_completed`
- `status_changed`
- `health_changed`
- `pause_requested`
- `resumed`
- `integration_error`
- `manual_note`
- `monitor_completed`
- `monitor_archived`

---

## Lifecycle and State Transition Rules

### Canonical Status Flow

Primary lifecycle:

`pending -> active -> completed -> archived`

Operational exception paths:

- `pending -> failed`
- `pending -> paused`
- `active -> degraded`
- `active -> paused`
- `active -> failed`
- `degraded -> active`
- `degraded -> paused`
- `degraded -> failed`
- `paused -> active`
- `paused -> degraded`
- `paused -> archived`
- `failed -> active`
- `failed -> archived`
- `completed -> archived`

### Invalid Transitions

These should be rejected with `409 Conflict` unless explicitly force-enabled by an internal-only operation:

- `archived -> *`
- `completed -> active`
- `completed -> degraded`
- `completed -> failed`
- `pending -> completed` without at least one accepted monitoring check/event
- no-op transitions where incoming `status` equals current `status` should not create a `status_changed` event unless the caller explicitly asks to log a heartbeat/note

### Health Mapping Guidance

Suggested minimum mapping:

- `pending` -> `unknown`
- `active` -> `ok`
- `degraded` -> `warning`
- `paused` -> `warning`
- `failed` -> `critical`
- `completed` -> `ok`
- `archived` -> `unknown`

Implementations may override health separately, but if they do, they should preserve predictable UI meaning.

---

## Persistence Shape

A minimal persistent implementation should support two tables/collections.

### Table/Collection: `activated_brief_monitors`

Required persisted columns/fields:

- `id`
- `brief_id`
- `account_id`
- `status`
- `health`
- `source`
- `summary`
- `last_checked_at`
- `last_status_changed_at`
- `last_event_at`
- `error_code`
- `error_message`
- `metadata`
- `created_at`
- `updated_at`

Recommended constraints:

- unique on active logical monitor per `brief_id`
- index on `account_id`
- index on `status`
- index on `updated_at`

### Table/Collection: `activated_brief_monitor_events`

Required persisted columns/fields:

- `id`
- `monitor_id`
- `brief_id`
- `type`
- `status_before`
- `status_after`
- `health_after`
- `source`
- `message`
- `occurred_at`
- `recorded_at`
- `dedupe_key`
- `metadata`

Recommended constraints:

- foreign key/reference from `monitor_id` to monitor
- index on `monitor_id, occurred_at desc`
- optional unique index on `monitor_id, dedupe_key` where `dedupe_key` is not null

---

## API Conventions

All external-facing routes are versioned under `/api/v1`.

### Standard Success Envelope
