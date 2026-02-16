# Specification

## Summary
**Goal:** Produce a Netlify-ready frontend export ZIP for manual upload, and document the exact export/deploy steps.

**Planned changes:**
- Run/enable the existing Netlify export workflow to generate `frontend/netlify-dist.zip` with `index.html` at the ZIP root and include critical files (`index.html`, `googlecdab296682a0e0eb.html`, `_redirects`).
- Ensure the export workflow fails with a non-zero exit code and prints an actionable error if critical files are missing or the Google verification meta tag check fails.
- Update `frontend/NETLIFY_DEPLOY.md` with a single copy-pasteable command (run from the `frontend` directory) that generates `frontend/netlify-dist.zip`, plus concise manual Netlify deploy steps (Add new site → Deploy manually → upload `netlify-dist.zip`).

**User-visible outcome:** The user can run one command to generate `frontend/netlify-dist.zip` and manually upload it to Netlify to deploy the built frontend.
