# Phase 2 — Modernize Product, Installation, and Release Journeys

Depends on: Phase 1 complete; use the main HyprFlux releases page

Status: **Complete on 2026-09-10**

---

## 1. Goal

Replace the obsolete product model and installation narratives with accurate,
safe user journeys for the ISO route and the existing-Arch route. This phase
is intentionally limited to getting started, installation, download, and
release content; compositor configuration and desktop component details belong
to later phases.

## 2. Scope

### In scope

- Define HyprFlux consistently as a complete desktop platform available
  through an ISO and through full provisioning on an existing Arch system.
- Document the real direct-install execution chain: bootstrap, system prep,
  merged base installer, `dotsSetup` modules, and reboot handling.
- Document the current ISO lifecycle, including in-chroot HyprFlux setup before
  the final reboot and first-boot follow-up that is genuinely deferred.
- Correct requirements, data-loss warnings, package behavior, logs, backup
  behavior, rerun expectations, and troubleshooting links from current source.
- Use version-independent GitHub and SourceForge `latest` links and keep Google
  Drive as the explicitly labeled mirror folder.
- Audit every installation screenshot/GIF against the current flow; replace,
  relabel, or remove evidence that depicts deleted prompts.
- Clarify the boundary between `install.sh`, `base-installer`, `dotsSetup`, and
  the standalone/manual `base-dots/copy.sh` path.

### Out of scope

- Rewriting individual Hyprland configuration modules.
- Rebuilding component pages or keybinding tables.
- Fixing installer/source behavior in `../HyprFlux`.
- Changing Vercel proxy behavior unless validation proves the public installer
  endpoint no longer serves the intended source.
- Retrospectively rewriting the v1.0.0 blog article.

## 3. Detailed Tasks / Design

### 3.1 Pin and record the implementation baseline

1. Run `git -C ../HyprFlux rev-parse HEAD` and record the SHA in the phase PR.
   Record the HyprFlux-ISO commit SHA or immutable release tag used to validate
   the separate ISO flow as a second baseline.
2. Re-read `../HyprFlux/install.sh`, `base-installer/install.sh`,
   `dotsSetup.sh`, `modules/`, and the package manifest before changing prose.
3. Validate the current ISO step sequence against the checked-out
   HyprFlux-ISO source or the exact tagged release source. The current docs'
   reboot-before-integration sequence is known to be stale
   (`docs/general/iso-installation.md:138-176`), but exact replacement step
   numbers must come from the live ISO installer rather than this plan.

### 3.2 Correct the two installation journeys

Rewrite the existing-Arch journey around the actual source behavior:

1. One-liner or reviewed local clone.
2. Git/bootstrap handling and sudo setup.
3. Arch keyring/system update.
4. Automated merged base-installer package and service provisioning.
5. Ordered `dotsSetup` module execution.
6. Reboot prompt outside ISO mode.

The source establishes this order at `../HyprFlux/install.sh:19-49`,
`../HyprFlux/install.sh:83-124`, and `../HyprFlux/install.sh:135-150`.
Remove Yay/Paru choice, QuickShell choice, "optional package" prompts, and
"configs only" language currently found at
`docs/general/installation.md:54-90`, `docs/general/installation.md:133-137`,
`docs/general/installation.md:178-196`, and
`docs/general/installation.md:213-222`.

Rewrite the ISO journey around:

- firmware support and media creation;
- network and locale/user setup;
- automatic vs manual partitioning with prominent destructive-action warning;
- base install and target chroot configuration;
- complete HyprFlux integration before final reboot;
- SDDM login and narrowly scoped first-boot actions.

Keep the currently accurate partitioning warning
(`docs/general/iso-installation.md:115-136`) while replacing the obsolete
post-reboot integration sequence.

### 3.3 Explain ownership and safety

- State that `../HyprFlux/.config/` is canonical and module 02 performs the
  normal config deployment. The base-installer only verifies the merged
  base-dots tree (`../HyprFlux/base-installer/install-scripts/dotfiles-main.sh:5-12`,
  `../HyprFlux/base-installer/install-scripts/dotfiles-main.sh:47-53`).
- Derive backup locations and overwrite behavior from
  `modules/01-backup.sh` and `modules/02-dotfiles.sh` during implementation;
  do not retain `~/dotfiles_backup/` claims merely because old docs say so
  (`docs/general/installation.md:149-165`).
- Replace generic troubleshooting advice with links to the operational runbook
  planned in Phase 5, while keeping immediate recovery steps that are proven
  by installer logs/source.

### 3.4 Normalize downloads and release verification

- Use the canonical GitHub release channel selected after Phase 1.
- Use `https://sourceforge.net/projects/hyprflux/files/latest/download` for the
  SourceForge mirror.
- Keep the existing Google Drive folder but identify it as a mirror, not the
  checksum authority.
- Tell users to download the matching `.iso` and `.sha256` from the same
  channel and run `sha256sum -c`; do not hardcode a hash that will become stale.
- Make release labels evergreen ("Latest release") rather than embedding a
  version in button text.

The main source currently documents checksum verification at
`../HyprFlux/README.md:69-76`. The Vercel `/install` route currently proxies
the main branch's `install.sh` (`api/install.js:1-15`, `vercel.json:1-6`), so
it should be verified but not changed without a demonstrated mismatch.

### 3.5 Remove duplicate and contradictory entry points

- Make `docs/general/installation.md` the detailed existing-Arch guide.
- Make `docs/complete/hyprflux.md` a concise handoff to that guide rather than
  a second, conflicting procedure.
- Keep `docs/complete/arch.md` focused on preparing an Arch base, then link to
  the canonical existing-Arch guide.
- Update homepage, quick-start, README, and download copy to use the same two
  route names and risk descriptions.

## 4. Files Touched

- `README.md`
- `docs/index.md`
- `docs/general/quickstart.md`
- `docs/general/download.md`
- `docs/general/installation.md`
- `docs/general/iso-installation.md`
- `docs/complete/hyprflux.md`
- `docs/complete/arch.md`
- `docs/.vitepress/config.mts` (installation labels/links only)
- `api/install.js` (verification only; modify only if the selected public
  installer source changes)
- `vercel.json` (verification only; modify only if route behavior changes)
- Installation screenshots under `docs/public/` or page-local `assets/` that
  the audit proves stale (exact asset list must be recorded before deletion)

## 5. Acceptance Criteria / QA Checklist

- [x] HyprFlux and HyprFlux-ISO commit SHAs or immutable release references are
      recorded for the phase.
- [x] No current installation page asks users to choose Yay/Paru, QuickShell,
      or formerly optional package groups.
- [x] Existing-Arch installation is described as full provisioning, not
      configuration-only copying.
- [x] ISO docs show HyprFlux integration before the final reboot.
- [x] Automatic partitioning retains an unmistakable data-loss warning.
- [x] Download links resolve to the selected GitHub latest release, SourceForge
      latest ISO, and the existing Google Drive folder.
- [x] Checksum instructions use the matching downloaded `.sha256` file.
- [x] Every retained screenshot matches the current flow and has meaningful alt text.
- [x] Duplicate install pages have distinct purposes and cross-link correctly.
- [x] `api/install.js` is verified to serve the intended public installer.
- [x] Targeted searches find no current-flow claims for Paru selection,
      optional QuickShell, or post-reboot full integration.
- [x] The production VitePress build succeeds.
- [x] Install/download pages are manually checked at desktop and mobile widths.

## 6. Approved Decisions and Open Questions

- **Approved in Phase 1:** use
  `https://github.com/ahmad9059/HyprFlux/releases/latest` as the canonical ISO
  download source. Do not mix assets or checksums from HyprFlux-ISO releases.
- Should the Google Drive mirror expose only the latest files or retain
  versioned subfolders?
- **Resolved in Phase 2:** retain the current ISO screenshots through the disk
  method selector and remove images that depict the deleted post-reboot flow.
- **Resolved in Phase 2:** retain `docs/complete/hyprflux.md` as a short handoff
  for old inbound links to `/general/installation`.

## 7. Completion Record

Phase 2 was implemented on 2026-09-10 against these revisions:

- HyprFluxDocs starting revision: `7ecdd6b0414169784ba0e3ed92809258cfe708ae`
- HyprFlux source: `f421b6bd108214079b56c435331ddbbfdfb89591`
  (`v1.5.0`)
- HyprFlux-ISO source: `025a7fadaf68099d32ce80cd060ec8f12a773efd`
  (`v1.5.0`)

The live `https://hyprflux.dev/install` response was verified byte-for-byte
against the main-branch HyprFlux `install.sh`; both produced SHA-256
`2c4d7245599d67514d377dc43cf967e7fd26dde83932b25b7c55b492b2c54991`.
The canonical GitHub release, SourceForge latest download, Google Drive mirror,
Arch Linux, Ventoy, balenaEtcher, and GitHub Issues links resolved during the
phase audit.

Stale ISO images `img-10.webp` through `img-14.webp` were removed because they
showed reboot-before-provisioning and deleted package prompts. The obsolete
direct-installer `welcome`, `yay-paru`, `select-option`, `pacman`, `yay`, and
`complete` WebP/AVIF asset pairs were also removed after confirming that no
remaining page referenced them.

Verification completed with targeted stale-content and deleted-asset searches,
`git diff --check`, a successful VitePress production build, and browser checks
at 1440x900 and 390x844. The reviewed pages had no document-level horizontal
overflow or browser console errors; retained ISO images loaded successfully.
The existing pnpm esbuild-approval issue remains assigned to Phase 6, so the
production build was invoked through the installed VitePress binary.
