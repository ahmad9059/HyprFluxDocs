# Lock Screen Workflow

HyprFlux combines logind, Hypridle, and Hyprlock. This page explains the
user-facing workflow; the native configuration blocks, palette variables, and
validation steps live in the [Hyprlock configuration reference](../hyprland/hyprlock.md).

> Source snapshot: [HyprFlux `f421b6bd`](https://github.com/ahmad9059/HyprFlux/tree/f421b6bd108214079b56c435331ddbbfdfb89591)

## Components

| Component | Responsibility |
|---|---|
| `LockScreen.sh` | Requests a logind session lock |
| Hypridle | Receives the lock event and starts Hyprlock if needed |
| Hyprlock | Displays the visual lock screen and authenticates through PAM |
| `hyprlock.conf` | Defines the active visual layout |

`hyprlock` and `hypridle` are installed by the base installer's Hyprland step.
Their configurations and integration scripts are deployed from the canonical
`.config` tree by `modules/02-dotfiles.sh`.

Hypridle and Hyprlock use native `.conf` parsers. They are not Hyprland Lua
modules.

## Manual locking

The normal shortcut is `CTRL+ALT+L`. Wlogout Lock, SwayNC Lock, and Waybar's
normal lock control use the same chain:

```text
LockScreen.sh -> loginctl lock-session -> Hypridle lock_cmd -> Hyprlock
```

The lock command is guarded by `pidof hyprlock || hyprlock`, so repeated events
do not intentionally create multiple lockers.

## Automatic locking

Hypridle starts with the Hyprland session and honors application D-Bus idle
inhibitors. The active timers are:

| Time | Behavior |
|---|---|
| 540 seconds | Show an idle warning notification |
| Activity after warning | Show a return notification |
| 600 seconds | Request a logind session lock |
| Before suspend | Request a logind session lock |

Automatic display power-off and automatic suspend listeners are commented out
in the shipped configuration.

## When Hypridle is disabled

The Waybar idle control can stop Hypridle. This disables idle timers and also
removes HyprFlux's configured consumer for `loginctl lock-session`. The usual
shortcut and UI lock buttons may therefore request a session lock without
starting the visual Hyprlock process.

Use the Waybar idle control's direct-lock action or run:

```bash
hyprlock
```

Restart mediation with:

```bash
hypridle
```

## Which layout is active?

The repository and current installer retain a primary Mario layout at
`hyprlock.conf` and an alternate low-resolution layout at
`hyprlock-1080p.conf`. Bare `hyprlock` uses the Mario layout. The alternate uses
the current wallpaper and adds separate clock labels, keyboard layout, uptime,
battery, and weather.

Launch the alternate explicitly when you want to test that layout. This command
locks the current session immediately:

```bash
hyprlock --config ~/.config/hypr/hyprlock-1080p.conf
```

## Safe customization

For simple visual changes:

1. Back up the active `~/.config/hypr/hyprlock.conf`.
2. Replace asset paths or adjust existing positions in that active file.
3. Keep `$lock_*` palette variables instead of copied color literals.
4. Validate from a spare terminal before ending the current lock process.

The shipped configurations contain confirmed parser errors, so read the
[configuration reference](../hyprland/hyprlock.md) before treating current
source blocks as reusable examples.

## Related pages

- [Hyprlock configuration](../hyprland/hyprlock.md)
- [Hypridle configuration](../hyprland/hypridle.md)
- [Wlogout](./wlogout.md)
