# SwayNC

## What It Is

SwayNC provides notification popups and the HyprFlux notification center. Its
own JSON configuration is separate from the Rofi-based HyprFlux Quick Settings
menu.

> Source snapshot: [HyprFlux `f421b6bd`](https://github.com/ahmad9059/HyprFlux/tree/f421b6bd108214079b56c435331ddbbfdfb89591)

## Configuration

### Ownership

| Concern | Owner |
|---|---|
| Package | [`swaync` in the main package batch](https://github.com/ahmad9059/HyprFlux/blob/f421b6bd108214079b56c435331ddbbfdfb89591/base-installer/install-scripts/01-hypr-pkgs.sh#L14-L53) |
| Behavior | [`~/.config/swaync/config.json`](https://github.com/ahmad9059/HyprFlux/blob/f421b6bd108214079b56c435331ddbbfdfb89591/.config/swaync/config.json) |
| Styling | [`~/.config/swaync/style.css`](https://github.com/ahmad9059/HyprFlux/blob/f421b6bd108214079b56c435331ddbbfdfb89591/.config/swaync/style.css) |
| Startup | [`startup-apps.lua`](https://github.com/ahmad9059/HyprFlux/blob/f421b6bd108214079b56c435331ddbbfdfb89591/.config/hypr/UserConfigs/startup-apps.lua#L34-L40) |
| Panel binding | `SUPER+N` in [`configs/keybinds.lua`](https://github.com/ahmad9059/HyprFlux/blob/f421b6bd108214079b56c435331ddbbfdfb89591/.config/hypr/configs/keybinds.lua#L16-L23) |

### Shipped layout

| Setting | Value |
|---|---|
| Notification position | Right, top |
| Notification width | 350 px |
| Control-center width | 360 px |
| Control-center height | 1296 px, fixed rather than viewport-relative |
| Control-center margins | 5 px top, 8 px right |
| Normal timeout | 6 seconds |
| Low and critical timeout | 3 seconds |

The active widget order is:

1. Do-not-disturb
2. Button grid
3. MPRIS media player
4. Notifications title and Clear control
5. Notification list

Volume and backlight labels are present in `widget-config`, but their widgets
are not included in the active list.

### Button grid

| Button | Command owner |
|---|---|
| Power | Opens `Wlogout.sh` |
| Lock | Calls `LockScreen.sh` |
| Exit | Calls the compositor exit command |
| Airplane mode | Calls `AirplaneMode.sh` |
| Mute | Toggles the default PulseAudio sink with `pactl` |

There are no active Wi-Fi, Bluetooth, terminal, browser, file-manager, volume
slider, or backlight slider buttons in the shipped SwayNC grid.

::: warning Exit button
The shipped Exit button still uses `hyprctl dispatch exit`, while HyprFlux's
Lua migration requires the native Lua dispatcher. Treat this button as a known
source defect; use `CTRL+ALT+Delete` for the configured exit path.
:::

### Styling and colors

The CSS styles notification rows, actions, inline replies, MPRIS, DND, title,
and the button grid. Its scrollbar is transparent and zero-width while wheel
scrolling remains available.

The leading color block is generated from the central static palette by
[`utilities/sync-colors.sh`](https://github.com/ahmad9059/HyprFlux/blob/f421b6bd108214079b56c435331ddbbfdfb89591/utilities/sync-colors.sh#L199-L244).
It is injected inline because GTK color definitions do not reliably propagate
through imports. Wallpaper changes do not recolor SwayNC.

## Common Tasks

### Integration

SwayNC starts directly from Hyprland, not from a shipped systemd user service.
Use:

```bash
swaync-client -t -sw
```

or press `SUPER+N` to toggle the panel. The Waybar notification control owns
these mouse actions:

- Left click: toggle the panel.
- Right click: toggle do-not-disturb.

`SUPER+SHIFT+E` opens the separate Rofi-based HyprFlux Quick Settings menu. It
is not a SwayNC widget.

### Refresh and troubleshooting

Reload CSS and configuration:

```bash
swaync-client --reload-css
swaync-client --reload-config
```

Inspect state or toggle DND:

```bash
swaync-client --get-dnd
swaync-client --toggle-dnd
```

For startup failures, stop the current process and launch `swaync` in a
terminal. Do not use `journalctl -u swaync` unless you created your own user
service.

## Related pages

- [Waybar](./waybar.md)
- [Wlogout](./wlogout.md)
- [Hyprlock workflow](./hyprlock.md)
