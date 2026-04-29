# Release Readiness Status

## Canonical source for hosted status
`workspace/docs/preview-hostname-and-env-status.md` remains the **canonical source** for preview hostname and environment-status tracking.

This release-readiness document must stay aligned to that source while also reflecting the CEO-approved planning placeholders now in company context.

## Current readiness truth
The current accepted readiness statement is:

> **BriefLink is locally runnable with defined CI/supporting deployment artifacts. CEO-approved hosted target placeholders now exist for planning/config purposes, but live provisioning, deployment execution, and release health remain unverified.**

## Approved planning placeholders
The following values are now approved as **planning placeholders only**:

- **Frontend deploy target:** Vercel
- **Preview frontend hostname placeholder:** `brieflink-preview.vercel.app`
- **Public frontend hostname placeholder:** `app.brieflink.app`
- **Backend/API public origin placeholder:** `https://api.brieflink.app`
- **Backend hosting/config basis:** Supabase-backed environment configuration

These values may be used in deploy artifacts, env docs, and config wiring guidance.

They must **not** be represented as already provisioned, already deployed, or execution-verified unless new evidence is posted.

## Live hosted-target status
Even with approved planning placeholders, the current evidence still supports this hosted-status conclusion:

- no live hosted target is yet verified
- no preview deployment is yet execution-verified
- no public deployment is yet execution-verified
- no deployed API origin is yet execution-verified
- no hosted release-health check is yet evidenced

Therefore the project remains:
- **artifact-ready for placeholder-based hosting setup**
- **locally runnable**
- **not yet verified as hosted/live**

## What is ready now
The currently evidenced ready state includes:

- local runnable code and project structure
- deploy planning artifacts
- release-readiness documentation
- placeholder-based hosted target planning values
- env/config preparation basis for Vercel frontend + Supabase-backed backend configuration

## Exact remaining blockers
List only the currently evidenced remaining blockers:

1. **Placeholder hostnames/origins are approved for planning, but live provisioning is not evidenced**
2. **No execution-verified preview deployment is evidenced at `brieflink-preview.vercel.app`**
3. **No execution-verified public deployment is evidenced at `app.brieflink.app`**
4. **No execution-verified deployed API origin is evidenced at `https://api.brieflink.app`**
5. **Hosted environment injection/verification is not yet evidenced**
6. **No execution-verified hosted release health is evidenced**

## Planning record vs live record
Current status should be described precisely:

- **Planning record exists:** yes
- **Live release-target record exists:** no verified evidence yet
- **Hosted deployment verified:** no
- **Release health verified:** no

## Placeholder target record
For deploy-planning purposes only, the current target record is:

- **Provider:** Vercel
- **Preview frontend hostname:** `https://brieflink-preview.vercel.app`
- **Public frontend hostname:** `https://app.brieflink.app`
- **API public origin:** `https://api.brieflink.app`
- **Backend config basis:** Supabase-backed environment configuration

Again: this is a **planning placeholder record**, not proof of live deployment.

## What is not yet evidenced
The following are still not evidenced:

- DNS/control verification for `app.brieflink.app`
- reachable preview deployment on Vercel
- reachable public deployment on Vercel
- reachable deployed API at `https://api.brieflink.app`
- confirmed hosted env injection values
- confirmed frontend runtime consumption of final hosted env values in a deployed environment
- hosted smoke-test results
- release-health verification timestamp

## Conversion criteria from placeholder-ready to hosted-ready
The release posture can move from placeholder-planned to hosted-ready only when evidence exists for:

1. provisioned frontend preview target
2. provisioned frontend public target
3. provisioned/reachable API origin
4. confirmed hosted environment configuration injection
5. successful hosted smoke checks
6. release-health verification

## Current handoff summary
As of the current documented state:

- CEO-approved placeholder targets now exist for planning
- Vercel is the provisional frontend host target
- `brieflink-preview.vercel.app` is the preview hostname placeholder
- `app.brieflink.app` is the public hostname placeholder
- `https://api.brieflink.app` is the API origin placeholder
- Supabase-backed environment configuration is the backend config basis
- execution/provisioning remains unverified
- release readiness is still truthful only when described as local + planning-artifact ready, not live-hosted verified