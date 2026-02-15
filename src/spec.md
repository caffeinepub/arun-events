# Specification

## Summary
**Goal:** Keep the homepage banner carousel to the first three banners only, and remove any “AI” wording/filenames from user-facing text and all generated image asset references.

**Planned changes:**
- Update `frontend/src/config/siteMedia.ts` to remove Banner #4–#6 from `siteMedia.banners` so only three banners remain.
- Replace any user-facing text and any computed alt text/templates that include the word “AI” (case-insensitive).
- Replace `/assets/generated/ai-...` banner, gallery, and OG image references with new non-“ai” filenames, and ensure Birthday, Anniversary, Welcome Baby, and Car Boot Decor galleries still contain multiple images each.
- Add the new static generated images under `frontend/public/assets/generated/` and update all UI paths to match.

**User-visible outcome:** The homepage slider shows only three banners and works as before, and the site no longer displays or references “AI” anywhere (including image filenames/paths), while the specified galleries continue to show multiple images.
