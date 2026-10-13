---
title: Lock Screen Workflow
description: How HyprFlux combines logind, Hypridle, and Hyprlock for locking and idle behavior.
---

# Lock Screen Workflow

HyprFlux combines logind, Hypridle, and Hyprlock. This page explains the workflow you see as a user. The configuration blocks, palette variables, and validation steps are in the [Hyprlock configuration reference](../hyprland/hyprlock.md).

## Components

| Component | Responsibility |
|---|---|
| `LockScreen.sh` | Requests a logind session lock |
| Hypridle | Receives the lock event and starts Hyprlock if needed |
| Hyprlock | Shows the visual lock screen and authenticates through PAM |
| `hyprlock.conf` | Defines the active visual layout |

Hyprlock and Hypridle are installed by the base installer's Hyprland step. Their configurations and integration scripts are deployed from the canonical `.config` tree by `modules/02-dotfiles.sh`. Both use native `.conf` parsers. They are not Hyprland Lua modules.

## Which layout is active

The repository ships a primary Mario layout at `hyprlock.conf` and an alternate low-resolution layout at `hyprlock-1080p.conf`. Bare `hyprlock` uses the Mario layout. The alternate uses the current wallpaper and adds separate clock labels plus keyboard layout, uptime, battery, and weather.

To test the alternate, lock the current session explicitly:

```bash
hyprlock --config ~/.config/hypr/hyprlock-1080p.conf
```

## Automatic locking

Hypridle starts with the Hyprland session and honors application D-Bus idle inhibitors. The active timers are:

| Time | Behavior |
|---|---|
| 540 seconds | Show an idle warning notification |
| Activity after the warning | Show a return notification |
| 600 seconds | Request a logind session lock |
| Before suspend | Request a logind session lock |

Automatic display power-off and automatic suspend listeners are commented out in the shipped configuration.

## Manual locking

The normal shortcut is `CTRL+ALT+L`. Wlogout Lock, SwayNC Lock, and Waybar's normal lock control use the same chain:

```text
LockScreen.sh -> loginctl lock-session -> Hypridle lock_cmd -> Hyprlock
```

The lock command is guarded by `pidof hyprlock || hyprlock`, so repeated events do not create multiple lockers.

## When Hypridle is disabled

The Waybar idle control can stop Hypridle. This disables the idle timers and also removes HyprFlux's configured consumer for `loginctl lock-session`. As a result, the usual shortcut and the UI lock buttons can request a session lock without starting Hyprlock.

Use the Waybar idle control's direct-lock action, or run:

```bash
hyprlock
```

Restart mediation with:

```bash
hypridle
```

## Safe customization

For simple visual changes:

1. Back up the active `~/.config/hypr/hyprlock.conf`.
2. Replace asset paths or adjust existing positions in that file.
3. Keep the `$lock_*` palette variables instead of copying color literals.
4. Validate from a spare terminal before you end the current lock process.

The shipped configurations contain confirmed parser errors, so read the [configuration reference](../hyprland/hyprlock.md) before you treat the current source blocks as reusable examples.

## Related pages

- [Hyprlock configuration](../hyprland/hyprlock.md)
- [Hypridle configuration](../hyprland/hypridle.md)
- [Wlogout](./wlogout.md)
