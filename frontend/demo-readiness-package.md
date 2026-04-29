# BriefLink Demo Readiness Package

## Accepted Inputs
- `components/brief-form.js`
- `components/brief-view.js`
- `lib/brief-text.js`
- `integration-handoff.md`

These accepted artifacts define the current create-brief shell, rendering behavior, and backend request/response handoff for the first demo slice.

## Flow Mapping

### 1) Create brief
- Entry module: `components/brief-form.js`
- User pastes source material into the textarea and submits.
- Frontend sends:
  - `POST /api/briefs`
  - body: `{ "sourceText": "..." }`
- Success path:
  - response returns `{ "briefText": "..." }`
  - `components/brief-view.js` renders the returned brief text into:
    - title
    - summary
    - highlights
    - next steps

### 2) Share
- Current status: demo-shell expectation only
- Share should begin only after brief generation succeeds.
- Minimum frontend handoff assumption:
  - the generated brief transitions to one clear share action
  - backend or app shell provides a stable share target, URL, or identifier

### 3) Recipient consumption
- Current status: reviewable shell expectation only
- Recipient opens the shared brief destination.
- Recipient view should render the same brief content structure in read-only form:
  - title
  - summary
  - highlights
  - next steps

## Screen Inventory

### Brief creation screen
Purpose:
- collect source text
- submit for generation
- show result in place

Core elements:
- textarea
- submit action
- status/message area
- result panel

### Share state or share screen
Purpose:
- expose the generated brief as shareable

Core elements:
- share action
- share target confirmation or displayed share link
- path to recipient destination

### Recipient read screen
Purpose:
- present the shared brief for reading only

Core elements:
- title
- summary
- highlights
- next steps

## State Inventory

### Create brief states
- Empty
  - placeholder result via `emptyStateMarkup()`
  - result class: `result empty`
- Loading
  - `processingMarkup()`
  - textarea disabled
  - submit disabled
  - status copy: `Generating brief...`
- Validation error
  - `Paste source material before generating a brief.`
- Request error
  - same message area
  - recommended copy: `Unable to generate brief. Please try again.`
- Success
  - `buildBriefMarkup(briefText)`
  - status copy: `Brief generated.`
  - result class: `result`

### Share states
- Unavailable before generation
- Ready after successful generation
- Error if share target cannot be created or loaded

### Recipient states
- Loading while shared brief resolves
- Unavailable / not found if shared brief cannot be opened
- Success when read-only brief content is rendered

## Acceptance Criteria
1. Creator can paste source material and generate a brief.
2. Create flow visibly handles empty, loading, error, and success states.
3. Generated brief renders in a calm readable structure using the existing renderer.
4. A share step is available only after successful brief generation.
5. Recipient can open a shared destination and read the brief.
6. Recipient experience is read-only for this demo slice.
7. Dynamic brief content remains escaped through `lib/brief-text.js` before HTML insertion.

## Minimum Gap Notes
- Share contract still needs one confirmed backend/app-shell output:
  - share URL, route, or share identifier
- Recipient destination still needs one confirmed stable route or screen owner.
- Recipient view should explicitly reuse the current rendering contract from `components/brief-view.js` rather than defining a second format.