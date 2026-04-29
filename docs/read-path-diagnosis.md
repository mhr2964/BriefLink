# Read Path Diagnosis

## Diagnosis

The ui-integration read failures are **not caused by missing files in the current workspace tree**.

The reported paths are visibly present and readable in the workspace snapshot, including:
- `workspace/frontend/src/App.tsx`
- `workspace/frontend/src/lib/adapters.ts`
- `workspace/frontend/src/pages/BriefComposePage.tsx`
- `workspace/backend/src/app.js`
- `workspace/backend/src/routes/briefs.js`

Based on visible evidence, the most likely failure mode is **tooling-context/path-form misuse**, with a secondary possibility of **scope-relative path aliasing** during file reads.

## Why this is the likely cause

### 1. The files exist
The current workspace tree shows the frontend and backend integration files in place under `workspace/...`. This rules out a pure “missing file” explanation for the escalation.

### 2. Prior read failures already showed scope/path issues
Visible board evidence includes:
- `worker → all (file_write): read injected: 0 of 1 requested file resolved (0 bytes total) — 1 not found / out of scope.`
- several warnings where attempted writes failed as **out of scope**

This pattern indicates the system is sensitive to exact path roots and allowed workspace scope.

### 3. The failed path examples were reported without the `workspace/` prefix
The escalation cited path forms like:
- `frontend/src/App.tsx`
- `frontend/src/lib/adapters.ts`

But the visible canonical tree is rooted at:
- `workspace/frontend/src/App.tsx`
- `workspace/frontend/src/lib/adapters.ts`

That strongly suggests the read request may have been made relative to the wrong root.

## What this is not

### Not a stale workspace tree
The current snapshot includes the expected files, and recent writes are reflected in the tree. There is no visible evidence that the workspace listing is outdated relative to the reported integration targets.

### Not a permissions failure on those files specifically
No board evidence shows access denied on the existing frontend/backend source files. The visible failures are framed as path-resolution / out-of-scope issues rather than OS-level permission problems.

### Not path absence in the repo
The files named by ui-integration are present now in the canonical workspace tree.

## Correct readable path forms

Use workspace-rooted paths exactly as listed in the visible tree, for example:

### Frontend
- `workspace/frontend/src/App.tsx`
- `workspace/frontend/src/lib/adapters.ts`
- `workspace/frontend/src/lib/mockAdapters.ts`
- `workspace/frontend/src/pages/BriefComposePage.tsx`
- `workspace/frontend/src/pages/BriefConfirmPage.tsx`
- `workspace/frontend/src/pages/BriefSuccessPage.tsx`

### Backend
- `workspace/backend/src/app.js`
- `workspace/backend/src/index.js`
- `workspace/backend/src/routes/briefs.js`
- `workspace/backend/src/routes/status.js`

### Platform docs
- `workspace/docs/local-environment-contract.md`
- `workspace/docs/env-template.md`
- `workspace/docs/environment-status-report.md`

## Likely incorrect path forms

These are the forms most likely to fail in integration review tooling:

- `frontend/src/App.tsx`
- `backend/src/app.js`
- `docs/local-environment-contract.md`

Potentially incorrect if the tool expects workspace-rooted reads:
- `/frontend/src/App.tsx`
- `./frontend/src/App.tsx`
- `companies/untitled-1/workspace/frontend/src/App.tsx`

The visible evidence supports using the normalized `workspace/...` form in requests.

## Remediation steps

1. **Always request reads using `workspace/...` paths**
   - Example: `workspace/frontend/src/App.tsx`
   - Do not omit the `workspace/` prefix.

2. **Match the tree exactly**
   - Preserve directory names and case exactly as shown.
   - Example: `App.tsx` is not the same as `app.tsx`.

3. **Use file paths, not repo-assumed aliases**
   - Do not rely on package-relative shortcuts like `frontend/...` unless the tool explicitly confirms that root.

4. **Verify against the latest workspace tree before escalating**
   - If a file appears in the tree, retry using the exact `workspace/...` path first.

5. **Separate read-path issues from write-scope issues**
   - “Out of scope” on write attempts does not mean the file is missing.
   - It usually means the caller’s allowed write scope differs from the canonical workspace location.

6. **For integration review, use this reliable read set first**
   - `workspace/frontend/src/App.tsx`
   - `workspace/frontend/src/lib/adapters.ts`
   - `workspace/frontend/src/pages/BriefComposePage.tsx`
   - `workspace/backend/src/app.js`
   - `workspace/backend/src/routes/briefs.js`

## Prescriptive note for teams

For reliable integration review, treat the workspace tree shown on the board as the source of truth and request files using the exact `workspace/...` path printed there. If a read fails on a file that is visibly present, retry with the canonical workspace-rooted path before concluding the file is missing.