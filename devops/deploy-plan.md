# BriefLink Deploy Plan

## Planned targets

- Frontend host target: Vercel
- Preview frontend: `https://brieflink-preview.vercel.app`
- Public frontend: `https://app.brieflink.app`
- API origin: `https://api.brieflink.app`

All values above are planning-only placeholders. Provisioning, DNS, env injection, and runtime execution are unverified.

## Config wiring assumptions

- Preview builds should use `https://brieflink-preview.vercel.app`
- Production builds should use `https://app.brieflink.app`
- Client API requests are assumed to use `https://api.brieflink.app`

These assumptions are documentation only until actual hosting is confirmed.

## Local validation

1. Copy `workspace/devops/.env.example` to the root env file used by the app.
2. Replace placeholders with real local values where needed.
3. Install dependencies from the repository root.
4. Start the app locally from the repository root.

## Deployment steps

1. Connect the repo to Vercel.
2. Add preview and production environment variables.
3. Inject the planned frontend URLs and API origin into the correct environments.
4. Deploy.
5. Validate routing and app behavior only after provisioning exists.

## Verification boundary

This document does not prove that Vercel, DNS, certificates, secrets, or app execution are live. It only records the approved planning placeholders.