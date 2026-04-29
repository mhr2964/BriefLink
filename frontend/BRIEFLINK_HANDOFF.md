# BriefLink Final Handoff

## 1) Route map and screen inventory
- `/briefs/new` — compose screen for creating a brief with fields for title, audience, objective, key points, call to action, and slug.
- `/briefs/:slug/confirm` — review screen that shows the saved draft and serves as the confirm/share action before the brief is considered share-ready.
- `/briefs/:slug/success` — success/share state with the primary `Copy link` CTA and a secondary `Open brief` action.
- `/b/:slug` — public read-view that renders only ready briefs from local/mock state.
- Global navigation includes a direct path into `/briefs/new` so the create-and-share slice is reachable from the prototype shell at all times.

## 2) State/storage strategy for compose -> confirm -> success -> public-read
- The flow is frontend-only and uses browser `localStorage` under a prototype-specific key.
- Compose saves a local draft record containing all form fields, the resolved slug, generated share URL, timestamps, and a `draft` status.
- Confirm reads the saved draft by slug from local storage and advances it to `ready` when the user triggers confirm/share.
- Success reads the same locally saved brief and presents the share-ready state after confirm/share.
- Public read fetches from the same local/mock store and renders only briefs with `ready` status.
- No backend request, publish API, or server persistence is involved in the current slice.

## 3) Validation rules and enforcement points
- Required fields on compose: title, audience, objective, key points, call to action, and slug.
- Validation is enforced on compose submit before navigation to confirm.
- Empty required fields generate inline field errors and set `aria-invalid` on the corresponding input or textarea.
- A summary error banner appears above the form when validation fails.
- Slug input is normalized before save, so the persisted value is always deterministic and safe for route use.
- Confirm, success, and public-read do not re-validate authoring fields; they validate existence of the locally stored brief and, for public-read, readiness state.

## 4) Slug generation/editability and link preview behavior
- Slug generation is deterministic: lowercase, trimmed, non-alphanumeric groups replaced with hyphens, and leading/trailing hyphens removed.
- If the user has not manually edited the slug, title changes automatically update the slug.
- The slug remains editable by the user on compose.
- If the normalized slug would otherwise be empty, it falls back to `untitled-brief`.
- Initial save resolves collisions by suffixing with incrementing numerals to keep local slugs unique.
- Compose shows a live link preview derived from the current slug/title state before save.
- Saved records also store a computed share URL based on the resolved slug.

## 5) Copy-link CTA implementation notes
- The success route is the primary share state.
- The primary CTA is labeled `Copy link`, matching the locked contract.
- In the current prototype, `Copy link` is UI-present but does not call the Clipboard API.
- This is intentional and disclosed in-product as a prototype integration seam.
- The secondary action `Open brief` navigates to the public read-view at `/b/:slug`.

## 6) Generic error-state triggers
- Confirm shows a generic empty/error state when no locally stored draft exists for the requested slug.
- Success shows a generic empty/error state when no locally stored brief exists for the requested slug.
- Public read shows a generic empty/error state when the slug is unknown or when the brief exists but is not yet `ready`.
- Error copy is intentionally generic and calm rather than exposing technical storage details beyond noting local/mock prototype behavior.
- These states support unknown slugs, cleared browser storage, and direct deep-links into incomplete flow steps.

## 7) Known limitations / non-blocking divergences
- `Copy link` is not wired to the Clipboard API yet.
- No analytics SDK is connected, even though funnel state mapping is defined.
- No backend persistence, publishing, authentication, or reply collection exists in this slice.
- Data survives only as long as local browser storage remains available.
- Public read reflects local state on the same browser rather than a shared backend source.
- Success is a frontend route/state transition rather than a backend-confirmed published resource.
- These are non-blocking for the accepted frontend-only additive prototype.

## 8) Explicit backend integration seams
- Replace local storage draft save with backend brief creation/persistence.
- Replace local ready-state transition on confirm/share with a publish/share API call.
- Replace local share URL generation with backend-owned canonical link issuance if required.
- Implement real clipboard behavior for the `Copy link` CTA.
- Add analytics event emission for visit, brief-created, brief-shared, reply-received, and account-converted.
- Add reply receipt handling so the public/read flow can connect to downstream funnel stages.
- Add account conversion handling tied to the canonical analytics funnel.
- Add shared retrieval so `/b/:slug` loads from backend data rather than same-browser local state.

## Final parity classification

### 1) Fully met contract items
- `/briefs/new` exists and supports the required compose fields.
- `/briefs/:slug/confirm` exists and functions as the confirm/share step rather than incorrectly acting as the final share state.
- `/briefs/:slug/success` exists and is the primary share-ready state.
- `/b/:slug` exists and is navigable as the public read-view.
- The flow is navigable end-to-end with deterministic slug handling and local/mock state.
- Generic missing-data and unknown-slug handling is present on confirm, success, and public read.
- Validation and clear error affordances are present on compose.
- The confirm/share parity divergence called out by management has been corrected in-product.

### 2) Blocking divergences
- None currently identified against the locked frontend-only prototype contract.

### 3) Non-blocking divergences
- `Copy link` is not yet functionally connected to clipboard operations.
- Analytics are documented conceptually but not emitted.
- Persistence and publish behavior remain local/mock rather than backend-driven.
- Public read is only available for briefs marked `ready` in the same browser storage context.

### 4) Final recommended status
- Accepted as complete for the locked frontend-only additive prototype slice.
- Recommended next phase is backend integration and instrumentation, not additional frontend parity work.