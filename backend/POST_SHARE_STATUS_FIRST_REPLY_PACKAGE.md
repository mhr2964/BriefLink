# Post-Share Status + First-Reply Integration Package

## Current additive frontend slice reference
This package supports the current additive frontend slice that needs to show post-share brief status and accept a first recipient reply using local/mock state now, then later cut over to real backend APIs without changing the frontend consumer interface. The domain name for this seam is `shareStatus`.

## 1) Proposed API / storage contract

### Versioning and ownership
- All external-facing routes are versioned under `/api/v1`.
- This slice covers:
  - fetching post-share status for a shared brief
  - creating the first recipient reply on that shared brief
- Share status is addressed by backend-issued share access context.
- Client must not send owner account identifiers.
- Backend determines authorization from share token/session/access context.

### Proposed routes
- `GET /api/v1/share-status/{shareId}`
- `POST /api/v1/share-status/{shareId}/reply`

### Minimal shared brief model