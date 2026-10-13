---
title: Wlogout
description: The HyprFlux power menu, its actions, and the adaptive launcher.
---

# Wlogout

Wlogout is the HyprFlux power menu. Its layout file owns the six actions, and the HyprFlux launcher script handles toggling and monitor-aware geometry.

## Files

| Concern | File |
|---|---|
| Actions and keyboard letters | `~/.config/wlogout/layout` |
| Appearance | `~/.config/wlogout/style.css` and the bundled PNG assets |
| Adaptive launcher | `~/.config/hypr/scripts/Wlogout.sh` |

The repository's `.config/wlogout/` directory is canonical, and `base-dots/config/wlogout/` is a parity mirror.

## Shipped actions

| Button | Command |
|---|---|
| Lock | `~/.config/hypr/scripts/LockScreen.sh` |
| Reboot | `systemctl reboot` |
| Shutdown | `systemctl poweroff` |
| Logout | `loginctl kill-session $XDG_SESSION_ID` |
| Suspend | `systemctl suspend` |
| Hibernate | `systemctl hibernate` |

The `layout` file is authoritative for the actions. `Wlogout.sh` does not issue the power commands itself.

## Lock action chain

The Lock button deliberately does not run `hyprlock` directly:

```text
Wlogout layout
-> LockScreen.sh
-> loginctl lock-session
-> running Hypridle receives the session-lock event
-> Hypridle starts Hyprlock if it is not already running
```

If you stopped Hypridle, this mediated path no longer starts the visual locker. See [Hyprlock](./hyprlock.md) for the direct fallback and the idle behavior.

## Appearance

The shipped CSS uses Fira Code Medium at 16 pt, rounded transparent buttons, and image assets for each action. Suspend, reboot, and shutdown use the `sleep`, `restart`, and `power` asset names.

The `@logout-*` color declarations are generated from the central static HyprFlux palette. Wallpaper changes do not recolor Wlogout.

## Launch paths

Open the menu with `CTRL+ALT+P`. The Waybar power control and the SwayNC power button call the same launcher:

```bash
~/.config/hypr/scripts/Wlogout.sh
```

The script closes Wlogout if it is already open. At logical heights of 720 px or more, it reads the focused monitor's height and scale. It then calculates top and bottom margins and launches Wlogout through layer shell. It uses three buttons per row from 720 through 1079 logical pixels and six at larger sizes. Below 720 logical pixels it falls back to plain `wlogout`.

Launching `wlogout` directly still reads the layout and actions, but bypasses the adaptive margins.

## Troubleshooting

Run the adaptive launcher in a terminal to see monitor-query or arithmetic errors:

```bash
bash ~/.config/hypr/scripts/Wlogout.sh
```

The script assumes `hyprctl`, `jq`, and a focused monitor are available. Use the direct command only to isolate the launcher geometry from Wlogout itself:

```bash
wlogout --protocol layer-shell
```

## Related pages

- [Hyprlock workflow](./hyprlock.md)
- [Hyprlock configuration](../hyprland/hyprlock.md)
- [SwayNC](./swaync.md)
