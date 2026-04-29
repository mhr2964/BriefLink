# BriefLink DevOps Artifacts

This directory contains repository-support artifacts for the current BriefLink workspace layout.

## Current workspace shape

### Frontend
The frontend directory currently includes both a static prototype layer and a React-style app structure:

- `workspace/frontend/index.html`
- `workspace/frontend/style.css`
- `workspace/frontend/app.js`
- `workspace/frontend/package.json`
- `workspace/frontend/src/main.jsx`
- `workspace/frontend/src/App.jsx`
- `workspace/frontend/src/styles.css`
- `workspace/frontend/components/brief-form.js`
- `workspace/frontend/components/brief-view.js`
- `workspace/frontend/lib/brief-delay.js`
- `workspace/frontend/lib/brief-text.js`

There are also product-facing handoff/spec files in `workspace/frontend/`:
- `mvp-acceptance-criteria-by-step.md`
- `mvp-core-flow-spec.md`
- `mvp-prototype-priorities.md`
- `mvp-screen-state-inventory.md`

### Backend
The backend directory currently includes a Node service structure plus API contract artifacts:

- `workspace/backend/package.json`
- `workspace/backend/README.md`
- `workspace/backend/openapi.yaml`
- `workspace/backend/brief-schema.json`
- `workspace/backend/src/index.js`
- `workspace/backend/src/app.js`
- `workspace/backend/src/routes/status.js`
- `workspace/backend/src/routes/briefs.js`
- `workspace/backend/src/services/brief-generator.js`

## How to interpret the current repo state
This is an integration-stage workspace, not yet a finalized single-root runnable repository shape.

- The frontend has both:
  - simple static prototype entry files at the top level, and
  - a React-style application entry under `src/`
- The backend is organized as a small Node service with route and service separation
- API contract definitions are already present under the backend directory via `openapi.yaml` and `brief-schema.json`

## Recommended repo handling
Until a final top-level runtime/deploy structure is selected:

- treat `workspace/frontend/` as the frontend app boundary
- treat `workspace/backend/` as the backend service boundary
- treat backend contract files as the source of API integration truth
- keep deployment docs aligned to these two independent build surfaces

## Documentation intent
These devops artifacts are execution-free. They document:
- what should be ignored in version control
- how to think about the current frontend/backend layout
- what deployment artifacts should exist next once release packaging begins

## Next hardening targets
When the stack is being finalized, the next repo pass should add or update:

- provider-specific deployment config for frontend and backend
- environment docs that map real app variables to runtime usage
- root-level run/deploy documentation if the repo is consolidated
- CI workflow files only after build/test commands are accepted