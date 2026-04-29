# Post-share status + first-reply blockers

## 1. Router wiring missing
- **Affected route/view/state:** `src/App.tsx`, `/briefs/:slug/status`, `/briefs/:slug/replies`
- **Exact impact on shipment:** Users cannot navigate into the new post-share views because the routes are not registered in the app router.
- **Classification:** routing
- **Proposed fix:** Import `BriefStatusPage` and `BriefRepliesPage` in `App.tsx` and add route entries for both paths.

## 2. Draft store lacks post-share activity shape
- **Affected route/view/state:** `src/lib/briefDraftStore.ts`, local brief state used by status/replies
- **Exact impact on shipment:** The new views have no stable way to represent visit/reply state from local storage, so the core status → first reply journey cannot render consistently.
- **Classification:** data-shape
- **Proposed fix:** Extend the stored draft shape with optional prototype activity fields plus normalization and helper functions for reading/updating visit and first-reply state.

## 3. Success page has no forward path
- **Affected route/view/state:** `src/pages/BriefSuccessPage.tsx`, share-ready view
- **Exact impact on shipment:** The existing success screen is a dead end, so the prototype cannot demonstrate movement from share into the post-share slice.
- **Classification:** UX
- **Proposed fix:** Add a clear link from success to status and initialize local/mock activity needed for the next screens.

## 4. Status page may not handle missing data clearly
- **Affected route/view/state:** `src/pages/BriefStatusPage.tsx`
- **Exact impact on shipment:** If a brief is missing or not ready, users may land on an unclear screen instead of a calm recovery state, weakening the prototype handoff.
- **Classification:** validation
- **Proposed fix:** Ensure the page checks for missing data and shows a calm generic error state with a route back to create a brief.

## 5. Replies page needs explicit first-reply state
- **Affected route/view/state:** `src/pages/BriefRepliesPage.tsx`
- **Exact impact on shipment:** Even with navigation working, the endpoint of the flow will not demonstrate “first reply received” unless local/mock reply data is visibly rendered.
- **Classification:** state
- **Proposed fix:** Render a seeded local/mock first reply when available and retain a calm generic fallback state when it is not.