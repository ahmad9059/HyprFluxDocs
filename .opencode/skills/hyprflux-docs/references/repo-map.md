# Repository map

Where things live, and where each fact comes from.

## This repository

| Path | What it is |
|---|---|
| `docs/` | VitePress content and assets |
| `docs/.vitepress/config.mts` | Site config, navigation, sidebar, SEO head tags, `srcExclude` |
| `docs/.vitepress/theme/structured-data.ts` | JSON-LD schemas |
| `docs/public/` | Static files: images, `robots.txt`, `llms.txt`, service worker |
| `api/install.js`, `api/testing.js`, `api/personal.js` | Vercel installer proxies |
| `vercel.json` | Route rewrites and cache headers |
| `scripts/check-docs.mjs` | Route, asset, token, and source-pin checks |
| `README.md` | Repository readme, not part of the published site |

The HyprFlux source is a sibling checkout at `../HyprFlux`. Read it to verify
facts. Do not modify it as part of a docs task unless the user asks.

## Routes, sidebar, and anchors

- **Routes** are the file paths under `docs/`. A page at `docs/general/download.md`
  is served at `/general/download`. Pages keep their path; do not move one.
- **The sidebar** is defined in `docs/.vitepress/config.mts`. A new page is not
  reachable until it is added there.
- **The route list** in `scripts/check-docs.mjs` (`expectedRoutes`) must include
  a new page, or the check fails.
- **Anchors** are heading slugs. Pages link across to headings, for example
  `/general/iso-installation#_5-choose-a-disk-method` and
  `/keybindings/hyprland#known-collisions`. VitePress validates page links at
  build time but does not validate heading anchors, so a renamed heading
  silently breaks a cross-link. Search for the old anchor before you rename.

## The source pin

`sourceRevision` in `scripts/check-docs.mjs` is the HyprFlux commit the docs
describe. The pin also appears in `docs/public/llms.txt` and inside pinned
source links on reference pages.

When HyprFlux behavior changes:

1. Re-read the changed source files and update the affected pages.
2. Update `sourceRevision` in `scripts/check-docs.mjs`.
3. Update the revision in `docs/public/llms.txt`.
4. Update the pinned source links in the pages you touched.

`pnpm docs:check` compares `sourceRevision` with the sibling `../HyprFlux`
checkout and reports drift when they differ. In an isolated docs checkout, it
skips that comparison.

## Where facts come from in `../HyprFlux`

| Docs area | Source of truth |
|---|---|
| Installation, one-line endpoint | `install.sh`, `lib/`, `dotsSetup.sh`, `modules/` |
| Install requirements, installer screens | the separate HyprFlux-ISO project |
| Hyprland config reference | `.config/hypr/hyprland.lua`, `.config/hypr/UserConfigs/`, `.config/hypr/configs/` |
| Keybindings | `.config/hypr/configs/keybinds.lua`, `.config/hypr/UserConfigs/user-keybinds.lua`, `.config/hypr/UserConfigs/laptops.lua` |
| Locking and idle | `.config/hypr/hyprlock.conf`, `.config/hypr/hypridle.conf`, `scripts/LockScreen.sh` |
| Feature pages | the matching `.config/<component>/` tree |
| Scripts and utilities | `.config/hypr/scripts/`, `.config/hypr/UserScripts/` |
| Colors | `utilities/sync-colors.sh` and the central palette |
| Packages | `base-installer/install-scripts/01-hypr-pkgs.sh` and the AUR batch |
| Release info | the GitHub release for the pinned tag |

## The Hyprland config tree

```text
~/.config/hypr/
├── hyprland.lua                 # entrypoint, loads modules in fixed order
├── hyprflux-colors.lua          # generated Lua palette
├── monitors.lua                 # generated display rules
├── workspaces.lua               # generated workspace assignments
├── initial-boot.sh              # first-login fixup
├── configs/keybinds.lua         # base bindings (distribution default)
├── UserConfigs/                 # user-owned modules
├── animations/                  # selectable presets
├── Monitor_Profiles/            # profile assets
├── scripts/                     # managed helpers
├── UserScripts/                 # user-owned helpers
├── hyprflux-colors/             # native .conf palette for Hyprlock and Hypridle
├── hyprlock.conf, hyprlock-1080p.conf, hypridle.conf
└── application-style.conf       # Hyprland Qt/QML style
```

Ownership rules that the docs must state correctly:

- `hyprland.lua` orchestrates. It holds no settings.
- `UserConfigs/` is user-owned, except the GPU marker block in
  `env-variables.lua`, which the installer regenerates.
- `monitors.lua`, `workspaces.lua`, and `hyprflux-colors.lua` are generated.
  An owning tool can overwrite them.
- `configs/keybinds.lua` is a distribution default. Personal bindings go in
  `UserConfigs/user-keybinds.lua`.

## Configuration ownership in HyprFlux

- The `.config/` tree is canonical.
- `base-dots/config/` is a byte-identical parity mirror enforced by CI, not a
  second source.
- `base-dots/copy.sh` is a separate manual path and is not called by the
  installer.

## Tokens enforced by the checks

`scripts/check-docs.mjs` requires or forbids specific strings. Keep these in
mind when you edit the matching pages.

| File | Requirement |
|---|---|
| `general/installation.md` | contains `https://www.hyprflux.dev/install` |
| `general/download.md` | contains `HyprFlux/releases/latest` |
| `hyprland/index.md` | contains `hyprland.lua` |
| `features/wallpapers.md` | contains `AWWW` |
| `blog/release-v1.5.0.md` | contains `releases/tag/v1.5.0` |
| `blog/release-of-hyprflux.md` | contains `Archived release note` |
| `blog/inside-the-hyprflux-desktop.md` | contains `Archived article` |
| `blog/what-is-coming-next.md` | contains `Archived roadmap` |
| `keybindings/hyprland.md` | must not contain removed tokens such as `spotify-launcher`, `wasistlos`, `WaybarLayout.sh`, `WaybarStyles.sh` |

It also verifies that every image a page references exists, and that
`fav.webp`, `favicon.ico`, and `logo.webp` are present in `docs/public/`.

## Internal records

`docs/plans/` holds internal project history. It is kept in the repo but
excluded from the published site through `srcExclude` in the site config. It is
not a style example and not a fact source. Do not copy its tone.

## Hosting

The site is deployed on Vercel from `vercel.json`. Two details matter:

- `cleanUrls` must stay `true`. The site is built with VitePress `cleanUrls`, so
  pages are served at extensionless paths such as `/general/download` from
  `general/download.html`. Vercel does not do this on its own. If `cleanUrls` is
  missing, direct visits and reloads return the 404 page. The client then
  hydrates against the wrong HTML, which renders a partial page (raw HTML such
  as the download slider, but not the Markdown body). Client-side navigation
  still looks correct, which hides the problem.
- The `routes` array maps `/install`, `/personal`, and `/testing` to the API
  functions. `routes` coexists with `cleanUrls`.

When you change hosting behavior, test a hard reload of a nested route, not
just a click-through from the home page.

## Verification workflow

1. Read the page you are changing.
2. Read the source file that owns the behavior. Do not trust the page.
3. If the source moved since the pin, note the change and update the pin.
4. Rewrite the page in the correct page type.
5. Run `node .opencode/skills/hyprflux-docs/scripts/house-style.mjs <files>`.
6. Run `pnpm docs:check`.
7. Read your diff once more for accuracy and natural language.

## Useful source commands

```bash
git -C ../HyprFlux rev-parse HEAD          # current source revision
git -C ../HyprFlux log --oneline -5
git -C ../HyprFlux diff <pin>..HEAD --stat # what changed since the pin
```
