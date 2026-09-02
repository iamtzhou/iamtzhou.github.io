# Content guide

For AI-assisted authoring, use the complete root-level guide: [`CONTENT_AUTHORING_FOR_AI.md`](../../CONTENT_AUTHORING_FOR_AI.md).

The files in this folder are the site's source of truth. The included entries are sample content for local validation and should be replaced with real work.

- Edit `profile.md` for identity, biography, education, and profile links.
- Add one Markdown file to `projects/`, `publications/`, or `articles/` to create a detail page and update its index automatically.
- The filename becomes the stable URL slug. Prefer lowercase kebab-case and avoid renaming published files.
- Set `draft: true` to keep an entry out of production builds. Drafts remain visible during local development.
- `featured` remains available as an editorial marker, but the intentionally single-screen home page does not render collection entries. Featured projects are currently used by the CV page.

Frontmatter is validated at build time by `src/content.config.ts`. Keep long-form context, methods, results, and notes in the Markdown body rather than adding more metadata fields.
