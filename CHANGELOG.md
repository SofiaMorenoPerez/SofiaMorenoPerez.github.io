# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.1] - 2026-07-26

### Fixed

- Site name no longer doubles up in page `<title>` / `og:title` when a page passes its own title ([#17](https://github.com/kpab/astro-haze/issues/17))
- Footer no longer links to `/privacy` / `/terms`, which the theme doesn't ship ([#18](https://github.com/kpab/astro-haze/issues/18))
- Footer nav now respects `features.*` flags, so a disabled section (e.g. `blog`) no longer leaves a dead link there ([#19](https://github.com/kpab/astro-haze/issues/19))
- RSS `<channel>` link now includes the configured `base`, instead of pointing at the origin root ([#20](https://github.com/kpab/astro-haze/issues/20))
- Blog post dates now render in UTC, so the displayed date no longer shifts with the build host's timezone ([#21](https://github.com/kpab/astro-haze/issues/21))
- `prose` tables now scroll horizontally on narrow viewports instead of overflowing, and long words wrap instead of being clipped ([#22](https://github.com/kpab/astro-haze/issues/22))
- Root-relative image paths (string form) and `links.case` on project pages now go through `withBase`, fixing potential 404s under a subpath deploy ([#23](https://github.com/kpab/astro-haze/issues/23))
- Featured posts no longer appear a second time in the blog list's "Latest Posts" grid — including when a featured post falls on a later pagination page ([#24](https://github.com/kpab/astro-haze/issues/24))
- Documented that `public/robots.txt` and `public/_headers` are not served/applied on GitHub Pages ([#25](https://github.com/kpab/astro-haze/issues/25))

## [1.1.0] - 2026-07-17

### Added

- Pagefind-powered static site search behind a new `features.search` flag ([#1](https://github.com/kpab/astro-haze/pull/1))
  - Search index generated during `astro build` via the `astro-pagefind` integration — no deploy-workflow changes needed
  - Glass search modal (native `<dialog>`) opened from a header button or <kbd>⌘K</kbd> / <kbd>Ctrl+K</kbd>, with ↑/↓ result navigation
  - Pagefind bundle lazy-loaded on first open; site chrome excluded from the index with `data-pagefind-ignore`

## [1.0.0] - 2026-06-30

### Added

- Initial release: glassmorphism multi-purpose Astro 7 theme
  - Reusable glass UI system with aurora backgrounds, light/dark theme toggle
  - Paginated blog with tags, table of contents, reading time and share links
  - Portfolio with technology filters, case-study pages and responsive galleries
  - Config-driven e-commerce landing page
  - SEO (canonical, Open Graph, Twitter cards, JSON-LD), RSS feed and XML sitemap
  - Optimized images (AVIF/WebP via `astro:assets`), accessibility and reduced-motion support

[1.1.1]: https://github.com/kpab/astro-haze/compare/v1.1.0...v1.1.1
[1.1.0]: https://github.com/kpab/astro-haze/compare/v1.0.0...v1.1.0
[1.0.0]: https://github.com/kpab/astro-haze/releases/tag/v1.0.0
