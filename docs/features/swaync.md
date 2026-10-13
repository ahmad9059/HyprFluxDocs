---
title: SwayNC
description: The HyprFlux notification popups and notification center.
---

# SwayNC

SwayNC provides the notification popups and the HyprFlux notification center. Its JSON configuration is separate from the Rofi-based HyprFlux Quick Settings menu.

## Files

| Concern | File |
|---|---|
| Behavior | `~/.config/swaync/config.json` |
| Styling | `~/.config/swaync/style.css` |
| Startup | `~/.config/hypr/UserConfigs/startup-apps.lua` |
| Panel binding | `SUPER+N` in `~/.config/hypr/configs/keybinds.lua` |

The repository's `.config/swaync/` directory is canonical, and `base-dots/config/swaync/` is a parity mirror.

## Shipped layout

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

Volume and backlight labels are present in `widget-config`, but their widgets are not in the active list.

## Button grid

| Button | Command |
|---|---|
| Power | Opens `Wlogout.sh` |
| Lock | Calls `LockScreen.sh` |
| Exit | Calls the compositor exit command |
| Airplane mode | Calls `AirplaneMode.sh` |
| Mute | Toggles the default PulseAudio sink with `pactl` |

There are no active Wi-Fi, Bluetooth, terminal, browser, file-manager, volume-slider, or backlight-slider buttons in the shipped grid.

::: warning Exit button
The shipped Exit button still runs `hyprctl dispatch exit`, but the Lua configuration needs the native Lua dispatcher. Treat this button as a known source defect and use `CTRL+ALT+Delete` for the configured exit path.
:::

## Styling

The CSS styles notification rows, actions, inline replies, MPRIS, DND, the title, and the button grid. Its scrollbar is transparent and zero-width while wheel scrolling stays available.

The leading color block is generated from the central static palette by `utilities/sync-colors.sh`. It is injected inline because GTK color definitions do not reliably propagate through imports. Wallpaper changes do not recolor SwayNC.

## Integration

SwayNC starts directly from Hyprland, not from a shipped systemd user service. Toggle the panel with:

```bash
swaync-client -t -sw
```

Or press `SUPER+N`. The Waybar notification control owns these mouse actions:

- Left click toggles the panel.
- Right click toggles do-not-disturb.

`SUPER+SHIFT+E` opens the separate Rofi-based HyprFlux Quick Settings menu. That is not a SwayNC widget.

## Refresh and troubleshoot

Reload the CSS and configuration:

```bash
swaync-client --reload-css
swaync-client --reload-config
```

Inspect state or toggle DND:

```bash
swaync-client --get-dnd
swaync-client --toggle-dnd
```

If SwayNC does not start, stop the current process and launch `swaync` in a terminal. Do not use `journalctl -u swaync` unless you created your own user service.

## Related pages

- [Waybar](./waybar.md)
- [Wlogout](./wlogout.md)
- [Hyprlock workflow](./hyprlock.md)
