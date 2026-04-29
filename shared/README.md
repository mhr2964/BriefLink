# Shared Workspace Contracts

This directory is reserved for cross-department artifacts that should be treated as shared reference material, contracts, or canonical handoff inputs.

## Purpose
Use `workspace/shared/` for items such as:
- shared data contracts and interface notes
- canonical digests or downstream operating references
- shared design tokens or schema references
- cross-functional implementation notes explicitly intended for multiple departments

## Ownership
Platform owns the structure of this directory by default. Other departments should only add or change files here when explicitly directed through cross-department routing.

## Current expectations
- Prefer source-of-truth documents over duplicated summaries.
- When a file here is declared canonical on the board, downstream teams should reference that file path directly.
- Keep filenames descriptive and stable so downstream links do not churn.

## Related workspace areas
- `workspace/docs/` — broader product, architecture, and environment documentation
- `workspace/frontend/` — frontend-owned implementation artifacts
- `workspace/backend/` — backend-owned implementation artifacts
- `workspace/devops/` — deployment and environment planning artifacts