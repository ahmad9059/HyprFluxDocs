# `startup-apps.lua`

Path: `~/.config/hypr/UserConfigs/startup-apps.lua`

[View the pinned v1.5.0 source](https://github.com/ahmad9059/HyprFlux/blob/f421b6bd108214079b56c435331ddbbfdfb89591/.config/hypr/UserConfigs/startup-apps.lua).

This module registers applications to start when the compositor session begins.
It replaces old `exec-once` entries with a `hyprland.start` callback.

## Startup Pattern

```lua
local Home = os.getenv("HOME")
local scriptsDir = Home .. "/.config/hypr/scripts"

hl.on("hyprland.start", function()
    hl.exec_cmd("waybar")
    hl.exec_cmd(scriptsDir .. "/Polkit.sh")
end)
```

`hl.exec_cmd` starts commands asynchronously. Do not add shell `&` or `disown`
merely to background each command.

## Active Startup Commands

The current module starts:

1. `awww-daemon --format xrgb`
2. D-Bus and systemd environment imports
3. the HyprFlux Polkit helper
4. NetworkManager's tray applet
5. SwayNC
6. Waybar
7. text and image clipboard watchers for Cliphist
8. Hypridle

QuickShell, AGS, and `swww-daemon` are not part of the current startup path.
Video wallpaper through mpvpaper and wallpaper rotation are present only as
disabled examples.

## Add a Startup Application

Add a command inside the existing callback:

```lua
hl.on("hyprland.start", function()
    hl.exec_cmd("waybar")
    hl.exec_cmd("my-session-application --flag")
end)
```

Prefer one callback per coherent startup sequence. If one command depends on
another being ready, express that dependency in one script or a systemd user
unit rather than assuming asynchronous commands finish in declaration order.

System services and persistent user daemons generally belong in systemd. Use
this module for applications tied directly to the Hyprland session.

## Paths and Shell Expansion

Lua does not expand `$HOME` inside a normal string. Build paths with
`os.getenv("HOME")`. If a command needs shell features such as `||`, pipes, or
redirection, quote it as a complete shell command and test it independently.

## Validation

```bash
luac -p ~/.config/hypr/UserConfigs/startup-apps.lua
Hyprland --config ~/.config/hypr/hyprland.lua --verify-config
```

Reloading validates registration, but session-start callbacks are intended for
a new Hyprland session. Do not repeatedly log out while the complete config is
still failing validation.
