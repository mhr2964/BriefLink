# Environment Template

This document captures shared environment variable templates for BriefLink across local development and hosted planning scenarios.

Hosted values in this document are planning placeholders only. They are not live, validated, or deploy-ready until infrastructure is provisioned, DNS is configured, and the relevant services are deployed. For the canonical hosted placeholder hostnames/origins and current blocked-status notes, see `workspace/docs/preview-hostname-and-env-status.md`.

## API Base URL Variables

These variables should point to the BriefLink backend/API origin appropriate to the environment where the app or service is running.

| Variable | Local development value | Hosted planning placeholder | Status notes |
| --- | --- | --- | --- |
| `VITE_API_BASE_URL` | `http://localhost:4000` | `https://api.brieflink.app` | Frontend build/runtime variable. Use the local value for local development. Hosted value is a non-live planning placeholder only. |
| `API_BASE_URL` | `http://localhost:4000` | `https://api.brieflink.app` | Server-side/shared consumer variable. Use the local value for local development. Hosted value is a non-live planning placeholder only. |

## Usage Notes

- Local development should continue using localhost-based values until a deployed backend exists.
- Hosted placeholder values are for documentation and coordination only.
- Do not treat `https://api.brieflink.app` as active until deployment, DNS, and environment provisioning are complete.
- If hosted placeholder values change, update `workspace/docs/preview-hostname-and-env-status.md` first and keep this file aligned to that canonical source.