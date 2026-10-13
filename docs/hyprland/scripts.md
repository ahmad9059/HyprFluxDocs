---
title: Scripts and Utilities
description: The maintained HyprFlux desktop scripts, their entry points, flags, dependencies, and known limits.
---

# Scripts and Utilities

HyprFlux 1.5.0 ships two script directories:

- `~/.config/hypr/scripts/` is managed by HyprFlux updates.
- `~/.config/hypr/UserScripts/` is the customization layer and is not replaced by updates.

For personal changes, copy a managed script into `UserScripts`, edit that copy, and point its binding or Waybar command at the new path. A `UserScripts` copy does not override the managed script automatically.

## Supported entry points

These scripts are called by active keybindings, the startup configuration, Hyprlock, or the selected Waybar modules.

### Menus and launchers

| Entry point | What it does | Requirements |
|---|---|---|
| `HyprFlux_Quick_Settings.sh` | Opens configuration files and selected desktop tools. | Rofi and the terminal or editor from `user-defaults.lua`. Some displayed entries have no handler, so unsupported selections do nothing. |
| `ClipManager.sh` | Selects, deletes, or clears `cliphist` entries and copies a selection. | Rofi, `cliphist`, `wl-copy`. `CTRL+Delete` deletes one entry, `ALT+Delete` clears all. |
| `RofiEmoji.sh` | Searches embedded emoji data and copies the chosen field. | Rofi and `wl-copy`. Its self-extracting data makes `bash -n` report a false positive, so source CI excludes it. |
| `KeyBinds.sh` | Shows the live `hyprctl binds -j` result. | Running Hyprland, Python 3, Rofi. Selecting a row does nothing. |
| `KeyHints.sh` | Opens a curated shortcut sheet. | Yad. It is shorter than the live binding list. |
| `WaybarScripts.sh` | Launches `btop`, `nvtop`, `nmtui`, the configured terminal, or the file manager for Waybar. | `--btop`, `--nvtop`, `--nmtui`, `--term`, `--files`. |
| `Dropterminal.sh` | Creates or toggles a floating terminal through a scratchpad workspace. | A terminal command argument, Hyprland, and `jq`. `-d` enables debug output. |

### Session and window controls

| Entry point | What it does | Boundary |
|---|---|---|
| `LockScreen.sh` | Calls `loginctl lock-session`; Hypridle responds with Hyprlock. | It does not launch Hyprlock directly. |
| `Wlogout.sh` | Opens the Wlogout power menu with margins derived from the focused output. | Requires `hyprctl`, `jq`, `awk`, and Wlogout. |
| `KillActiveProcess.sh` | Reads the active-window PID and sends `kill`. | Forceful, compared with `SUPER+Q`. Unsaved work may be lost. |
| `ChangeLayout.sh` | Cycles Dwindle, Master, and Scrolling in compositor memory. | Requires `jq`. The choice is not written to `user-settings.lua`. |
| `ChangeBlur.sh` | Toggles between the shipped low and normal blur values in memory. | Requires `jq`. A config reload restores the file-backed values. |
| `GameMode.sh` | Temporarily disables visual effects and saves the previous state. | State is in `$XDG_RUNTIME_DIR/gamemode.state`. Also stops and restarts AWWW. |
| `Refresh.sh` | Stops and starts Waybar and SwayNC, and closes Rofi. | A component restart, not a Hyprland config reload. |
| `Hypridle.sh` | Emits Waybar JSON or toggles the Hypridle process. | Only `status` and `toggle` are accepted. |

### Media, input, and capture

| Entry point | Accepted input | Behavior |
|---|---|---|
| `Volume.sh` | `--get`, `--inc`, `--dec`, `--toggle`, `--toggle-mic`, `--get-icon`, `--get-mic-icon`, `--mic-inc`, `--mic-dec` | Uses `pamixer`. Output changes by 5% and may boost to 150%. `--mic-dec` contains a bad `toggle-mic` call when muted, a known source defect. |
| `MediaCtrl.sh` | `--nxt`, `--prv`, `--pause`, `--stop` | Uses `playerctl` and sends playback notifications. |
| `Brightness.sh` | `--get`, `--inc`, `--dec` | Uses `brightnessctl`. Changes by 10% and clamps to 5% to 95%. An unknown or missing argument prints the current value. |
| `BrightnessKbd.sh` | `--get`, `--inc`, `--dec` | Targets `*::kbd_backlight`. Changes by 30%. |
| `TouchPad.sh` | No arguments | Toggles one configured device and stores state in `$XDG_RUNTIME_DIR/touchpad.status`. The shipped device name is maintainer-specific. |
| `SwitchKeyboardLayout.sh` | No arguments | Cycles the layouts from `user-settings.lua` for non-ignored keyboards. The active Waybar module calls it; its direct keybinding is commented out. |
| `ScreenShot.sh` | `--now`, `--in5`, `--in10`, `--win`, `--area`, `--active`, `--save-area` | Saves under the XDG Pictures `Screenshots` directory and copies the image with `wl-copy`. See [Hyprland Keybindings](/keybindings/hyprland#screenshots). |
| `Sounds.sh` | `--screenshot`, `--volume`, `--error` | Internal notification-sound helper. Uses `pw-play`, then `pa-play`. |
| `AirplaneMode.sh` | No arguments | Blocks or unblocks Wi-Fi with `rfkill`. It does not change Bluetooth. |
| `Battery.sh` | No arguments | Prints status for any `BAT0` through `BAT3` sysfs battery. It does not implement percentage or time flags, or warnings. |

### Waybar helpers

`WaybarCava.sh` is the selected custom Cava module's output adapter. It writes a temporary Cava configuration and converts raw values to bar glyphs. `WaybarScripts.sh`, `Hypridle.sh`, the brightness, volume, and Wlogout scripts, and the update and wallpaper scripts are also called from Waybar. See [Waybar](/features/waybar) for the selected module composition.

## Wallpapers and visual presets

Wallpaper selection, effects, randomization, video handling, and automatic rotation are documented together on [Wallpapers](/features/wallpapers). Their main entry points are in `UserScripts`, while `WallpaperAwww.sh` is an internal cache synchronizer used after AWWW changes.

`Animations.sh` copies a selected preset to `user-animations.lua` and reloads Hyprland. It then calls `RefreshNoWaybar.sh`, which still invokes the removed `WallpaperSwww.sh`. The animation is already applied, but that refresh tail is stale.

`MonitorProfiles.sh` similarly copies a `.lua` profile into `monitors.lua` and then calls the same stale refresh helper. That helper does not run `hyprctl reload`, so selecting a profile is not a reliable live-apply workflow. Prefer `nwg-displays`, or reload explicitly after you review the generated file. See [Hardware and Generated State](/general/hardware#displays).

## Update and recovery tools

| Script | Scope | Guidance |
|---|---|---|
| `HyprFluxUpdate.sh` | Waybar and Quick Settings update prompt | Compares a local version marker with scraped GitHub HTML, then may `git stash`, pull, and run `dotsSetup.sh`. Review local changes first. |
| `Distro_update.sh` | Waybar package update launcher | The project supports Arch Linux. The script contains DNF, APT, and Zypper branches, but those distributions are not support claims. |
| `PortalHyprland.sh` | Manual portal recovery | Force-kills several portal implementations and starts binaries from two possible paths. Use it only to diagnose portal startup. |
| `Polkit.sh` | Startup helper | Starts the first installed authentication agent from a path list. Called by `startup-apps.lua`. |

## Managed script inventory

Review these categories when you look for a script:

| Category | Scripts |
|---|---|
| Public entry points | `AirplaneMode.sh`, `Animations.sh`, `Brightness.sh`, `BrightnessKbd.sh`, `ChangeBlur.sh`, `ChangeLayout.sh`, `ClipManager.sh`, `Distro_update.sh`, `Dropterminal.sh`, `GameMode.sh`, `HyprFlux_Quick_Settings.sh`, `HyprFluxUpdate.sh`, `Hypridle.sh`, `KeyBinds.sh`, `KeyHints.sh`, `KillActiveProcess.sh`, `LockScreen.sh`, `MediaCtrl.sh`, `MonitorProfiles.sh`, `Refresh.sh`, `RofiEmoji.sh`, `ScreenShot.sh`, `SwitchKeyboardLayout.sh`, `TouchPad.sh`, `Volume.sh`, `WaybarScripts.sh`, `Wlogout.sh` |
| Output and internal helpers | `Battery.sh`, `Polkit.sh`, `Sounds.sh`, `WallpaperAwww.sh`, `WaybarCava.sh` |
| Manual recovery only | `PortalHyprland.sh` |
| Present but not a supported path | `RefreshNoWaybar.sh`, `Tak0-Per-Window-Switch.sh` |

`Tak0-Per-Window-Switch.sh` has only a commented binding. It also starts its listener without the `--listener` argument that its duplicate-process check expects, so it is not a supported workflow.

## UserScripts scope

The shipped `UserScripts` entries are examples or owner-specific workflows, not a stable public automation API:

| Scope | Entries |
|---|---|
| Wallpaper workflow | `WallpaperSelect.sh`, `WallpaperEffects.sh`, `WallpaperRandom.sh`, `WallpaperAutoChange.sh` |
| General customizable examples | `RofiCalc.sh`, `RofiBeats.sh`, `GitRepoClone.sh`, `TmuxifierProjects.sh`, `Toggle-tuned.sh`, `Weather.py`, `Weather.sh` |
| Maintainer-private | `SyncBlog.sh`, `SyncDotfiles.sh`, `ObsidianGenerate.sh`, `notes-ai` |
| Policy file | `00-Readme` |

The private scripts contain machine-specific paths or publishing assumptions. Do not run them unchanged. `Weather.py` is the selected Waybar implementation, and `Weather.sh` remains an alternate example.

## Removed names

The current tree has no `DarkLight.sh`, `Kitty_themes.sh`, `RofiSearch.sh`, `Tak0-Autodispatch.sh`, `WallustSwww.sh`, `WallpaperSwww.sh`, `WaybarLayout.sh`, or `WaybarStyles.sh`. Old links or tutorials that name those files describe earlier releases. HyprFlux now uses AWWW for active wallpaper startup, one selected Waybar composition, generated palette files, and Lua for compositor configuration.

## Inspect a script safely

Read the script before you run it, especially the update, kill, recovery, and `UserScripts` workflows:

```bash
less ~/.config/hypr/scripts/Volume.sh
bash -n ~/.config/hypr/scripts/Volume.sh
command -v pamixer notify-send
```

Do not assume every script accepts `--help`, `--version`, `--verbose`, or `--dry-run`. Only the arguments listed on this page are implemented by the current source.
