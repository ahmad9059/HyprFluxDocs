---
title: Waybar
description: The HyprFlux Waybar panel, its layout, module groups, colors, and common interactions.
---

# Waybar

Waybar is the main HyprFlux panel. HyprFlux ships one active horizontal layout, reusable module banks, grouped drawers, and a static generated color palette. It installs `waybar-git` because the workspace module uses Hyprland's Lua dispatcher support.

## Files

```text
~/.config/waybar/
|- config                # active layout and module placement
|- style.css             # imports the default stylesheet
|- Modules               # standard Waybar modules
|- ModulesCustom         # HyprFlux commands and launchers
|- ModulesGroups         # expandable drawers
|- ModulesWorkspaces     # workspace display variants
|- ModulesVertical       # definitions not loaded by default
|- UserModules           # empty extension point
|- hyprflux-colors.css   # generated static palette
`- style/HyprFlux-Default.css
```

The active `config` includes the standard, workspace, custom, group, and user module banks. It does not include `ModulesVertical`, and the desktop and laptop layout files are currently identical.

The repository's `.config/waybar/` directory is canonical. `base-dots/config/waybar/` is a parity mirror, not a second deployment source.

## Active layout

| Region | Modules |
|---|---|
| Left | separators, Cava visualizer, player controls, active-window title |
| Center | window-rewrite workspaces, clock, weather, idle inhibitor |
| Right | application, notification, tray, terminal, updater, laptop, hardware, audio, and status groups |

The expandable groups are defined in `ModulesGroups`:

| Group | Contents |
|---|---|
| Applications | Rofi, wallpaper selector, Thunar, Kitty, browser, quick settings |
| Notifications | SwayNC state and the HyprFlux updater |
| Laptop | Backlight and battery |
| Hardware | Temperature, CPU, power profile, memory, disk |
| Audio | Output volume and microphone |
| Status | Wlogout, lock, Caps Lock, keyboard layout |

`ModulesWorkspaces` contains several display variants, but the active layout uses `hyprland/workspaces#rw`. Its clicks and scroll actions use Hyprland Lua dispatchers, so switching to another variant can change those semantics.

## Colors and styling

Waybar colors do not change with the wallpaper. The default stylesheet imports `hyprflux-colors.css`, which is generated from the central HyprFlux palette by `utilities/sync-colors.sh`.

For source development, edit the central palette and regenerate the outputs:

```bash
./utilities/sync-colors.sh
```

Do not hand-edit `hyprflux-colors.css` in a source contribution. CI verifies the generated output and the `.config`/`base-dots` parity.

## Common interactions

| Control | Action |
|---|---|
| Rofi button | Closes an existing Rofi instance; otherwise opens `drun`, run, file-browser, and window modes |
| Wallpaper button | Middle-click opens the selector; images use AWWW and videos use mpvpaper |
| Terminal button | Resolves the terminal from `user-defaults.lua` and opens Kitty by default |
| SwayNC button | Left click toggles the panel; right click toggles do-not-disturb |
| Player | Previous and play/pause on the mouse buttons; the wheel adjusts volume |
| Hardware controls | Open tools such as `btop`, `nvtop`, or `gnome-system-monitor` |
| Power control | Opens the adaptive Wlogout launcher |
| Lock control | Calls the HyprFlux lock bridge |

The exact commands live in `ModulesCustom` and `ModulesGroups`.

## Reload and troubleshoot

Reload a running bar after you edit it:

```bash
pkill -SIGUSR2 waybar
```

Restart it if a reload is not enough:

```bash
pkill waybar
waybar
```

Run Waybar in a terminal to see module errors:

```bash
waybar -l debug
```

::: warning Current source limitations
The shipped tooltip describes the wallpaper click incorrectly, the updater's visibility guard treats zero as visible, and the inactive vertical power group references an undefined module. The selected horizontal layout stays usable. These are defects in the HyprFlux source, not something you can fix through the configuration files.
:::

## Related pages

- [Rofi](./rofi.md)
- [Wallpapers](./wallpapers.md)
- [SwayNC](./swaync.md)
- [Wlogout](./wlogout.md)
