# Waybar

Waybar is the primary HyprFlux panel. HyprFlux ships one active horizontal
layout, reusable module banks, grouped drawers, and a static generated color
palette.

> Source snapshot: [HyprFlux `f421b6bd`](https://github.com/ahmad9059/HyprFlux/tree/f421b6bd108214079b56c435331ddbbfdfb89591)

## Ownership

| Concern | Owner |
|---|---|
| Package | [`waybar-git` in the AUR package batch](https://github.com/ahmad9059/HyprFlux/blob/f421b6bd108214079b56c435331ddbbfdfb89591/base-installer/install-scripts/01-hypr-pkgs.sh#L132-L145) |
| Installed configuration | `~/.config/waybar/`, copied by [`modules/02-dotfiles.sh`](https://github.com/ahmad9059/HyprFlux/blob/f421b6bd108214079b56c435331ddbbfdfb89591/modules/02-dotfiles.sh#L9-L45) |
| Layout entrypoint | [`~/.config/waybar/config`](https://github.com/ahmad9059/HyprFlux/blob/f421b6bd108214079b56c435331ddbbfdfb89591/.config/waybar/config) |
| Stylesheet entrypoint | [`~/.config/waybar/style.css`](https://github.com/ahmad9059/HyprFlux/blob/f421b6bd108214079b56c435331ddbbfdfb89591/.config/waybar/style.css) |
| Generated colors | [`hyprflux-colors.css`](https://github.com/ahmad9059/HyprFlux/blob/f421b6bd108214079b56c435331ddbbfdfb89591/.config/waybar/hyprflux-colors.css) |
| Install-time mutation | Temperature sensor paths may be rewritten by [`modules/16-hardware-detect.sh`](https://github.com/ahmad9059/HyprFlux/blob/f421b6bd108214079b56c435331ddbbfdfb89591/modules/16-hardware-detect.sh#L459-L536) |

HyprFlux installs `waybar-git` because its workspace module uses Hyprland's Lua
dispatcher support. The repository's `.config/waybar/` directory is canonical;
`base-dots/config/waybar/` is a parity mirror, not a second deployment source.

## Configuration graph

```text
~/.config/waybar/
|- config                    # active layout and module placement
|- style.css                 # imports the default stylesheet
|- Modules                   # standard Waybar modules
|- ModulesCustom             # HyprFlux commands and launchers
|- ModulesGroups             # expandable drawers
|- ModulesWorkspaces         # workspace display variants
|- ModulesVertical           # definitions not loaded by default
|- UserModules               # empty extension point
|- hyprflux-colors.css       # generated static palette
`- style/HyprFlux-Default.css
```

The active [`config`](https://github.com/ahmad9059/HyprFlux/blob/f421b6bd108214079b56c435331ddbbfdfb89591/.config/waybar/config#L1-L55)
includes the standard, workspace, custom, group, and user module banks. It does
not include `ModulesVertical`. The desktop and laptop layout files are currently
identical.

## Active layout

| Region | Modules |
|---|---|
| Left | separators, Cava visualizer, player controls, active-window title |
| Center | window-rewrite workspaces, clock, weather, idle inhibitor |
| Right | application, notification, tray, terminal, updater, laptop, hardware, audio, and status groups |

The expandable groups are defined in
[`ModulesGroups`](https://github.com/ahmad9059/HyprFlux/blob/f421b6bd108214079b56c435331ddbbfdfb89591/.config/waybar/ModulesGroups):

| Group | Contents |
|---|---|
| Applications | Rofi, wallpaper selector, Thunar, Kitty, browser, quick settings |
| Notifications | SwayNC state and HyprFlux updater |
| Laptop | Backlight and battery |
| Hardware | Temperature, CPU, power profile, memory, disk |
| Audio | Output volume and microphone |
| Status | Wlogout, lock, Caps Lock, keyboard layout |

`ModulesWorkspaces` contains several display variants, but the active layout
uses `hyprland/workspaces#rw`. Its clicks and scroll actions use Hyprland Lua
dispatchers; changing to another variant can change those semantics.

## Common interactions

| Control | Action |
|---|---|
| Rofi button | Closes an existing Rofi instance; otherwise opens `drun`, run, file-browser, and window modes |
| Wallpaper button | Middle-click opens the selector; images use AWWW and videos use mpvpaper |
| Terminal button | Resolves the terminal from `user-defaults.lua` and opens Kitty by default |
| SwayNC button | Left click toggles the panel; right click toggles do-not-disturb |
| Player | Previous/play-next on mouse buttons; wheel adjusts volume |
| Hardware controls | Open tools such as `btop`, `nvtop`, or `gnome-system-monitor` |
| Power control | Opens the adaptive Wlogout launcher |
| Lock control | Calls the HyprFlux lock bridge |

The exact commands live in
[`ModulesCustom`](https://github.com/ahmad9059/HyprFlux/blob/f421b6bd108214079b56c435331ddbbfdfb89591/.config/waybar/ModulesCustom)
and
[`ModulesGroups`](https://github.com/ahmad9059/HyprFlux/blob/f421b6bd108214079b56c435331ddbbfdfb89591/.config/waybar/ModulesGroups).

## Colors and styling

Waybar colors do not change with the wallpaper. The default stylesheet imports
`hyprflux-colors.css`, which is generated from HyprFlux's central static palette
by [`utilities/sync-colors.sh`](https://github.com/ahmad9059/HyprFlux/blob/f421b6bd108214079b56c435331ddbbfdfb89591/utilities/sync-colors.sh#L112-L173).

For source development, edit the central palette and regenerate outputs:

```bash
./utilities/sync-colors.sh
```

Do not hand-edit `hyprflux-colors.css` in a source contribution. CI verifies
generated output and `.config`/`base-dots` parity.

## Reload and troubleshooting

Reload a running bar after editing:

```bash
pkill -SIGUSR2 waybar
```

Restart it if reload is insufficient:

```bash
pkill waybar
waybar
```

Run Waybar in a terminal to inspect module errors:

```bash
waybar -l debug
```

::: warning Current source limitations
The shipped tooltip describes the wallpaper click incorrectly, the updater
visibility guard also treats zero as visible, and the inactive vertical power
group references an undefined module. The selected horizontal layout remains
usable; these defects must be fixed in HyprFlux source rather than worked
around in documentation.
:::

## Related pages

- [Rofi](./rofi.md)
- [Wallpapers](./wallpapers.md)
- [SwayNC](./swaync.md)
- [Wlogout](./wlogout.md)
