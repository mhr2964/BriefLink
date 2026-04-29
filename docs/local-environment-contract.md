# BriefLink Local Environment Contract

This is the current platform-owned local baseline for shared app/API work.

## Runtime expectations
- **Node.js:** use a current LTS release
- **Package manager:** npm
- **Frontend:** Vite app in `workspace/frontend`
- **Backend:** Express app in `workspace/backend`

## Canonical local ports
- **Frontend:** `5173`
- **Backend/API:** `4000`

If a team changes either port, they must update this contract and notify ui-integration and parity-qa.

## Canonical API base URL
Frontend-to-backend local traffic should target:

- `http://localhost:4000`

Use this as the default local API origin for integration, QA, and handoff docs.

## Startup order
1. Install backend dependencies in `workspace/backend`
2. Install frontend dependencies in `workspace/frontend`
3. Start the backend first on port `4000`
4. Start the frontend second on port `5173`
5. Open the frontend in browser and confirm it can reach the backend base URL above

## Minimum local setup
### Backend
- working directory: `workspace/backend`
- install: `npm install`
- run: use the package script defined in `backend/package.json`

### Frontend
- working directory: `workspace/frontend`
- install: `npm install`
- run: use the package script defined in `frontend/package.json`

## Environment variable convention
Use the shared template in `workspace/docs/env-template.md`.

Current local defaults:
- `NODE_ENV=development`
- `PORT=4000`
- `BACKEND_PORT=4000`
- `FRONTEND_PORT=5173`
- `API_BASE_URL=http://localhost:4000`
- `VITE_API_BASE_URL=http://localhost:4000`

## Team handoff instructions

### frontend
- Treat `http://localhost:4000` as the default backend origin for local work.
- If the app uses a different env var name or proxy pattern, document the mismatch and align to this contract or request a platform revision.

### backend
- Keep the local API listener on `4000` unless a coordinated change is approved.
- Document any required env vars beyond those listed in `env-template.md`.
- Surface any CORS requirements that would block requests from `http://localhost:5173`.

### ui-integration
- Use this document as the authoritative local wiring baseline.
- Validate that frontend requests resolve against `http://localhost:4000`.
- Escalate any mismatch between actual code behavior and this contract.

### parity-qa
- Use this contract for reproducible local verification.
- Record failures as one of: setup issue, env mismatch, connectivity issue, or product bug.

## Current contract limits
This contract defines the shared local baseline only. It does **not** yet guarantee:
- one-command concurrent startup
- production/staging secrets
- finalized deploy environment naming