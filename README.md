# HyprFlux Docs

HyprFlux is an opinionated Arch Linux desktop built on the Hyprland compositor. This repository contains the public documentation site (VitePress + Tailwind CSS) and the Vercel serverless endpoints that deliver the one-line installation script used by the main HyprFlux dotfiles project.

## Highlights
- One-command installer that streams the latest `install.sh` from the HyprFlux dotfiles repository via `https://hyprflux.dev/install`.
- Complete Arch Linux walkthrough plus post-install guides for Hyprland, Waybar, Rofi, Hyprlock, SwayNC, Wlogout, Kitty, Neovim, Cava, and more.
- Modular configuration references for every Hyprland include (`UserConfigs`, `animations`, `scripts`, monitor layouts, keybindings, environment variables, window rules).
- Catppuccin-themed VitePress site with Tailwind CSS 4 tooling and local search.
- Vercel functions that proxy public, testing, and private install scripts with optional credential gating.

## Install HyprFlux on Arch
Run the installer on a fresh or existing Arch Linux system:

```bash
sh <(curl -fsSL https://hyprflux.dev/install)
```

The endpoint serves `install.sh` directly from the HyprFlux dotfiles repository. Keep a terminal open; the script will prompt for sudo, AUR helper selection, and component choices (sddm, themes, bluetooth, zsh, dots, optional QuickShell/Pokemon/ROG presets).

## Documentation Map
- `general/` — Showcase, quickstart, and the primary dots installation guide.
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
1) Install dependencies: `npm install`.
2) Start the docs server: `npm run docs:dev` (VitePress with Tailwind CSS; defaults to localhost:5173).
3) Build static site: `npm run docs:build`.
4) Preview production build: `npm run docs:preview`.

Node 18+ is recommended. Environment variables are only needed when exercising the API routes locally (`PERSONAL_PASSWORD`, `GITHUB_TOKEN`).

## Deployment
The project is designed for Vercel. The provided routes expose the installer endpoints and serve the static VitePress output. Deploying elsewhere requires equivalent rewrites for the three API paths and static hosting of `docs/.vitepress/dist`.

## Contributing
- Review or extend docs under `docs/` and keep navigation updated in `.vitepress/config.mts`.
- When changing installer behavior, ensure the Vercel functions continue to point at the correct scripts and update any references in the docs.
- Run `npm run docs:build` before pushing to catch broken links or build errors.
