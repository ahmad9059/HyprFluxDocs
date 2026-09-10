# `hypridle.conf`

Path: `~/.config/hypr/hypridle.conf`

[View the pinned v1.5.0 source](https://github.com/ahmad9059/HyprFlux/blob/f421b6bd108214079b56c435331ddbbfdfb89591/.config/hypr/hypridle.conf).

Hypridle is a separate daemon and keeps its native `.conf` format. HyprFlux
starts it from `UserConfigs/startup-apps.lua`.

## General Behavior

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

The shipped `after_sleep_cmd` attempts to restore DPMS, but its current Lua
dispatcher argument is not shell-quoted and is therefore invalid shell syntax.
Use a validated form when correcting it in your local configuration.

## Active Listeners

The current file registers two listeners:

| Timeout | Action |
|---|---|
| 540 seconds | Show an idle warning; show a return notification on activity |
| 600 seconds | Run `loginctl lock-session`, which triggers `lock_cmd` |

Screen-off and suspend listeners are present only as disabled examples.

## DPMS Commands in Lua Mode

When enabling a DPMS listener, pass the complete Lua dispatcher expression as
one quoted shell argument:

```ini
listener {
    timeout = 630
    on-timeout = hyprctl dispatch 'hl.dsp.dpms({ action = "disable" })'
    on-resume = hyprctl dispatch 'hl.dsp.dpms({ action = "enable" })'
}
```

Test the command independently before relying on it for wake behavior. The
unquoted `on`/`off` examples in the v1.5.0 file should not be copied.

## Manual Lock Flow

The base `CTRL+ALT+L` binding runs `LockScreen.sh`, which requests
`loginctl lock-session`. Hypridle receives the request and runs its guarded
`lock_cmd`. Waybar also exposes controls for Hypridle and locking.

## Validation

Hypridle does not provide a parser-only mode. From a non-graphical shell:

```bash
WAYLAND_DISPLAY=__invalid__ hypridle \
  --config ~/.config/hypr/hypridle.conf --verbose
```

Confirm that the intended listeners register before the expected Wayland
connection failure. Validate every embedded shell command separately.
