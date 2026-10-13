---
title: startup-apps.lua
description: The HyprFlux module that starts session applications when Hyprland loads.
---

# `startup-apps.lua`

Path: `~/.config/hypr/UserConfigs/startup-apps.lua`

[View the source](https://github.com/ahmad9059/HyprFlux/blob/0f62647d95178eefa7cf8cd1b66760e93a260ef7/.config/hypr/UserConfigs/startup-apps.lua).

This module registers the applications that start when the compositor session begins. It replaces the old `exec-once` entries with a `hyprland.start` callback.

## Startup pattern

```lua
local Home = os.getenv("HOME")
local scriptsDir = Home .. "/.config/hypr/scripts"

hl.on("hyprland.start", function()
    hl.exec_cmd("waybar")
    hl.exec_cmd(scriptsDir .. "/Polkit.sh")
end)
```

`hl.exec_cmd` starts commands asynchronously. Do not add a shell `&` or `disown` to background each command.

## Active startup commands

The current module starts:

1. `awww-daemon --format xrgb`
2. the D-Bus and systemd environment imports
3. the HyprFlux Polkit helper
4. NetworkManager's tray applet
5. SwayNC
6. Waybar
7. `hyprctl setcursor Bibata-Modern-Classic 24`, which reapplies the cursor theme at every start
8. the text and image clipboard watchers for Cliphist
9. Hypridle

QuickShell, AGS, and `swww-daemon` are not part of the current startup path. The video wallpaper through mpvpaper and wallpaper rotation exist only as disabled examples.

## Add a startup application

Add a command inside the existing callback:

```lua
hl.on("hyprland.start", function()
    hl.exec_cmd("waybar")
    hl.exec_cmd("my-session-application --flag")
end)
```

Prefer one callback per coherent startup sequence. If one command depends on another being ready, express that dependency in one script or a systemd user unit rather than assuming asynchronous commands finish in declaration order.

System services and persistent user daemons generally belong in systemd. Use this module for applications tied directly to the Hyprland session.

## Paths and shell expansion

Lua does not expand `$HOME` inside a normal string. Build paths with `os.getenv("HOME")`. If a command needs shell features such as `||`, pipes, or redirection, quote it as a complete shell command and test it separately.

## Validation

```bash
luac -p ~/.config/hypr/UserConfigs/startup-apps.lua
Hyprland --config ~/.config/hypr/hyprland.lua --verify-config
```

Reloading validates registration, but the session-start callback is meant for a new Hyprland session. Do not log out repeatedly while the complete config still fails validation.
