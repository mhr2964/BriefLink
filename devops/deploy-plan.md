# BriefLink Deploy Plan

## Scope
This plan reflects the real workspace layout currently on disk:

- a frontend directory with both static prototype files and a React-style `src/` app
- a backend directory with a Node service, route/service split, and API contract files
- separate `package.json` files in `workspace/frontend/` and `workspace/backend/`

## Current artifact map

### Frontend artifacts
Primary frontend files currently present:
- `workspace/frontend/package.json`
- `workspace/frontend/index.html`
- `workspace/frontend/style.css`
- `workspace/frontend/app.js`
- `workspace/frontend/src/main.jsx`
- `workspace/frontend/src/App.jsx`
- `workspace/frontend/src/styles.css`

Supporting UI modules:
- `workspace/frontend/components/brief-form.js`
- `workspace/frontend/components/brief-view.js`
- `workspace/frontend/lib/brief-delay.js`
- `workspace/frontend/lib/brief-text.js`

Product handoff documents:
- `workspace/frontend/mvp-acceptance-criteria-by-step.md`
- `workspace/frontend/mvp-core-flow-spec.md`
- `workspace/frontend/mvp-prototype-priorities.md`
- `workspace/frontend/mvp-screen-state-inventory.md`

### Backend artifacts
Primary backend files currently present:
- `workspace/backend/package.json`
- `workspace/backend/README.md`
- `workspace/backend/openapi.yaml`
- `workspace/backend/brief-schema.json`
- `workspace/backend/src/index.js`
- `workspace/backend/src/app.js`

Backend route/service modules:
- `workspace/backend/src/routes/status.js`
- `workspace/backend/src/routes/briefs.js`
- `workspace/backend/src/services/brief-generator.js`

## Deployment interpretation
The current layout suggests two deployable surfaces:

1. **Frontend app surface**
   - static assets and/or bundled React client
   - deploy target likely to be a static host or frontend web platform

2. **Backend API surface**
   - Node-based HTTP service
   - deploy target likely to be a managed app host, container host, or serverless-compatible runtime if adapted

## Contract source of truth
For frontend/backend integration and deploy validation, treat these backend files as canonical contract references:

- `workspace/backend/openapi.yaml`
- `workspace/backend/brief-schema.json`

Any environment, routing, proxy, or API gateway configuration created later should align with those files.

## Release packaging recommendation
Until a final root repo structure is chosen, package and document the app as two sibling services:

- `frontend/` = client package
- `backend/` = API package

That means future deployment artifacts should be written with clear per-surface ownership:
- frontend build/start assumptions attached to `workspace/frontend/`
- backend build/start assumptions attached to `workspace/backend/`

## Suggested next artifact additions
These are the next repo-hardening files to add once hosting decisions are approved:

### Frontend
- hosting config for the chosen frontend platform
- environment template documenting client-safe public variables
- deployment note clarifying whether `index.html` top-level prototype remains deployable or is superseded by the React app

### Backend
- hosting config or container definition for the Node service
- environment template for server secrets and API configuration
- release note tying deployed endpoints back to `openapi.yaml`

### Shared repo layer
- root README if the project is consolidated into a single clone/run entry point
- CI workflow files only after exact install/build/test commands are accepted
- preview/production environment mapping documentation

## Open decisions not to invent
This plan intentionally does not guess:
- whether the deployed frontend is the static prototype or the React app
- whether frontend and backend deploy to one platform or two
- whether the backend runs as a long-lived Node service or is adapted to functions
- exact build/start commands beyond what the package manifests will eventually define

## Minimal release checklist
1. Confirm which frontend artifact path is canonical for deployment
2. Confirm backend runtime target for the Node service
3. Confirm environment variable inventory for frontend and backend
4. Confirm production API base URL wiring
5. Confirm that contract docs match deployed endpoints
6. Add provider-specific config files only after those decisions are approved

## Verification focus for the next pass
When release configs are added, verify that:
- frontend hosting points at the intended frontend package boundary
- backend hosting points at the Node service package boundary
- no secrets are documented in client-exposed config
- contract files remain synchronized with live API expectations
- docs distinguish prototype artifacts from the production deployment target