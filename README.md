# HyprFlux Docs

HyprFlux is an opinionated Arch Linux desktop platform built on the Hyprland compositor. This repository contains the public documentation site (VitePress + Tailwind CSS) and the Vercel serverless endpoints that deliver the one-line installer used by the main HyprFlux project.

## Highlights
- Two supported installation paths: a bootable ISO for a new system and full HyprFlux provisioning on an existing Arch Linux system.
- One-command installer that streams the latest `install.sh` from the HyprFlux repository via `https://hyprflux.dev/install`.
- Complete Arch Linux walkthrough plus post-install guides for Hyprland, Waybar, Rofi, Hyprlock, SwayNC, Wlogout, Kitty, Neovim, Cava, and more.
- Modular configuration references for every Hyprland include (`UserConfigs`, `animations`, `scripts`, monitor layouts, keybindings, environment variables, window rules).
- Catppuccin-themed VitePress site with Tailwind CSS 4 tooling and local search.
- Vercel functions that proxy public, testing, and private install scripts with optional credential gating.

## Install HyprFlux on Arch
Run the installer on an existing Arch Linux system:

```bash
sh <(curl -fsSL https://hyprflux.dev/install)
```

The endpoint serves `install.sh` directly from the HyprFlux repository. The script bootstraps the checkout, updates the system, runs the automated base installer, deploys the maintained configuration through `dotsSetup.sh`, and then offers a reboot. It requests sudo authentication but does not present AUR-helper or component-selection menus.

## Documentation Map
- `general/` — Showcase, quickstart, ISO installation, and the primary existing-Arch installation guide.
- `complete/` — Full Arch Linux installation using `archinstall`, then HyprFlux deployment.
- `keybindings/` — Keyboard shortcuts for Hyprland, Neovim, and Tmux.
- `features/` — Deep dives into Hyprland, Waybar, Hyprlock, Rofi, SwayNC, Wlogout, Kitty, QT theming, Neovim, and Cava configurations.
- `hyprland/` — Annotated references for each Hyprland config file and helper scripts.

## Repository Layout
- `docs/` — VitePress content, assets, and site config (`.vitepress/config.mts`).
- `api/install.js` — Public installer proxy to the latest HyprFlux `install.sh` on GitHub.
- `api/testing.js` — Proxy for the `personal/install.sh` branch.
- `api/personal.js` — Password- and token-protected endpoint that fetches a private installer (`PERSONAL_PASSWORD`, `GITHUB_TOKEN` required).
- `vercel.json` — Route rewrites for `/install`, `/personal`, `/testing`.

## Develop the Docs Locally
1. Install dependencies: `pnpm install`.
2. Start the docs server: `pnpm docs:dev` (defaults to localhost:5173).
3. Run source, route, asset, and production checks: `pnpm docs:check`.
4. Preview the production build: `pnpm docs:preview`.

Node 18+ is recommended. Environment variables are only needed when exercising the API routes locally (`PERSONAL_PASSWORD`, `GITHUB_TOKEN`).

## Deployment
The project is designed for Vercel. The provided routes expose the installer endpoints and serve the static VitePress output. Deploying elsewhere requires equivalent rewrites for the three API paths and static hosting of `docs/.vitepress/dist`.

## Contributing
- Review or extend docs under `docs/` and keep navigation updated in `.vitepress/config.mts`.
- Review current behavior against a recorded HyprFlux commit before editing. The sibling checkout's `.config/` tree is canonical; `base-dots/config/` is its CI-enforced parity mirror, not a second authority.
- When changing installer behavior, ensure the Vercel functions continue to point at the correct scripts and update any references in the docs.
- Run `pnpm docs:check` before pushing. When `../HyprFlux` is available, it also verifies the recorded source revision and required owner files; isolated docs checkouts report that source checks were skipped.

## Release Documentation Checklist
- Update the documented release version and pinned source revision together.
- Verify the canonical `HyprFlux/releases/latest` page, release assets, and matching checksum instructions.
- Review download mirrors, homepage copy, archive notices, structured data, and `docs/public/llms.txt`.
- Confirm canonical URLs use `https://hyprflux.dev` and run `pnpm docs:check`.
