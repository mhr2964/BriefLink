# BriefLink Deploy Plan

## Stack

- Hosting: Vercel
- Backend: Supabase
- Repo: `https://github.com/mhr2964/BriefLink.git`

## Pre-deploy

1. Ensure the repository root contains the app source and package manifest.
2. Create or identify the Supabase project.
3. Prepare required environment variables.
4. Keep real secrets out of source control.

## Local validation

1. Copy `workspace/devops/.env.example` to the root env file used by the app.
2. Install dependencies from the repository root.
3. Run the app locally from the repository root.
4. Verify the app can reach configured Supabase services.

## Vercel deployment

1. Create/connect the Vercel project to the GitHub repository.
2. Set required environment variables for preview and production.
3. Configure the root directory if the app is not at the repo root.
4. Trigger deployment.
5. Validate the deployed app and critical flows.

## Post-deploy checks

- App loads without missing env errors.
- Supabase-backed features work.
- Correct URL and redirect settings are configured.
- No secrets are exposed client-side.

## Git note

Remote configuration, branch management, and pull/push verification are repository-root tasks handled by the user or platform, not by this staged DevOps artifact folder.