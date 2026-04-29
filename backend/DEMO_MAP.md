# Backend Demo Map

## 1) MVP backend role in the demo flow
The backend provides the versioned API contract the frontend demo integrates against. In the MVP flow, the frontend first may call the health endpoint to confirm service availability, then submits a brief-generation request, and finally renders the returned `brief` object from the backend response envelope. The backend-owned responsibility in the demo is request validation, predictable response shapes, and returning a generated brief payload under `/api/v1`.

## 2) Exact frontend touchpoints
### Base URL / runtime assumptions
- Local backend base URL: `http://localhost:3000`
- All backend routes are versioned under `/api/v1`
- Contract source of truth: `workspace/backend/openapi.yaml`

### Health check
- Method: `GET`
- Path: `/api/v1/status`

Expected success shape: