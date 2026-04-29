# Post-share status + first-reply slice brief

## 1) Exact slice target
Add a calm, additive creator-facing follow-up slice after the existing share-success state so the prototype can demonstrate what happens after `/briefs/:slug/success`: a lightweight status view and a first-reply visibility view, without changing the established compose, confirm, success, or public-read contract.

## 2) Routes, views, and components to add or modify
- Modify `/briefs/:slug/success` to include a next-step path into post-share tracking.
- Add `/briefs/:slug/status` as the creator-facing post-share status view.
- Add `/briefs/:slug/replies` as the creator-facing first-reply visibility view.
- Modify app routing in `src/App.tsx` to register the two additive routes.
- Extend `src/lib/briefDraftStore.ts` with minimal local/mock reply metadata helpers used by the new views.

## 3) State/storage approach
Use the existing browser `localStorage` draft store and extend each saved brief record with optional prototype-only fields for post-share tracking, specifically whether the brief has been visited and whether a first reply has been received. Keep storage reads/writes normalized through the existing store helpers so the baseline routes continue to work unchanged.

## 4) Mock data and local-only assumptions
- The slice remains frontend-only and same-browser only.
- No backend polling, webhook, inbox, or analytics client is added.
- `visit`, `brief-created`, `brief-shared`, and `reply-received` are represented as prototype states/notes in the UI.
- `account-converted` remains assumed and is intentionally not implemented.
- A simple local/mock transition will mark the brief as visited and first reply received so the status and replies views are demonstrable end-to-end.

## 5) Concrete acceptance criteria for shipped status
- Existing routes remain intact: `/briefs/new`, `/briefs/:slug/confirm`, `/briefs/:slug/success`, and `/b/:slug`.
- `/briefs/:slug/success` still shows the share-ready state and now includes a clear path to `/briefs/:slug/status`.
- `/briefs/:slug/status` loads the selected local brief, shows post-share lifecycle visibility, and links to `/briefs/:slug/replies`.
- `/briefs/:slug/replies` loads the selected local brief and renders a calm first-reply state when local/mock reply data exists.
- Unknown or missing local data on the new routes returns the same style of generic, calm empty/error handling used elsewhere in the prototype.
- The prototype explicitly notes that post-share activity is represented through local/mock state only.