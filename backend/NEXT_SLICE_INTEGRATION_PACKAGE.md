# Next Slice Integration Package
## Current additive frontend slice reference
This package supports the current additive frontend slice that needs a repo-agnostic path from local/mock note state to later backend-backed persistence without changing the frontend consumer interface. The proposed domain for this seam is **user-scoped notes**.

## 1) Proposed API / storage contract

### Versioning and ownership
- All external-facing routes are versioned under `/api/v1`.
- Notes are user-scoped resources.
- Backend derives the effective user from auth/session/token context.
- Client must not send or control `userId` in request body, query, or path.

### Proposed routes
- `GET /api/v1/notes`
- `POST /api/v1/notes`
- `GET /api/v1/notes/{id}`
- `PATCH /api/v1/notes/{id}`
- `DELETE /api/v1/notes/{id}`

### Canonical note resource