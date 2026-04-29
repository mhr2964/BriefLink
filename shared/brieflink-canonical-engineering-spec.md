# BriefLink Canonical Engineering Spec

Implementation-truth only. This document records accepted surfaces and behaviors visible in the current workspace. It does not promote package proposals or implementation-neutral docs into runtime facts.

---

## 1) Accepted Surfaces

### Backend surfaces visible in code/spec

**Sources:** `backend/openapi.yaml`, `backend/src/app.js`, `backend/src/routes/briefs.js`, `backend/src/routes/status.js`

Accepted external API surfaces currently visible:

- `GET /api/v1/status`
- `POST /api/v1/briefs`

Accepted backend implementation surfaces currently visible:

- Express app with versioned API routing under `/api/v1`
- status route module at `backend/src/routes/status.js`
- brief creation route module at `backend/src/routes/briefs.js`
- brief generation service at `backend/src/services/brief-generator.js`

### Frontend surfaces visible in code/docs

**Sources:** `frontend/src/App.tsx`, `frontend/src/pages/*.tsx`, `frontend/src/ActivatedBriefMonitoringView.tsx`, `frontend/ACTIVATED_BRIEF_MONITORING_IMPLEMENTATION_BRIEF.md`

Accepted frontend surfaces currently visible:

- multi-page React/TypeScript application under `frontend/src/pages`
- additive activated monitoring screen in `frontend/src/ActivatedBriefMonitoringView.tsx`
- route/state flow that includes brief composition, confirmation, success/status/replies, and monitoring-related views
- local/mock data layer present under `frontend/src/lib`

### Shared accepted truth boundary

Accepted truth comes from:
- route code
- service code
- visible frontend components/pages
- on-disk runtime/config docs where they directly describe current environment behavior

Non-binding unless also implemented:
- implementation-neutral packages
- proposal docs
- speculative integration packages

---

## 2) Actual API Contract

### 2.1 `GET /api/v1/status`

**Sources:** `backend/openapi.yaml`, `backend/src/routes/status.js`

#### Runtime behavior
Returns HTTP `200` JSON success envelope.

#### Runtime response shape