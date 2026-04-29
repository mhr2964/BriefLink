# BriefLink Demo Walkthrough Package

## Scope
Thin MVP walkthrough only: create brief -> review/share -> recipient consumption. Grounded in landed frontend artifacts for brief form and brief view.

## Screen Order
1. Create Brief
2. Review + Share
3. Recipient View

## Create Brief
- User actions: open create screen, paste source text, submit.
- Data in: user source text.
- Data out: `POST /api/briefs` with `{ "sourceText": "..." }`.
- Success: loading state, then response `{ "briefText": "..." }`.
- Error: empty-input validation or generic request failure.
- Backend confirm: endpoint stays `POST /api/briefs`; request/response fields stay `sourceText` and `briefText`; error shape is stable if frontend should show detail.

## Review + Share
- User actions: review generated brief, choose share, confirm recipient.
- Data in: `briefText` rendered through existing brief-view flow; recipient identifier.
- Data out: render path uses current structured brief format; assumed share payload `{ "briefText": "...", "recipient": "..." }`.
- Success: title/summary/highlights/next steps render cleanly; share confirmation appears; brief remains visible.
- Error: malformed `briefText` cannot render reliably; share failure shows retry without losing brief state.
- Backend confirm: share endpoint path, payload, and response contract; recipient identifier format; no transform needed beyond current brief format.

## Recipient View
- User actions: open shared brief, read content.
- Data in: shared brief payload or backend-fetched equivalent using the same brief structure.
- Data out: none beyond presentation.
- Success: recipient sees title, summary, highlights, next steps.
- Error: retrieval failure shows unavailable/error state instead of empty content.
- Backend confirm: retrieval method is direct payload vs token/id fetch; returned content shape matches current brief renderer.