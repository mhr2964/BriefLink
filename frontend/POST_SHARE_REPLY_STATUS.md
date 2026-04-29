# Post-share status + first-reply status

## Current status
- **not shippable within current scope**

## Completed blocker closures
- `src/App.tsx` registers `/briefs/:slug/status` and `/briefs/:slug/replies`.
- `src/lib/briefDraftStore.ts` exports minimal local/mock `getPrototypeSignals` and `submitFirstReply` support for post-share pages, including validation/error return behavior.
- `src/pages/BriefSuccessPage.tsx` now provides a visible path into `/briefs/:slug/status`.

## Exact remaining blocker(s)
- The existing `BriefStatusPage.tsx` and `BriefRepliesPage.tsx` implementations were not part of the allowed files for this pass, and their current import/signature expectations could not be verified or remediated here.
- Because those pages are the actual consumers of the newly added store helpers and the actual surfaces behind the newly registered routes, end-to-end shipment of `success → status → replies → first reply submission` cannot be confirmed or completed frontend-only within the current file scope.

## Why this cannot be resolved frontend-only in the current track
- The manager restricted this pass to three blocker files plus the status artifact.
- If either existing page expects different helper names, different return shapes, or missing UI wiring, the slice will still fail despite the router/store/success changes now being present.
- Resolving that risk requires direct inspection and, if needed, patching of `src/pages/BriefStatusPage.tsx` and/or `src/pages/BriefRepliesPage.tsx`, which is outside the current allowed scope.

## Dependency / scope change required
- Expand allowed frontend scope to include `workspace/frontend/src/pages/BriefStatusPage.tsx` and `workspace/frontend/src/pages/BriefRepliesPage.tsx` for compatibility verification and any minimal follow-up wiring needed to complete the end-to-end prototype flow.