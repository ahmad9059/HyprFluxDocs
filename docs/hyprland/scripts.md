---
title: Scripts and Utilities - HyprFlux
description: Source-verified workflows, dependencies, flags, ownership, and known limitations for HyprFlux desktop scripts.
---

# Scripts And Utilities

HyprFlux source revision
[`f421b6b`](https://github.com/ahmad9059/HyprFlux/tree/f421b6bd108214079b56c435331ddbbfdfb89591)
ships two script directories:

- `~/.config/hypr/scripts/` is managed by HyprFlux updates.
- `~/.config/hypr/UserScripts/` is the customization layer and is not replaced
  by upgrades.

For personal changes, copy a managed script into `UserScripts`, edit that copy,
and update its binding or Waybar command to the new path. A `UserScripts` copy
does not override the managed script automatically.

## Supported Entry Points

These are called by active keybindings, startup configuration, Hyprlock, or the
selected Waybar modules.

### Menus And Launchers

| Entry point | What it does | Runtime requirements |
|---|---|---|
| `HyprFlux_Quick_Settings.sh` | Opens configuration files and selected desktop tools. | Rofi and the terminal/editor from `user-defaults.lua`. Several displayed entries currently have no handler; unsupported selections simply return. |
| `ClipManager.sh` | Selects, deletes, or clears `cliphist` entries and copies a selection. | Rofi, `cliphist`, `wl-copy`; `CTRL+Delete` deletes one entry and `ALT+Delete` clears all. |
| `RofiEmoji.sh` | Searches embedded emoji data and copies the first field. | Rofi and `wl-copy`. Its self-extracting data makes `bash -n` report a false positive, so source CI explicitly excludes it. |
| `KeyBinds.sh` | Displays the live `hyprctl binds -j` result. | Running Hyprland, Python 3, Rofi. Choosing a row intentionally performs no action. |
| `KeyHints.sh` | Opens a curated shortcut sheet. | Yad. It is shorter than the live binding list. |
| `WaybarScripts.sh` | Launches `btop`, `nvtop`, `nmtui`, the configured terminal, or file manager for Waybar. | `--btop`, `--nvtop`, `--nmtui`, `--term`, `--files`; corresponding applications. |
| `Dropterminal.sh` | Creates or toggles a floating terminal through a scratchpad workspace. | A terminal command argument, Hyprland, and `jq`; `-d` enables debug output. |

### Session And Window Controls

| Entry point | What it does | Important boundary |
|---|---|---|
| `LockScreen.sh` | Calls `loginctl lock-session`; Hypridle responds with Hyprlock. | It does not launch Hyprlock directly. |
| `Wlogout.sh` | Opens the Wlogout power menu with margins derived from the focused output. | Requires `hyprctl`, `jq`, `awk`, and Wlogout. |
| `KillActiveProcess.sh` | Reads the active-window PID and sends `kill`. | This is forceful compared with `SUPER+Q`; unsaved work may be lost. |
| `ChangeLayout.sh` | Cycles Dwindle, Master, and Scrolling in compositor memory. | Requires `jq`; the choice is not persisted to `user-settings.lua`. |
| `ChangeBlur.sh` | Toggles between the shipped low and normal blur values in memory. | Requires `jq`; reloading the config restores file-backed values. |
| `GameMode.sh` | Temporarily disables visual effects and saves the prior state. | State is stored in `$XDG_RUNTIME_DIR/gamemode.state`; it also stops/restarts AWWW. |
| `Refresh.sh` | Stops and starts Waybar and SwayNC and closes Rofi. | This is a component restart, not a Hyprland config reload. |
| `Hypridle.sh` | Emits Waybar JSON or toggles the Hypridle process. | Only `status` and `toggle` are accepted. |

### Media, Input, And Capture

| Entry point | Accepted input | Behavior |
|---|---|---|
| `Volume.sh` | `--get`, `--inc`, `--dec`, `--toggle`, `--toggle-mic`, `--get-icon`, `--get-mic-icon`, `--mic-inc`, `--mic-dec` | Uses `pamixer`; output changes by 5% and may boost to 150%. `--mic-dec` contains a bad `toggle-mic` call when muted, a known source defect. |
| `MediaCtrl.sh` | `--nxt`, `--prv`, `--pause`, `--stop` | Uses `playerctl` and sends playback notifications. |
| `Brightness.sh` | `--get`, `--inc`, `--dec` | Uses `brightnessctl`; changes by 10% and clamps to 5%-95%. Unknown or missing input prints the current value. |
| `BrightnessKbd.sh` | `--get`, `--inc`, `--dec` | Targets `*::kbd_backlight`; changes by 30%. Unknown or missing input prints the current value. |
| `TouchPad.sh` | No arguments | Toggles one configured device and stores state in `$XDG_RUNTIME_DIR/touchpad.status`. The shipped device name is maintainer-specific. |
| `SwitchKeyboardLayout.sh` | No arguments | Cycles layouts from `user-settings.lua` for non-ignored keyboards. The active Waybar module calls it; its direct keybinding is commented out. |
| `ScreenShot.sh` | `--now`, `--in5`, `--in10`, `--win`, `--area`, `--active`, `--swappy` | Saves under the XDG Pictures `Screenshots` directory and copies image data with `wl-copy`. See [Hyprland Keybindings](/keybindings/hyprland#screenshots). |
| `Sounds.sh` | `--screenshot`, `--volume`, `--error` | Internal notification-sound helper; uses `pw-play` then `pa-play`. |
| `AirplaneMode.sh` | No arguments | Blocks or unblocks Wi-Fi with `rfkill`. It does **not** change Bluetooth state. |
| `Battery.sh` | No arguments | Prints status for any `BAT0` through `BAT3` sysfs battery. It does not implement percentage/time flags or warnings. |

### Waybar Helpers

`WaybarCava.sh` is the selected custom Cava module's output adapter. It writes a
temporary Cava configuration and converts raw values to bar glyphs.
`WaybarScripts.sh`, `Hypridle.sh`, brightness, volume, Wlogout, update, and
wallpaper scripts are also called from Waybar. See [Waybar](/features/waybar)
for the selected module composition.

## Wallpapers And Visual Presets

Wallpaper selection, effects, randomization, video handling, and automatic
rotation are documented together on [Wallpapers](/features/wallpapers). Their
main entry points are in `UserScripts`, while `WallpaperAwww.sh` is an internal
cache synchronizer used after AWWW changes.

`Animations.sh` copies a selected preset to `user-animations.lua` and reloads
Hyprland. It then calls `RefreshNoWaybar.sh`, which still invokes the removed
`WallpaperSwww.sh`; the animation has already been applied, but that refresh
tail is stale.

`MonitorProfiles.sh` similarly copies a `.lua` profile into `monitors.lua`, then
calls the same stale refresh helper. The helper does not run `hyprctl reload`,
so selecting a profile is not a reliable live-apply workflow. Prefer
`nwg-displays`, or reload explicitly after reviewing the generated file. See
[Hardware and Generated State](/general/hardware#displays).

## Update And Recovery Tools

| Script | Scope | Guidance |
|---|---|---|
| `HyprFluxUpdate.sh` | Waybar and Quick Settings update prompt | Compares a local version marker with scraped GitHub HTML, then may `git stash`, pull, and run `dotsSetup.sh`. Review local changes first; use the documented installation/update flow when predictability matters. |
| `Distro_update.sh` | Waybar package update launcher | The project supports Arch Linux. Although the script contains DNF, APT, and Zypper branches, those distributions are not HyprFlux support claims. |
| `PortalHyprland.sh` | Manual portal recovery | Force-kills several portal implementations and starts binaries from two possible paths. Use only to diagnose portal startup, not as normal autostart. |
| `Polkit.sh` | Startup implementation detail | Starts the first installed authentication agent from a path list. It is called by `startup-apps.lua`. |

## Complete Managed Inventory

All 35 entries in `~/.config/hypr/scripts/` have a reviewed outcome:

| Outcome | Scripts |
|---|---|
| Public entry points | `AirplaneMode.sh`, `Animations.sh`, `Brightness.sh`, `BrightnessKbd.sh`, `ChangeBlur.sh`, `ChangeLayout.sh`, `ClipManager.sh`, `Distro_update.sh`, `Dropterminal.sh`, `GameMode.sh`, `HyprFlux_Quick_Settings.sh`, `HyprFluxUpdate.sh`, `Hypridle.sh`, `KeyBinds.sh`, `KeyHints.sh`, `KillActiveProcess.sh`, `LockScreen.sh`, `MediaCtrl.sh`, `MonitorProfiles.sh`, `Refresh.sh`, `RofiEmoji.sh`, `ScreenShot.sh`, `SwitchKeyboardLayout.sh`, `TouchPad.sh`, `Volume.sh`, `WaybarScripts.sh`, `Wlogout.sh` |
| Output/internal helpers | `Battery.sh`, `Polkit.sh`, `Sounds.sh`, `WallpaperAwww.sh`, `WaybarCava.sh` |
| Manual recovery only | `PortalHyprland.sh` |
| Present but not a supported path | `RefreshNoWaybar.sh`, `Tak0-Per-Window-Switch.sh` |

`Tak0-Per-Window-Switch.sh` has only a commented binding. It also starts its
listener without the `--listener` argument that its duplicate-process check
expects, so it is not documented as a supported workflow.

## UserScripts Scope

The 16 shipped `UserScripts` entries are examples or owner-specific workflows,
not a stable public automation API:

| Scope | Entries |
|---|---|
| Wallpaper workflow | `WallpaperSelect.sh`, `WallpaperEffects.sh`, `WallpaperRandom.sh`, `WallpaperAutoChange.sh` |
| General customizable examples | `RofiCalc.sh`, `RofiBeats.sh`, `GitRepoClone.sh`, `TmuxifierProjects.sh`, `Toggle-tuned.sh`, `Weather.py`, `Weather.sh` |
| Maintainer-private | `SyncBlog.sh`, `SyncDotfiles.sh`, `ObsidianGenerate.sh`, `notes-ai` |
| Policy file | `00-Readme` |

The private scripts contain machine-specific paths or publishing assumptions.
Do not run them unchanged. `Weather.py` is the selected Waybar implementation;
`Weather.sh` remains an alternate example.

## Removed Or Retired Names

The current tree has no `DarkLight.sh`, `Kitty_themes.sh`, `RofiSearch.sh`,
`Tak0-Autodispatch.sh`, `WallustSwww.sh`, `WallpaperSwww.sh`,
`WaybarLayout.sh`, or `WaybarStyles.sh`. Old links or tutorials naming those
files describe earlier releases. HyprFlux now uses AWWW for active wallpaper
startup, one selected Waybar composition, generated palette files, and Lua for
compositor configuration.

## Inspect A Script Safely

Read the script before invoking it, especially update, kill, recovery, and
`UserScripts` workflows:

```bash
less ~/.config/hypr/scripts/Volume.sh
bash -n ~/.config/hypr/scripts/Volume.sh
command -v pamixer notify-send
```

Do not assume every script accepts `--help`, `--version`, `--verbose`, or
`--dry-run`; only the arguments listed on this page are implemented by the
current source.
