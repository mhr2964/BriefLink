# MVP Path
Create brief -> review generated brief -> share handoff -> recipient consumption.
Frontend covers source-text entry, submit/loading/error states, and rendering the generated brief.
Review/share and recipient steps stay thin and reuse the same brief content format.

# Confirmed Touchpoints
- `POST /api/briefs`
- Request: `{ "sourceText": "..." }`
- Success response: `{ "briefText": "..." }`
- Frontend renders returned `briefText` in the current brief view
- Current rendered sections: title, summary, highlights, next steps

# Unresolved Gaps
- Create error response shape is not confirmed
- Share contract is not confirmed: endpoint, payload, response
- Recipient contract is not confirmed: direct payload vs token/id retrieval
- Recipient payload shape must match current brief renderer input