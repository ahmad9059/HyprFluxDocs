# Phase 5 — Rebuild Keybindings, Scripts, Hardware, and Troubleshooting

Depends on: Phases 2–4 and their finalized terminology

---

## 1. Goal

Create an operational reference that users can trust after installation. The
phase consolidates current shortcuts, explains maintained scripts by workflow,
documents hardware-dependent behavior, and provides symptom-led diagnostics
derived from the source and installer logs rather than generic advice.

## 2. Scope

### In scope

- Generate or systematically transcribe base, user, laptop, Waybar, and
  application shortcut references from current owners.
- Explain shortcut precedence, flag behavior, mouse binds, and hardware-gated
  bindings.
- Replace stale one-file-per-script pages with workflow-oriented references for
  scripts that still exist.
- Add supported operational guidance for monitors, laptop lids, battery,
  backlight, audio, Bluetooth, GPU handling, wallpapers, and generated state.
- Add symptom-led troubleshooting for install, session startup, config
  validation, displays, bars/launchers, wallpaper services, and hardware.
- Identify private/internal scripts and remove public claims for deleted tools.

### Out of scope

- Redesigning source scripts or keybindings.
- Repeating the complete installation flow.
- Repeating Phase 3's Lua API tutorial or Phase 4's component configuration.
- Promising support for untested distributions or hardware.
- Publishing credentials, machine-local output, or maintainer-only deployment
  procedures.

## 3. Detailed Tasks / Design

### 3.1 Create a binding inventory from all live owners

Build a machine-readable review table with at least these fields:

- key combination;
- action label;
- dispatcher/command;
- source file and line;
- context (`base`, `user`, `laptop`, `Waybar`, application);
- condition/dependency;
- public section.

Primary Hyprland sources are:

- `../HyprFlux/.config/hypr/configs/keybinds.lua`;
- `../HyprFlux/.config/hypr/UserConfigs/user-keybinds.lua`;
- `../HyprFlux/.config/hypr/UserConfigs/laptops.lua`.

The entrypoint loads them in that order
(`../HyprFlux/.config/hypr/hyprland.lua:22-24`). The existing docs instead
describe removed Hyprlang files and old commands
(`docs/keybindings/hyprland.md:6-18`, `docs/hyprland/keybinding.md:8-22`).

Do not document only obvious keyboard combinations. Account for:

- option-table flags (`l`, `r`, `m`, `e`) whose meaning is recorded at
  `../HyprFlux/.config/hypr/configs/keybinds.lua:1-8`;
- mouse bindings;
- long-press/repeat behavior;
- comments that intentionally disable bindings;
- laptop bindings that are always loaded, including ASUS commands that are
  guarded by tool availability
  (`../HyprFlux/.config/hypr/UserConfigs/laptops.lua:12-32`);
- duplicate combinations and later overrides.

### 3.2 Separate authoring docs from lookup tables

- Keep `/hyprland/keybinding` and `/hyprland/userkeybindings` focused on how to
  add or override Lua bindings safely.
- Make `/keybindings/hyprland` the canonical searchable shortcut table.
- Refresh the existing Neovim and Tmux keybinding pages only where their
  current source is available. Keep component-specific excerpts on the owning
  feature pages rather than creating a new keybinding page for every component.
- Avoid copying the same full table into feature pages; link to the canonical
  table with small contextual excerpts.

### 3.3 Replace the stale script catalog

Inventory `../HyprFlux/.config/hypr/scripts/` and map every entry in the current
single-page catalog, `docs/hyprland/scripts.md`, to one of four outcomes:

1. retain and rewrite because a live user workflow calls it;
2. merge into a workflow page because isolated documentation adds no value;
3. label internal/implementation detail and link from the owning workflow;
4. retire with route-safe handling because the script no longer exists.

Organize retained public content by workflow instead of filename where
possible:

- screenshots and screen recording;
- wallpaper image/video selection, effects, randomization, and timers;
- monitor profiles and display controls;
- clipboard, emoji, calculator, menus, and launch helpers;
- lock/logout/session controls;
- update and maintenance helpers;
- hardware helpers such as brightness and battery notifications.

Explicitly remove claims for old `WaybarLayout.sh`, `WaybarStyles.sh`, Wallust,
SWWW service control, or shell implementations replaced by Lua unless a live
source reference proves they remain user-facing. The current catalog describes
its categories at `docs/hyprland/scripts.md:1-23` and is linked from the
Hyprland sidebar at `docs/.vitepress/config.mts:177-180`; splitting or retiring
that route therefore needs an explicit navigation and compatibility decision.

### 3.4 Add hardware and generated-state guidance

Create the source-owner matrix before drafting. Its required owners are:

- GPU detection and generated environment blocks:
  `../HyprFlux/modules/16-hardware-detect.sh` and the base installer's
  `nvidia.sh`/`nvidia_nouveau.sh` package paths
  (`../HyprFlux/modules/16-hardware-detect.sh:5-21`,
  `../HyprFlux/base-installer/install-scripts/nvidia.sh:5-11`);
- monitor generation and profiles: `../HyprFlux/modules/15-monitors.sh`,
  `../HyprFlux/modules/16-hardware-detect.sh`, `.config/hypr/monitors.lua`,
  `.config/hypr/Monitor_Profiles/`, and `.config/hypr/scripts/MonitorProfiles.sh`
  (`../HyprFlux/modules/15-monitors.sh:1-16`,
  `../HyprFlux/modules/16-hardware-detect.sh:25-31`);
- laptop keys, devices, and lid examples:
  `../HyprFlux/.config/hypr/UserConfigs/laptops.lua`
  (`../HyprFlux/.config/hypr/UserConfigs/laptops.lua:12-58`);
- battery, brightness, keyboard brightness, touchpad, and idle:
  `../HyprFlux/.config/hypr/scripts/Battery.sh`, `Brightness.sh`,
  `BrightnessKbd.sh`, `TouchPad.sh`, and `.config/hypr/hypridle.conf`
  (`../HyprFlux/.config/hypr/scripts/Battery.sh:1-9`,
  `../HyprFlux/.config/hypr/scripts/Brightness.sh:1-12`,
  `../HyprFlux/.config/hypr/hypridle.conf:7-13`);
- audio and Bluetooth provisioning/runtime control:
  `../HyprFlux/base-installer/install-scripts/pipewire.sh`,
  `../HyprFlux/base-installer/install-scripts/bluetooth.sh`,
  `../HyprFlux/.config/hypr/scripts/Volume.sh`, and
  `.config/hypr/scripts/AirplaneMode.sh`
  (`../HyprFlux/base-installer/install-scripts/pipewire.sh:5-18`,
  `../HyprFlux/base-installer/install-scripts/bluetooth.sh:5-9`,
  `../HyprFlux/.config/hypr/scripts/Volume.sh:1-15`,
  `../HyprFlux/.config/hypr/scripts/AirplaneMode.sh:1-16`);
- stable installer log locations: `../HyprFlux/lib/common.sh`, which centralizes
  install, dots setup, base-installer, and copy logs
  (`../HyprFlux/lib/common.sh:45-52`).

Document behavior users can observe and safely diagnose:

- GPU detection and generated environment markers from installer hardware logic;
- laptop profile generation, lid handling, touchpad defaults, and brightness keys;
- monitor profiles, `monitors.lua`, `workspaces.lua`, and nwg-displays;
- battery and power-related Waybar/script dependencies;
- Bluetooth/audio prerequisites and service expectations;
- VM-specific caveats only where source contains explicit handling.

Use current source paths and commands, but do not tell users to hand-edit
installer-managed marker blocks. Connect this section to Phase 3's generated
file explanation rather than duplicating it.

### 3.5 Build a symptom-led troubleshooting runbook

Each runbook entry should contain:

1. symptom;
2. likely scope, not an unsupported definitive diagnosis;
3. safe inspection command;
4. expected signal;
5. reversible corrective action;
6. relevant source/config/log link;
7. escalation information to collect.

Required groups:

- installer exits or package failures;
- SDDM/session does not start;
- Hyprland Lua verification errors;
- black screen, wrong monitor, or workspace mapping;
- Waybar/Rofi/SwayNC does not start;
- AWWW daemon or wallpaper selection failure;
- GPU environment issue;
- laptop brightness, battery, lid, audio, or Bluetooth issue.

Use source-proven validation commands, including the config verification
command declared in `../HyprFlux/.config/hypr/hyprland.lua:2-7` and CI syntax
checks at `../HyprFlux/.github/workflows/config-check.yml:27-78`. Avoid unsafe
blanket fixes such as recursive permission changes, deleting all config, or
re-running destructive partitioning.

### 3.6 Add maintainable extraction/drift rules

- Prefer a small repository script that extracts `hl.bind` declarations into
  reviewable JSON/Markdown input if Lua syntax can be parsed reliably without
  executing user code.
- If reliable static extraction is not feasible, store the reviewed binding
  inventory and add source-file references plus a checklist to compare every
  owner during updates.
- Add a check that flags removed script names and obsolete config filenames in
  current, non-archive documentation; implement the final integrated command in
  Phase 6.
- Never execute arbitrary checked-out Lua or shell merely to generate docs.

## 4. Files Touched

- `docs/keybindings/hyprland.md`
- `docs/keybindings/neovim.md`
- `docs/keybindings/tmux.md`
- `docs/hyprland/keybinding.md`
- `docs/hyprland/userkeybindings.md`
- `docs/hyprland/scripts.md`
- `docs/general/hardware.md` (new, subject to route approval)
- `docs/general/troubleshooting.md` (new)
- `docs/.vitepress/config.mts` (keybinding, script, and operations navigation)
- `scripts/check-doc-source-drift.mjs` or an equivalently small static checker
  (new only if the extraction/check design is proven reliable)

## 5. Acceptance Criteria / QA Checklist

- [ ] A source commit SHA and complete binding/script inventories are recorded.
- [ ] Every active Hyprland binding from base, user, and laptop owners has a
      reviewed outcome: documented, intentionally private, or intentionally omitted.
- [ ] Duplicate and overridden combinations are identified before publication.
- [ ] `/keybindings/hyprland` is the canonical lookup table; Hyprland config
      pages teach authoring without duplicating it.
- [ ] Every script sidebar item maps to a live source or has an explicit
      retirement/redirect decision.
- [ ] Current docs contain no unsupported Wallust, SWWW-service, Waybar layout
      switcher, or removed shell-script workflow.
- [ ] Hardware guidance distinguishes generated files from safe user-owned files.
- [ ] The hardware/source-owner matrix covers GPU, monitors, laptop behavior,
      power/input, audio, Bluetooth, and stable logs before prose is drafted.
- [ ] Troubleshooting commands are non-destructive and source-backed.
- [ ] Config verification and relevant log locations are easy to find.
- [ ] Application keybinding pages are omitted or scoped down when their
      external source cannot be validated.
- [ ] Any extraction/check script processes source statically and has a clear
      failure mode.
- [ ] The production VitePress build succeeds.
- [ ] Key tables and runbook callouts are usable at mobile widths.

## 6. Approved Decisions and Open Questions

- Should new hardware guidance be one page or separate GPU/laptop/display pages?
- Which old script routes have meaningful inbound traffic and therefore need
  redirects rather than removal?
- Is a static Lua binding extractor worth maintaining, or is a checked inventory
  plus source-drift grep the safer minimal control?
- **Approved in Phase 1:** verify Neovim shortcuts against a pinned revision of
  the external `ahmad9059/nvim` repository before updating them.
- Which installer and service logs should be treated as stable public interfaces?
