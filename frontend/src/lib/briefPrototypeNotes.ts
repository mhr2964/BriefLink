export const BRIEF_LINK_BOARD_NOTE = {
  routeMap: [
    '/briefs/new — compose screen with required fields, deterministic slug normalization, validation summary, and local/mock save',
    '/briefs/:slug/confirm — review + confirm/share action before marking the brief ready',
    '/briefs/:slug/success — success state with primary “Copy link” CTA and secondary “Open brief” action',
    '/b/:slug — public read-view for ready briefs, with generic unknown-slug empty/error handling',
  ],
  stateStrategy: [
    'Drafts persist in browser localStorage under a prototype-only key',
    'Slug normalization is deterministic via lowercase + hyphenation',
    'Slug collisions are resolved by numeric suffixing on initial create',
    'Confirm transitions local state from draft to ready without backend calls',
  ],
  validationBehavior: [
    'Required fields: title, audience, objective, key points, call to action, slug',
    'Invalid fields receive inline error copy and aria-invalid markers',
    'Submit with errors shows a summary banner instead of navigating forward',
    'Missing draft or unknown slug returns generic calm empty/error messaging',
  ],
  analyticsFunnelMapping: [
    'visit -> entering /briefs/new or /b/:slug',
    'brief-created -> successful local draft save from compose',
    'brief-shared -> confirm/share action marking the brief ready; activation occurs here',
    'reply-received -> not implemented in frontend-only prototype; reserved integration seam',
    'account-converted -> not implemented in frontend-only prototype; reserved integration seam',
  ],
  remainingIntegrationSeams: [
    'No real clipboard integration; “Copy link” is UI-only in this prototype',
    'No backend persistence or publish API; ready state is local/mock only',
    'No analytics SDK wired; funnel mapping is documented but not emitted',
    'No real recipient reply flow or account conversion handling in current scope',
  ],
} as const;