# HyprFlux Docs

Source for the public documentation site at [www.hyprflux.dev](https://www.hyprflux.dev). The site is built with VitePress and Tailwind CSS. This repository also contains the Vercel functions that serve the one-line installer used by the [HyprFlux](https://github.com/ahmad9059/HyprFlux) project.

## What is HyprFlux

HyprFlux is an opinionated Arch Linux desktop built on the [Hyprland](https://hyprland.org/) Wayland compositor. There are two supported ways to install it:

- Boot the HyprFlux ISO on a new machine. The installer creates the Arch base system and provisions the full desktop.
- Run the provisioner on an existing Arch Linux system. It updates the system, installs packages and services, and deploys the HyprFlux configuration.

On an existing Arch system, install with:

```bash
sh <(curl -fsSL https://www.hyprflux.dev/install)
```

The endpoint streams the current `install.sh` from the main repository. The script clones HyprFlux to `~/HyprFlux`, updates the system, runs the base installer, deploys the configuration through `dotsSetup.sh`, and then offers a reboot.

## Documentation layout

- `general/` - quick start tutorial, download, ISO installation, existing-Arch installation, hardware, troubleshooting.
- `complete/` - preparing an Arch base before running the HyprFlux provisioner.
- `keybindings/` - Hyprland, Neovim, and tmux shortcuts.
- `features/` - per-component guides for Hyprland, Waybar, Rofi, SwayNC, Wlogout, Hyprlock, Kitty, Qt theming, Yazi, Neovim, Cava, and wallpapers.
- `hyprland/` - reference for each file under `~/.config/hypr`.

## Repository layout

- `docs/` - VitePress content, assets, and site config (`docs/.vitepress/config.mts`).
- `api/install.js` - public installer proxy for the latest `install.sh` on GitHub.
- `api/testing.js` - proxy for the `personal/install.sh` branch.
- `api/personal.js` - password- and token-protected endpoint (`PERSONAL_PASSWORD`, `GITHUB_TOKEN`).
- `vercel.json` - route rewrites for `/install`, `/personal`, and `/testing`.
- `scripts/check-docs.mjs` - route, asset, content, and source-drift checks.

## Work on the docs locally

Requires Node 18 or newer and pnpm.

1. Install dependencies: `pnpm install`.
2. Start the dev server: `pnpm docs:dev` (http://localhost:5173).
3. Run the checks and a production build: `pnpm docs:check`.
4. Preview the production build: `pnpm docs:preview`.

To exercise the API routes locally, set `PERSONAL_PASSWORD` and `GITHUB_TOKEN`.

## Deployment

The site is designed for Vercel. The routes expose the installer endpoints and serve the static build from `docs/.vitepress/dist`. Deploying elsewhere requires equivalent rewrites for the three API paths and static hosting of the build output.

## Documentation accuracy

The reference pages are checked against a specific HyprFlux commit. The commit is recorded in two places:

- `sourceRevision` in `scripts/check-docs.mjs`.
- The pinned source links inside the affected pages.

When the HyprFlux source changes in a way that affects documented behavior, update both. `pnpm docs:check` compares `sourceRevision` with the sibling `../HyprFlux` checkout when it is available, and reports drift if they differ. In an isolated docs checkout, it skips that comparison.

The canonical configuration source in HyprFlux is the `.config/` tree. `base-dots/config/` is a CI-enforced parity mirror, not a second deployment source.

## Contributing

- Edit content under `docs/` and keep the sidebar in `docs/.vitepress/config.mts` in sync with any new page.
- Run `pnpm docs:check` before you push. It verifies routes, shared assets, Markdown image references, current content tokens, and (when present) the sibling source revision.
- If you change installer behavior, keep the Vercel functions pointing at the correct scripts and update any affected documentation.
- Before writing or rewriting a page, see the project skill at `.opencode/skills/hyprflux-docs/SKILL.md`. It documents the house style, the merged writing standards, and the Diátaxis page types. Check a page with `node .opencode/skills/hyprflux-docs/scripts/house-style.mjs <files>`.

## Release checklist

- Update the documented release version and the pinned source revision together.
- Verify the `HyprFlux/releases/latest` page, its release assets, and the checksum instructions.
- Review the download mirrors, homepage copy, structured data, and `docs/public/llms.txt`.
- Confirm canonical URLs use `https://www.hyprflux.dev`, then run `pnpm docs:check`.
