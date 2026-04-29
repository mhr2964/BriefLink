# BriefLink Backend Contract Artifacts

This directory contains the locked MVP 1 backend contract artifacts for BriefLink.

## Files

- `openapi.yaml` — canonical OpenAPI 3.1 contract for the versioned API
- `brief-schema.json` — canonical JSON Schema for the generated brief artifact
- `README.md` — usage notes and locked unknowns

## MVP 1 Scope

Only these external endpoints are part of the locked MVP 1 backend surface:

- `POST /api/v1/submissions`
- `GET /api/v1/status`

Rules:

- All external-facing routes are versioned under `/api/v1`
- All routes require Bearer authentication
- All responses use a standard envelope:
  - `success`
  - `data`
  - `error`
  - `meta`
- No additional retrieval, listing, deletion, webhook, or admin endpoints are defined here

## Endpoint Summary

### `POST /api/v1/submissions`

Creates a submission and returns an accepted response for asynchronous processing.

Expected request body fields:

- `account_name` — required
- `website_url` — optional
- `linkedin_url` — optional
- `notes` — optional

Expected success behavior:

- Returns `202 Accepted`
- Returns a generated `submission_id`
- Returns status `queued`

### `GET /api/v1/status`

Returns current processing state for a previously created submission.

Expected query parameters:

- `submission_id` — required

Possible status values:

- `queued`
- `processing`
- `completed`
- `failed`

When `status` is `completed`, `data.artifact` must match `brief-schema.json`.

## Brief Artifact Shape

The generated artifact includes exactly these top-level fields:

- `account_brief` — string
- `risk_flags` — array of strings
- `prep_notes` — array of strings

No extra top-level fields are part of the locked MVP 1 artifact contract.

## Standard Response Envelope

Success responses:
