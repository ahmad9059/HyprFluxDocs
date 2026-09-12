# Shared Site Images

The global metadata and navigation use these maintained assets:

- `logo.webp` - Open Graph, Twitter, and structured-data image
- `favicon.ico` - browser, navigation, and Apple touch icon fallback
- `fav.webp` - homepage hero image

If one of these stable public paths changes, update
`docs/.vitepress/config.mts`, `docs/.vitepress/theme/structured-data.ts`, and the
service-worker cache policy together. Run `pnpm docs:check` to detect missing
Markdown assets and production build failures.
