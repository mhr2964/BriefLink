# BriefLink Engineering Demo Map

## MVP Flow
- Open create-brief UI.
- Paste source text.
- Submit to generate brief.
- Show loading state.
- Render returned brief.
- Present title, summary, highlights, next steps.

## Request + Trigger
- Module: `components/brief-form.js`
- Entry: `mountBriefForm(ids)`
- Trigger: `handleSubmit(event)` after `sourceNode.value.trim()` validation
- Request: `POST /api/briefs`
- Payload: `{ "sourceText": "..." }`

## State Handling
- Empty: `emptyStateMarkup()`
- Loading: `processingMarkup()`, disable textarea + submit, `Generating brief...`
- Validation error: `Paste source material before generating a brief.`
- Request error: `Unable to generate brief. Please try again.`
- Success: response `{ "briefText": "..." }`, status `Brief generated.`

## Render Path
- Renderer: `components/brief-view.js`
- Call: `buildBriefMarkup(briefText)`
- Safety helper: `lib/brief-text.js`

## Frontend-Only Gaps
- Wire `POST /api/briefs` into `handleSubmit(event)`.
- Confirm failure response shape for error display.
- Confirm success field stays `briefText`.
- Reuse one renderer; do not add a second brief format.