# Activated Brief Monitoring

## Screen / Route List
- `brief` — existing draft/share screen remains the entry point
- `monitoring` — additive activated brief monitoring screen shown after share or via explicit entry action
- Route wiring stays local in `src/App.tsx` for the prototype slice

## End-to-End User Flow
1. User lands on the existing brief experience.
2. User shares or revisits a brief that is already in a shared state.
3. User selects the monitoring entry action.
4. App navigates to the activated brief monitoring screen.
5. User reviews overview details, engagement signals, recent activity, and recommended next steps.
6. User can return to the prior brief screen without losing the additive prototype state.

## Required State Transitions
- Existing draft state remains intact.
- Brief route changes from `brief` to `monitoring` when the user opens monitoring.
- Route changes from `monitoring` to `brief` when the user exits monitoring.
- Local/mock store exposes activated monitoring data for a shared brief.
- Monitoring view reads derived summary, metrics, activity, and recommendations from local state only.

## Empty / Loading / Error States
- Empty: if monitoring data is unavailable, render a calm empty state explaining that engagement signals will appear after sharing.
- Loading: not required for this slice because data is local/mock and immediately available.
- Error: not required for this slice because there is no network request; avoid crashy rendering when optional monitoring fields are missing.

## Shipment Criteria
- `workspace/frontend/src/App.tsx` includes additive route wiring for the monitoring screen.
- `workspace/frontend/src/lib/briefDraftStore.ts` includes local/mock activated monitoring state.
- Monitoring UI lives under `workspace/frontend/src/` and renders overview, metrics, recent activity, and next steps.
- Existing prototype flow remains usable.
- The slice is calm in tone and contains no backend dependency.