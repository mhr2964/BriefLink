# Deployment Guide

This document defines the minimal deployment baseline for BriefLink v1.

## Platforms

- **Vercel** hosts the application and provides preview/production URLs.
- **Supabase** provides backend services and environment-backed credentials.

## Environment Setup

Configure the following variables locally and in Vercel:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `VERCEL_PROJECT_ID`
- `VERCEL_ORG_ID`
- `VERCEL_TOKEN`

## Vercel Project Setup

1. Import the BriefLink GitHub repository into Vercel.
2. Select the correct framework preset for the app when the application code exists.
3. Add environment variables for:
   - Local Development (if used through Vercel tooling)
   - Preview
   - Production
4. Confirm automatic Preview deployments are enabled for pull requests.
5. Confirm Production deploys are limited to the main branch.

## Milestone Deployment Guidance

### Milestone previews
Use Vercel Preview deployments for each milestone branch or pull request.
Recommended checks before sharing a preview URL:
- Environment variables are present
- Supabase project points to the intended environment
- CI placeholder workflow passes

### Production milestone release
Promote only after preview validation.
Recommended release flow:
1. Merge approved milestone changes to main.
2. Let Vercel create the Production deployment.
3. Smoke-test core flows against Production environment variables.
4. Record the public URL for stakeholder review.

## CI Expectations

Current CI is intentionally minimal and acts as a baseline placeholder.
It should eventually expand to include:
- dependency install
- lint
- typecheck
- tests
- build verification
- optional preview deployment checks

## User-side setup steps

Because this workspace only stages artifacts, the user still needs to:
1. place these files at the repository root paths:
   - `README.md`
   - `.env.example`
   - `docs/deployment.md`
   - `.github/workflows/ci.yml`
2. connect the GitHub repository to Vercel
3. configure the listed environment variables in Vercel and local development
4. install project dependencies and extend CI once app code is present