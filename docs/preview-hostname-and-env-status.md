# Preview Hostname and Env Status

## Deploy target
**Frontend deploy target:** Vercel

This target is now approved for planning purposes. The hostnames below are **planning placeholders only** and are **not proof of live provisioning, successful deployment, DNS cutover, or runtime reachability**.

## Planning placeholder hostnames and origin

### Frontend preview hostname
- `brieflink-preview.vercel.app`

### Frontend public hostname
- `app.brieflink.app`

### API origin
- `https://api.brieflink.app`

## Provisioning status
**Hosted validation remains blocked.**

The placeholder values above are canonical for planning and environment mapping, but they do **not** constitute evidence that:
- the Vercel preview deployment is live
- the production frontend hostname is provisioned and serving
- the backend/API origin is deployed and reachable
- deployment-time environment injection is active in a live environment

## Frontend API env mapping

The currently documented frontend API base URL env keys are:

- `VITE_API_BASE_URL`
- `API_BASE_URL`

### Local
- `VITE_API_BASE_URL=http://localhost:4000`
- `API_BASE_URL=http://localhost:4000`

### Preview (planning placeholder)
- `VITE_API_BASE_URL=https://api.brieflink.app`
- `API_BASE_URL=https://api.brieflink.app`

### Public / production (planning placeholder)
- `VITE_API_BASE_URL=https://api.brieflink.app`
- `API_BASE_URL=https://api.brieflink.app`

## Deployment-time env injection status
**Expected mapping is now defined for planning, but live injection is not yet evidenced.**

Expected hosted mapping:
- preview frontend on Vercel → inject `VITE_API_BASE_URL=https://api.brieflink.app` and/or `API_BASE_URL=https://api.brieflink.app`
- public frontend on Vercel → inject `VITE_API_BASE_URL=https://api.brieflink.app` and/or `API_BASE_URL=https://api.brieflink.app`

Platform can confirm the planning mapping above. Platform cannot yet confirm from visible evidence that these values are actually configured in a live Vercel project or consumed by a live deployment.

## Remaining blocker
Hosted validation is blocked until there is evidence of actual provisioning for:
1. `brieflink-preview.vercel.app`
2. `app.brieflink.app`
3. `https://api.brieflink.app`
4. deployment-time injection of the frontend API base URL env value in the hosted environment