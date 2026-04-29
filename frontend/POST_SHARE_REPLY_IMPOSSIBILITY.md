# Post-share status + first-reply impossibility statement

## 1. Exact remaining blocker(s)
1. `src/App.tsx` does not register the creator-facing routes `/briefs/:slug/status` and `/briefs/:slug/replies`.
2. `src/lib/briefDraftStore.ts` does not export the minimal local/mock helpers `getPrototypeSignals` and `submitFirstReply`.
3. `src/pages/BriefSuccessPage.tsx` does not expose a visible navigation path from the share-success state into `/briefs/:slug/status`.

## 2. Where each blocker appears in the current flow/code
1. **Router gap in `src/App.tsx`:** the route table currently mounts home, items, compose, confirm, success, and public brief views, so the intended creator post-share status and replies screens are unreachable by URL.
2. **Store contract gap in `src/lib/briefDraftStore.ts`:** the store currently supports draft persistence, slug/share URL generation, and ready-state updates, but it does not provide the prototype read/write contract needed for reply-status signals or first-reply submission.
3. **Flow gap in `src/pages/BriefSuccessPage.tsx`:** the success screen currently stops at share-link actions and public brief access, so the creator journey has no visible continuation into status tracking after the brief is marked ready.

## 3. Why each cannot be resolved within the current frontend-only scope
1. **`src/App.tsx` blocker:** resolving it requires adding routes in application code, but this round is limited to producing the decision-ready impossibility artifact rather than modifying runtime files.
2. **`src/lib/briefDraftStore.ts` blocker:** resolving it requires extending the local store contract and persistence logic, which is implementation work outside the current documentation-only assignment.
3. **`src/pages/BriefSuccessPage.tsx` blocker:** resolving it requires UI code changes to add the missing forward action, which is also outside the current documentation-only scope.

## 4. Minimal dependency, contract change, or scope reduction required to unblock shipment
- **Minimal unblock path:** authorize one narrow frontend implementation pass covering exactly:
  - `workspace/frontend/src/App.tsx`
  - `workspace/frontend/src/lib/briefDraftStore.ts`
  - `workspace/frontend/src/pages/BriefSuccessPage.tsx`
- **Required changes in that pass:**
  - register `/briefs/:slug/status` and `/briefs/:slug/replies`
  - export `getPrototypeSignals` and `submitFirstReply` in the shape expected by the existing status/replies pages
  - add a visible success-page action into `/briefs/:slug/status`
- No backend dependency is required for the prototype version if local/mock state remains acceptable.

## 5. Whether a degraded but still useful version could ship under narrowed scope
- **Yes.**
- A degraded but useful slice could ship if scope is narrowed to:
  - create brief
  - confirm/share brief
  - open the public brief link
- Under that narrowed scope, creator post-share status, replies, and first-reply submission must be explicitly removed from shipment claims and acceptance criteria.