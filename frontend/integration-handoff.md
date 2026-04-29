# Frontend Integration Handoff

## Trigger
- Module: `components/brief-form.js`
- Entry: `mountBriefForm(ids)`
- Request belongs in `handleSubmit(event)` after `sourceNode.value.trim()` passes empty-input validation.

## Request Contract
- Method: `POST`
- Endpoint: `/api/briefs`
- Header: `Content-Type: application/json`
- Body: