# Post-share status + first-reply shipment note

## Blockers closed
- Router wiring missing — closed by registering `/briefs/:slug/status` and `/briefs/:slug/replies` in `src/App.tsx`.
- Draft store lacks post-share activity shape — closed by adding normalized local/mock first-reply state and exported helpers in `src/lib/briefDraftStore.ts`.
- Success page has no forward path — closed by linking the success state into the status screen and resetting the local/mock reply state for the prototype flow.
- Status page may not handle missing data clearly — closed by keeping a calm generic error state when the brief is missing or not ready.
- Replies page needs explicit first-reply state — closed by providing a prototype reply composer, submission feedback, and visible first-reply rendering.

## Blockers remaining
- none

## Shipment status
- shipped