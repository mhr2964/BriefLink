## Revision

**Audited artifacts**
- `src/App.tsx`
- `src/ActivatedBriefStatusView.tsx`
- Existing frontend board digest contract notes

**Key deltas found**
- Home CTA labels blurred three different intents: opening the shared brief, opening share-status, and opening reply monitoring.
- The visible status screen exposed prototype-only state toggles for ready/loading/empty/error, which created internal-demo affordances in an end-user-facing surface.

**Additive changes made**
- Updated home CTA copy to: `Open shared brief`, `Open share status`, and `Open reply monitoring`.
- Removed the visible status-state toggle control from `ActivatedBriefStatusView` while preserving the internal ready/loading/empty/error rendering paths and retry hook.
- Kept the calm activation, live-link, empty, loading, and error presentation structure intact.

**Blockers**
- None in frontend scope for this coherence pass.