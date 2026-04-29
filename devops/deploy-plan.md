# BriefLink Deploy Plan

## Target stack

- Frontend/application hosting: Vercel
- Backend services: Supabase
- Source repository: `https://github.com/mhr2964/BriefLink.git`

## Deployment goals

- Run BriefLink locally with environment-based configuration.
- Deploy preview and production builds through Vercel.
- Store secrets in provider-managed environment variable settings.
- Keep git and repository administration at the repository root, outside this staged DevOps folder.

## Pre-deployment checklist

1. Confirm the repository root contains the final application source code and package manifest.
2. Confirm the app’s framework settings are compatible with Vercel.
3. Create or identify the Supabase project for the target environment.
4. Collect required environment variables:
   - `NEXT_PUBLIC_APP_URL`
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
5. Ensure no real secrets are committed to source control.

## Local run procedure

1. Copy `workspace/devops/.env.example` into the root app environment file expected by the stack, commonly `.env.local`.
2. Set real local development values.
3. Install dependencies from the repository root.
4. Run the local development server from the repository root.
5. Verify the app loads successfully and can reach Supabase-dependent functionality.

Example commands:
