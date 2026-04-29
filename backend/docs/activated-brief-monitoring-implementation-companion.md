# Activated Brief Monitoring Implementation Companion

## Reference Package

This companion operationalizes the source package:

- `workspace/backend/docs/activated-brief-monitoring-package.md`

Use the source package as the canonical reference for:
- monitoring domain vocabulary
- enum values
- lifecycle semantics
- stable response shapes
- `/api/v1` versioning requirement

This companion is implementation-ready guidance for turning that package into backend patches and frontend migration steps.

---

## Purpose

This document translates the activated-brief-monitoring package into concrete backend seams and delivery slices. It is intended to support a minimal first implementation that replaces frontend local/mock monitoring state with persisted backend state while preserving predictable, versioned API contracts.

It covers:

- `/api/v1` endpoint inventory
- request bodies and response envelopes
- validation and error cases per route
- handler/service/repository boundaries
- persistence notes for monitor and event writes
- event-write and state-transition rules
- frontend cutover checklist
- env-driven origin, base URL, and CORS assumptions

---

## Delivery Approach

Implement in narrow, testable slices:

1. persistence for monitor current state and event history
2. canonical serializers for monitor and event responses
3. create/upsert monitor route
4. get monitor by brief route
5. record monitor event route
6. list monitor events route
7. optional pause/resume convenience routes

This order allows frontend to switch reads first, then writes, then activity/history.

---

## API Route Inventory

All external-facing routes are under `/api/v1`.

### Required Routes

1. `POST /api/v1/activated-brief-monitors`
   - create or upsert a monitor for an activated brief

2. `GET /api/v1/activated-brief-monitors/by-brief/:briefId`
   - fetch current monitor state by brief ID

3. `POST /api/v1/activated-brief-monitors/:monitorId/events`
   - record a monitoring event and optionally mutate current state

4. `GET /api/v1/activated-brief-monitors/:monitorId/events`
   - list paginated event history for one monitor

### Optional Convenience Routes

5. `POST /api/v1/activated-brief-monitors/:monitorId/pause`
   - convenience action that creates a pause event and applies transition rules

6. `POST /api/v1/activated-brief-monitors/:monitorId/resume`
   - convenience action that creates a resume event and applies transition rules

These convenience routes must reuse the same domain/service logic as the event-write route and must not bypass transition validation.

---

## Standard Response Envelopes

### Success Envelope

All success responses should use:
