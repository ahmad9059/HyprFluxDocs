---
title: hypridle.conf
description: The native Hypridle configuration, its listeners, and the correct Lua dispatcher syntax for DPMS commands.
---

# `hypridle.conf`

Path: `~/.config/hypr/hypridle.conf`

[View the source](https://github.com/ahmad9059/HyprFlux/blob/0f62647d95178eefa7cf8cd1b66760e93a260ef7/.config/hypr/hypridle.conf).

Hypridle is a separate daemon and keeps its native `.conf` format. HyprFlux starts it from `UserConfigs/startup-apps.lua`.

## General behavior

```ini
general {
    lock_cmd = pidof hyprlock || hyprlock
    before_sleep_cmd = loginctl lock-session
    ignore_dbus_inhibit = false
}
```

- A logind lock request starts Hyprlock only if it is not already running.
- The session locks before suspend.
- D-Bus idle inhibitors from applications are honored.

The shipped `after_sleep_cmd` tries to restore DPMS, but its Lua dispatcher argument is not shell-quoted, so it is invalid shell syntax. Use a validated form when you correct it locally.

## Active listeners

The current file registers two listeners:

| Timeout | Action |
|---|---|
| 540 seconds | Show an idle warning. Show a return notification on activity |
| 600 seconds | Run `loginctl lock-session`, which triggers `lock_cmd` |

The screen-off and suspend listeners are present only as disabled examples.

## DPMS commands in Lua mode

When you enable a DPMS listener, pass the complete Lua dispatcher expression as one quoted shell argument:

```ini
listener {
    timeout = 630
    on-timeout = hyprctl dispatch 'hl.dsp.dpms({ action = "off" })'
    on-resume = hyprctl dispatch 'hl.dsp.dpms({ action = "on" })'
}
```

Test the command on its own before you rely on it for wake behavior. Do not copy the unquoted `on` and `off` examples from the v1.5.0 file.

## Manual lock flow

The base `CTRL+ALT+L` binding runs `LockScreen.sh`, which requests `loginctl lock-session`. Hypridle receives the request and runs its guarded `lock_cmd`. Waybar also exposes controls for Hypridle and locking.

```text
loginctl lock-session -> running Hypridle -> guarded Hyprlock process
```

Stopping Hypridle disables the warning and lock timers, and it removes HyprFlux's configured consumer for the normal session-lock request. The usual shortcut, Wlogout Lock, SwayNC Lock, and Waybar's normal lock button can then request a lock without starting the visual locker. Waybar's direct-lock mouse action is the exception, because it runs `hyprlock` itself.

The shipped `Hypridle.sh toggle` starts Hypridle in the foreground of the invoking command when it turns the daemon back on.

## Validation

Hypridle has no parser-only mode. From a non-graphical shell:

```bash
WAYLAND_DISPLAY=__invalid__ hypridle \
  --config ~/.config/hypr/hypridle.conf --verbose
```

Confirm that the intended listeners register before the expected Wayland connection failure. Validate every embedded shell command separately.
